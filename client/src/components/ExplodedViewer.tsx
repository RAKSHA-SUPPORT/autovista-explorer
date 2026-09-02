import React from "react";

export const ExplodedViewer = ({ carId }: { carId?: string; [key: string]: any }) => {
  return (
    <div className="w-full h-80 rounded-xl border border-neutral-800 bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="text-3xl mb-2">🏎️</div>
      <p className="text-neutral-300 text-sm font-medium">Interactive 3D Engine Preview</p>
    </div>
  );
};

export default ExplodedViewer;
