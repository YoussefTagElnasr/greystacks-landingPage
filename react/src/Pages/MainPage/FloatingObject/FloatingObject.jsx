import React, { useRef, useState, useEffect } from "react";
import "./FloatingObject.css";

const FloatingObject = ({ src, initialX = 100, initialY = 100, customStyle = {} }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const convertToPixels = (value, axis) => {
    if (typeof value === "string" && value.endsWith("%")) {
      const percent = parseFloat(value) / 100;
      return axis === "x"
        ? window.innerWidth * percent
        : window.innerHeight * percent;
    }
    return value; // assume it's a pixel number
  };

  useEffect(() => {
    setPosition({
      x: convertToPixels(initialX, "x"),
      y: convertToPixels(initialY, "y"),
    });
  }, [initialX, initialY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition({
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  return (
    <img
      src={src}
      className="floating-object"
      alt=""
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: dragging ? "grabbing" : "grab",
        ...customStyle,
      }}
      draggable={false}
    />
  );
};

export default FloatingObject;
