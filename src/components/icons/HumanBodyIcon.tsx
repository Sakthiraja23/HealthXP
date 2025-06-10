
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

  // Path for a human silhouette with arms and legs
  const newPathData = "M25 5 C22.25 5 20 7.25 20 10 C20 12.75 22.25 15 25 15 C27.75 15 30 12.75 30 10 C30 7.25 27.75 5 25 5 Z M15 18 L15 45 L10 45 L10 70 L15 70 L15 95 L22 95 L22 65 L28 65 L28 95 L35 95 L35 70 L40 70 L40 45 L35 45 L35 18 Z";


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
        fill="hsl(0, 0%, 20%)" // Dark grey background for the silhouette shape
      />

      <g clipPath="url(#humanBodyFillClip)">
        <path
            d={newPathData}
            fill="hsl(0, 70%, 50%)" // Red fill
            clipPath="url(#humanBodyFillRectClip)"
        />
      </g>

      <text
        x="25"
        y="50" // Adjusted y for better centering with arms/legs
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="hsl(0, 0%, 100%)" // White text
        className="font-headline font-bold"
      >
        {Math.round(displayPercentage)}%
      </text>
    </svg>
  );
};

export default HumanBodyIcon;
