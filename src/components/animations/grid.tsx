import { motion } from "framer-motion";
import React from "react";

const AnimatedGrid: React.FC = ({}) => {
  const lineAnimation = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.8 },
    },
  };

  const beamAnimation = (baseDelay: number, staggerDelay: number) => ({
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 450,
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: baseDelay + staggerDelay,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  });

  const beamLines = ["100", "200", "350"];

  const customDelays = [2, 0, 1];

  const baseDelay = 2;

  return (
    <div className="absolute -z-1 right-[10rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width="500"
        height="500"
      >
        <defs>
          <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0.7" stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask" maskUnits="userSpaceOnUse">
            <rect
              width="100%"
              height="100%"
              rx="40"
              ry="40"
              fill="url(#fade)"
            />
          </mask>
        </defs>

        <g>
          {/* Vertical grid lines */}
          {["50", "100", "150", "200", "250", "300", "350"].map((x, i) => (
            <motion.line
              key={`vertical-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="400"
              stroke="rgba(255, 255, 255, .4)"
              strokeWidth="0.5"
              variants={lineAnimation}
              initial="hidden"
              animate="visible"
              mask="url(#fadeMask)"
            />
          ))}

          {/* Horizontal grid lines */}
          {["50", "100", "150", "200", "250", "300", "350"].map((y, i) => (
            <motion.line
              key={`horizontal-${i}`}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="rgba(255, 255, 255, .4)"
              strokeWidth="0.5"
              variants={lineAnimation}
              initial="hidden"
              animate="visible"
              mask="url(#fadeMask)"
            />
          ))}
        </g>

        <g>
          {beamLines.map((x, i) => (
            <motion.line
              key={`beam-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="50"
              stroke="rgba(255, 255, 255, .4)"
              strokeWidth="1"
              variants={beamAnimation(baseDelay, customDelays[i] * 2.3)}
              initial="hidden"
              animate="visible"
              style={{
                originY: "top",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedGrid;
