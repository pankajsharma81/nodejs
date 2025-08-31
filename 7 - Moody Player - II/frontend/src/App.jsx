import { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 md:bg-gray-200 lg:bg-gray-400 bg-gradient-to-b from-gray-400 to-gray-300">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <FacialExpression setSongs={setSongs} />
        <MoodSongs songs={songs} />
      </div>
    </div>
  );
}

export default App;
