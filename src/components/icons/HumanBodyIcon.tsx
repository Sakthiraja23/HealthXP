
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

  // Head path adjusted to lower its position and connect with the body
  const headPathData = "M25 10 C22.25 10 20 12.25 20 15 C20 17.75 22.25 20 25 20 C27.75 20 30 17.75 30 15 C30 12.25 27.75 10 25 10 Z";
  // Body and limbs path with horizontal arms
  const bodyLimbsPathData = "M18 20 L5 20 L5 23 L8 23 L8 25 L18 25 L18 50 L15 95 L22 95 L22 60 L28 60 L28 95 L35 95 L32 50 L32 25 L42 25 L42 23 L45 23 L45 20 L32 20 Z";
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
        y="50"
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
