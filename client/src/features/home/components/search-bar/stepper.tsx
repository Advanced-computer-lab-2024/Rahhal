import React from "react";

interface StepperProps {
  label: string;
  description?: string;
  count: number;
  setCount: (value: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ label, description, count, setCount }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium">{label}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setCount(Math.max(count - 1, 0))}
          className="px-3 py-1 border rounded-full"
        >
          -
        </button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)} className="px-3 py-1 border rounded-full">
          +
        </button>
      </div>
    </div>
  );
};
