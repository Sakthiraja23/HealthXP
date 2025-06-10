
"use client";

import type { SVGProps } from 'react';

interface HumanBodyIconProps extends SVGProps<SVGSVGElement> {
  percentage: number;
}

const HumanBodyIcon = ({ percentage, ...props }: HumanBodyIconProps) => {
  const viewBoxHeight = 100;
  const fillHeight = viewBoxHeight * (percentage / 100);
  const fillY = viewBoxHeight - fillHeight;

  const displayPercentage = Math.max(0, Math.min(100, percentage));

  // Head path: Increased radius, center (25,16). Bottom of head is y=23.
  const headPathData = "M25 9 C21.17 9 18 12.17 18 16 C18 19.83 21.17 23 25 23 C28.83 23 32 19.83 32 16 C32 12.17 28.83 9 25 9 Z";
  
  // Arms as simple horizontal rectangles, aligned with head base (y=23)
  const leftArmPath = "M0 23 L15 23 L15 26 L0 26 Z"; // Left arm: y from 23 to 26
  const rightArmPath = "M35 23 L50 23 L50 26 L35 26 Z"; // Right arm: y from 23 to 26

  // Torso and straight rectangular legs. Torso top also at y=23.
  const torsoLegsPath = "M15 23 L15 50 L15 95 L20 95 L20 60 L30 60 L30 95 L35 95 L35 50 L35 23 Z";
  
  const bodyLimbsPathData = `${leftArmPath} ${torsoLegsPath} ${rightArmPath}`;
  const newPathData = `${headPathData} ${bodyLimbsPathData}`;

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
          <path d={newPathData} />
        </clipPath>
        <clipPath id="humanBodyFillRectClip">
            <rect x="0" y={fillY} width="50" height={fillHeight} />
        </clipPath>
      </defs>

      <path
        d={newPathData}
        fill="hsl(0, 0%, 20%)" // Dark grey base for the icon
      />

      <g clipPath="url(#humanBodyFillClip)">
        <path
            d={newPathData}
            fill="hsl(0, 70%, 50%)" // Red fill color
            clipPath="url(#humanBodyFillRectClip)"
        />
      </g>

      <text
        x="25"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8" // Reduced font size for better visibility of "100%"
        fill="hsl(0, 0%, 100%)" // White text for contrast
        className="font-headline font-bold"
      >
        {Math.round(displayPercentage)}%
      </text>
    </svg>
  );
};

export default HumanBodyIcon;
