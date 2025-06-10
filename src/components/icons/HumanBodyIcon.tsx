
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

  // Updated path for a simpler human silhouette
  const newPathData = "M25,4 C20.5817,4 17,7.58172 17,12 C17,16.4183 20.5817,20 25,20 C29.4183,20 33,16.4183 33,12 C33,7.58172 29.4183,4 25,4 Z M15,25 C15,22 17,22 20,22 L30,22 C33,22 35,22 35,25 L35,55 L20,96 L30,96 L20,55 L15,55 Z M15 55 L15 96 L20 96 L20 55Z M30 55 L30 96 L35 96 L35 55Z";


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
        fill="hsl(0, 0%, 20%)" 
      />

      <g clipPath="url(#humanBodyFillClip)">
        <path
            d={newPathData}
            fill="hsl(0, 70%, 50%)" 
            clipPath="url(#humanBodyFillRectClip)"
        />
      </g>
      
      <text
        x="25"
        y="40" 
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="hsl(0, 0%, 100%)" 
        className="font-headline font-bold"
      >
        {Math.round(displayPercentage)}%
      </text>
    </svg>
  );
};

export default HumanBodyIcon;

