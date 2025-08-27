import React, { useRef } from "react";
import * as faceapi from "face-api.js";

export default function FacialExpression() {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models"; // models in public/models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

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

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

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
    console.log(_expression);
  }

  loadModels().then(startVideo);

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h2>User Mood: {mood} 🎭</h2> */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <video ref={videoRef} autoPlay muted width="720" height="560" />
      </div>
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}
