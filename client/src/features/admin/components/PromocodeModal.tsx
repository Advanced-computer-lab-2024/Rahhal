import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DEFAULTS } from "@/lib/constants";
import { TPromocode } from "@/types/shared";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitPromocode } from "@/api-calls/promocode-api-calls";
import { ToggleableSwitchCard } from "@//components/ToggleableSwitchCard";
import { FaCircleCheck } from "react-icons/fa6";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";

interface PromocodeModalProps {
  promocodeData?: TPromocode;
  dialogTrigger?: React.ReactNode;
  onDelete?: (id: string) => void;
  onSubmit?: (promocode: TPromocode) => void;
}

export function PromocodeModal({
  promocodeData,
  dialogTrigger,
  onDelete,
  onSubmit,
}: PromocodeModalProps) {
  const isNewPromocode: boolean = promocodeData == undefined;
  const [modalPromocodeData, setModalPromocodeData] = useState<TPromocode | undefined>(
    promocodeData,
  );
  useEffect(() => {
    if (isNewPromocode) {
      setModalPromocodeData(DEFAULTS.PROMOCODE);
    }
  }, []);

  const handleDelete = () => {
    if (modalPromocodeData && onDelete) {
      onDelete(modalPromocodeData._id);
    }
  };

  const handleSubmit = async () => {
    if (!modalPromocodeData) return;
    
    try {
      const response = await submitPromocode(modalPromocodeData, isNewPromocode);
      if (response?.status === STATUS_CODES.STATUS_OK || response?.status === STATUS_CODES.CREATED) {
        toast({
          title: "Success",
          description: "Promocode saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          }
        });
        if (onSubmit) {
          onSubmit(modalPromocodeData);
          setModalPromocodeData(DEFAULTS.PROMOCODE);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save promocode",
        variant: "destructive",
      });
    }
  };

  return (
    <GenericModal
      title={isNewPromocode ? "New Promocode" : "Edit Promocode"}
      description="Promocode Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewPromocode}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <Label>Code</Label>
          <Input
            value={modalPromocodeData?.code ?? ""}
            onChange={(e) =>
              setModalPromocodeData(
                modalPromocodeData ? { ...modalPromocodeData, code: e.target.value.toUpperCase() } : undefined,
              )
            }
            placeholder="Enter Promocode Code"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Type</Label>
          <RadioGroup
            onValueChange={(value) =>
              setModalPromocodeData(
                modalPromocodeData ? { ...modalPromocodeData, type: value } : undefined,
              )
            }
            defaultValue={modalPromocodeData?.type ?? "percentage"}
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="text-sm">Percentage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shipping" id="shipping" />
              <Label htmlFor="shipping" className="text-sm">Shipping</Label>
            </div>
          </RadioGroup>
        </div>

        <ToggleableSwitchCard
          title="Active"
          description="Check to activate the promocode"
          icon={<FaCircleCheck />}
          switchState={modalPromocodeData?.isActive ?? false}
          onToggle={() =>
            setModalPromocodeData(
              modalPromocodeData
                ? { ...modalPromocodeData, isActive: !modalPromocodeData.isActive }
                : undefined,
            )
          }
        />

        <div className="flex flex-col gap-2">
          <Label>Expires At</Label>
          <DatePicker
            date={modalPromocodeData?.expiresAt ?? new Date()}
            setDate={(date) =>
              setModalPromocodeData(
                modalPromocodeData
                  ? { ...modalPromocodeData, expiresAt: date ?? new Date() }
                  : undefined,
              )
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Value (%)</Label>
          <Input
            type="number"
            value={modalPromocodeData?.value ?? ""}
            onChange={(e) =>
              setModalPromocodeData(
                modalPromocodeData
                  ? { ...modalPromocodeData, value: Number(e.target.value) }
                  : undefined,
              )
            }
            placeholder="Enter Promocode Value"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Number Of Uses</Label>
          <Input
            type="number"
            value={modalPromocodeData?.uses ?? ""}
            onChange={(e) =>
              setModalPromocodeData(
                modalPromocodeData
                  ? { ...modalPromocodeData, uses: Number(e.target.value) }
                  : undefined,
              )
            }
            placeholder="Enter Number Of Promocode Uses"
          />
        </div>
      </div>
      <></>
    </GenericModal>
  );
}
