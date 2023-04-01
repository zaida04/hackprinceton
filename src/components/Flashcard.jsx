import React, { useState } from "react";

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-full max-w-xs p-5 m-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
    >
      <div className="relative w-full h-48">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out transform ${
            isFlipped ? "rotate-y-180" : "rotate-y-0"
          }`}
        >
          <div className="text-xl font-semibold text-gray-700">{front}</div>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out transform ${
            isFlipped ? "rotate-y-0" : "rotate-y-180"
          }`}
        >
          <div className="text-xl font-semibold text-gray-700">{back}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
