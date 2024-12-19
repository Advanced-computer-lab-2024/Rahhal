import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Footer({
  step,
  onNextStep,
  onPrevStep,
  onSave,
  isNew,
}: {
  step: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSave: () => void;
  isNew: boolean;
}) {
  return (
    <DialogFooter className="flex  sm:justify-between items-center">
      <Button disabled={step === 1} onClick={onPrevStep} variant="outline">
        <ArrowLeft />
      </Button>

      {/* Step Indicators */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-3 h-3 rounded-full ${step === stepNumber ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
      {step === 4 ? (
        <Button onClick={onSave}> {isNew ? "Create" : "Save Changes"}</Button>
      ) : (
        <Button onClick={onNextStep} variant="outline" disabled={step === 4}>
          <ArrowRight />
        </Button>
      )}
    </DialogFooter>
  );
}
