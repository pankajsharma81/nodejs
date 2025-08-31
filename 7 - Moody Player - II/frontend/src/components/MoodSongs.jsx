import { useState } from "react";

const MoodSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Recommended Tracks</h2>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-md transition"
          >
            {/* Song Info */}
            <div>
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-gray-500">{song.artist}</p>
            </div>

            {/* Play / Pause Button */}
            <div className="flex items-center">
              {isPlaying === index && (
                <audio
                  src={song.audio}
                  autoPlay
                  style={{ display: "none" }}
                ></audio>
              )}

              <button
                onClick={() => handlePlayPause(index)}
                className="text-3xl text-purple-600 hover:text-purple-700 transition"
              >
                {isPlaying === index ? (
                  <i className="ri-pause-circle-fill"></i>
                ) : (
                  <i className="ri-play-circle-fill"></i>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
