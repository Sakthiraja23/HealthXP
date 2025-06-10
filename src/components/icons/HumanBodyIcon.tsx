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
          <rect x="0" y={fillY} width="50" height={fillHeight} />
        </clipPath>
      </defs>

      {/* Base body shape (dark gray) */}
      <path
        d="M25,8 C20.5,8 17,11.5 17,16 C17,20.5 20.5,24 25,24 C29.5,24 33,20.5 33,16 C33,11.5 29.5,8 25,8 Z M13,30 C12,30 12,32 14,38 L16,60 L12,60 L12,92 L22,92 L22,70 L28,70 L28,92 L38,92 L38,60 L34,60 L36,38 C38,32 38,30 37,30 L13,30 Z"
        fill="hsl(0, 0%, 20%)" // Dark gray
      />

      {/* Filled portion (red color) */}
      <path
        d="M25,8 C20.5,8 17,11.5 17,16 C17,20.5 20.5,24 25,24 C29.5,24 33,20.5 33,16 C33,11.5 29.5,8 25,8 Z M13,30 C12,30 12,32 14,38 L16,60 L12,60 L12,92 L22,92 L22,70 L28,70 L28,92 L38,92 L38,60 L34,60 L36,38 C38,32 38,30 37,30 L13,30 Z"
        fill="hsl(0, 70%, 50%)" // Red color
        clipPath="url(#humanBodyFillClip)"
      />

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
