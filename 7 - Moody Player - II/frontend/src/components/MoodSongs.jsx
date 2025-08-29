import { useState } from "react";
import "./MoodSongs.css";

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
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {songs.map((song, index) => {
        return (
          <div className="song" key={index}>
            <div className="title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>

            <div className="play-pause-button">
              {isPlaying === index && (
                <audio
                  src={song.audio}
                  style={{ display: "none" }}
                  autoPlay={isPlaying === index}
                ></audio>
              )}

              <button onClick={() => handlePlayPause(index)}>
                {isPlaying === index ? (
                  <i class="ri-pause-circle-fill"></i>
                ) : (
                  <i class="ri-play-circle-fill"></i>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodSongs;
