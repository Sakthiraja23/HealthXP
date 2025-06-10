
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

  // Head path: Increased radius from 5 to 6, center (25,15). Bottom of head is y=21.
  const headPathData = "M25 9 C21.7 9 19 11.7 19 15 C19 18.3 21.7 21 25 21 C28.3 21 31 18.3 31 15 C31 11.7 28.3 9 25 9 Z";
  // Body and limbs path with horizontal arms, wider torso, and straight rectangular legs. Body starts at y=20.
  const bodyLimbsPathData = "M15 20 L0 20 L0 23 L3 23 L3 25 L15 25 L15 50 L15 95 L20 95 L20 60 L30 60 L30 95 L35 95 L35 50 L35 25 L47 25 L47 23 L50 23 L50 20 L35 20 Z";
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

