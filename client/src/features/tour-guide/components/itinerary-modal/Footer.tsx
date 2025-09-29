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
    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center space-y-3 sm:space-y-0">
      <Button
        disabled={step === 1}
        onClick={onPrevStep}
        variant="outline"
        size="sm"
        className="w-full sm:w-auto"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span className="sm:hidden">Previous</span>
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
        <Button onClick={onSave} size="sm" className="w-full sm:w-auto">
          {isNew ? "Create" : "Save Changes"}
        </Button>
      ) : (
        <Button
          onClick={onNextStep}
          variant="outline"
          disabled={step === 4}
          size="sm"
          className="w-full sm:w-auto"
        >
          <span className="sm:hidden mr-1">Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </DialogFooter>
  );
}
