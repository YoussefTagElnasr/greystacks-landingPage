import React, { useEffect, useState } from "react";
import "./FloatingBubbles.css";

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: 20 + Math.random() * 40, // px
      delay: Math.random() * 5, // seconds
      duration: 10 + Math.random() * 10, // seconds
    }));
    setBubbles(newBubbles);
  }, []);

  return (
      <div className="bubble-container">
        {bubbles.map((bubble) => (
            <div
                key={bubble.id}
                className="bubble"
                style={{
                  left: `${bubble.left}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  animationDelay: `${bubble.delay}s`,
                  animationDuration: `${bubble.duration}s`,
                }}
            />
        ))}
      </div>
  );
};

export default FloatingBubbles;
