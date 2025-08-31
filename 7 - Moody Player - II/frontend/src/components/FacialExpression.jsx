import React, { useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();

  // Models Load karna
  const loadModels = async () => {
    const MODEL_URL = "/models"; // models in public/models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  // Webcam Start karna
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Mood Detect Karna
  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    // Sabse Zyada Probability Wala Expression Choose Karna
    let mostProableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    // console.log(_expression);
    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs)
      });
  }

  loadModels().then(startVideo);

  return (
     <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Live Mood Detection</h2>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-2xl p-6">
        {/* Webcam Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full md:w-80 h-56 rounded-xl object-cover bg-black"
        />

        {/* Info Section */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Live Mood Detection</h3>
          <p className="text-gray-600 mb-4">
            Your current mood is being analyzed in real-time.
            Enjoy music tailored to your feelings.
          </p>
          <button
            onClick={detectMood}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
          >
            Start Listening
          </button>
        </div>
      </div>
    </div>
  );
}
