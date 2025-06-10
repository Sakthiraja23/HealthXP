
"use client";

import type { SVGProps } from 'react';

interface HumanBodyIconProps extends SVGProps<SVGSVGElement> {
  percentage: number;
}

const HumanBodyIcon = ({ percentage, ...props }: HumanBodyIconProps) => {
  const viewBoxHeight = 100;
  const fillHeight = viewBoxHeight * (percentage / 100);
  const fillY = viewBoxHeight - fillHeight;

  // Ensure percentage is within 0-100
  const displayPercentage = Math.max(0, Math.min(100, percentage));

  // Updated path for a human silhouette with arms
  const newPathData = "M25,4 C20.5,4 17,7.5 17,12 C17,16.5 20.5,20 25,20 C29.5,20 33,16.5 33,12 C33,7.5 29.5,4 25,4z M8,28 C8,25 10,23 13,23 L37,23 C40,23 42,25 42,28 L42,35 L47,42 L42,49 L42,55 L39,65 L39,96 L30,96 L30,70 L20,70 L20,96 L11,96 L11,65 L8,55 L8,49 L3,42 L8,35 L8,28z";

  return (
    <svg
      viewBox="0 0 50 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ maxWidth: '200px', maxHeight: '400px' }}
      {...props}
    >
      <defs>
        <clipPath id="humanBodyFillClip">
          {/* The clip path uses the same path data to ensure the fill is contained within the body shape */}
          <path d={newPathData} />
        </clipPath>
        <clipPath id="humanBodyFillRectClip">
            {/* This rect clips the fill from bottom to top based on percentage */}
            <rect x="0" y={fillY} width="50" height={fillHeight} />
        </clipPath>
      </defs>

      {/* Base body shape (dark gray) */}
      <path
        d={newPathData}
        fill="hsl(0, 0%, 20%)" // Dark gray
      />

      {/* Filled portion (red color), clipped by both the body shape and the percentage rectangle */}
      <g clipPath="url(#humanBodyFillClip)">
        <path
            d={newPathData}
            fill="hsl(0, 70%, 50%)" // Red color
            clipPath="url(#humanBodyFillRectClip)"
        />
      </g>
      
      {/* Percentage text */}
      <text
        x="25"
        y="55" // Vertically centered in the torso area
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12" // Adjusted for visibility within the shape
        fill="hsl(0, 0%, 100%)" // White text for contrast with red
        className="font-headline font-bold"
      >
        {Math.round(displayPercentage)}%
      </text>
    </svg>
  );
};

export default HumanBodyIcon;
