
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
  // Body and limbs path with horizontal arms, wider torso
  const bodyLimbsPathData = "M15 20 L0 20 L0 23 L3 23 L3 25 L15 25 L15 50 L10 95 L20 95 L20 60 L30 60 L30 95 L40 95 L35 50 L35 25 L47 25 L47 23 L50 23 L50 20 L35 20 Z";
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
