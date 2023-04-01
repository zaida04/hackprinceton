import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        onClick={handleFlip}
        className="w-full max-w-xs p-5 m-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
      >
        <div className="text-xl font-semibold text-gray-700">{front}</div>
      </div>

      <div
        onClick={handleFlip}
        className="w-full max-w-xs p-5 m-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
      >
        <div className="text-xl font-semibold text-gray-700">{back}</div>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;
