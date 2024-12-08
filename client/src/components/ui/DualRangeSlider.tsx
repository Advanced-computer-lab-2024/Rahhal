"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, labelPosition = "top", ...props }, ref) => {
  const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center ", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 shadow-sm">
        <SliderPrimitive.Range className="absolute h-full bg-[var(--primary-color)] rounded-full" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb
            className={cn(
              "relative block h-4 w-4 rounded-full bg-white border border-gray-300 shadow-md transition-transform transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-gray-400",
            )}
          >
            {label && (
              <span
                className={cn(
                  "absolute flex w-full justify-center",
                  labelPosition === "top" && "-top-6",
                  labelPosition === "bottom" && "top-4",
                )}
              >
                {label(value)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
