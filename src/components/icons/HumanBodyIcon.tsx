
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

  // A more standard, simpler human silhouette path
  const newPathData = "M25 5 C20.8333 5 17.5 8.33333 17.5 12.5 C17.5 16.6667 20.8333 20 25 20 C29.1667 20 32.5 16.6667 32.5 12.5 C32.5 8.33333 29.1667 5 25 5 Z M12.5 22.5 L12.5 55 L20 95 L30 95 L37.5 55 L37.5 22.5 C37.5 21.1193 36.3807 20 35 20 L15 20 C13.6193 20 12.5 21.1193 12.5 22.5 Z";


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
            fill="hsl(0, 70%, 50%)" // Red fill
            clipPath="url(#humanBodyFillRectClip)"
        />
      </g>

      <text
        x="25"
        y="40"
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
