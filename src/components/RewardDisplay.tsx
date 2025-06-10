"use client";

import HumanBodyIcon from "@/components/icons/HumanBodyIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RewardDisplayProps {
  percentage: number;
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ percentage }) => {
  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center text-[hsl(var(--custom-green))]">Progress XP</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="w-48 h-96 md:w-56 md:h-[448px] mb-4"> {/* Container for SVG to control size */}
           <HumanBodyIcon percentage={percentage} />
        </div>
        <p className="text-xl font-headline font-semibold text-accent">
          {Math.round(percentage)}% Complete
        </p>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Each task contributes 10% to your daily goal. Keep going!
        </p>
      </CardContent>
    </Card>
  );
};

export default RewardDisplay;
