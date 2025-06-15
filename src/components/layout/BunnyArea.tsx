
import React from "react";
import BunnyCompanion from "@/components/BunnyCompanion";

interface BunnyAreaProps {
  bunnyMood: any;
}

const BunnyArea: React.FC<BunnyAreaProps> = ({ bunnyMood }) => (
  <div className="mb-8 flex justify-center">
    <div className="gentle-fade-in">
      <BunnyCompanion mood={bunnyMood} />
    </div>
  </div>
);

export default BunnyArea;
