import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DEFAULTS } from "@/lib/constants";
import { TPromocode } from "@/types/shared";
import { submitPromocode } from "@/api-calls/promocode-api-calls";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleableSwitchCard } from "@//components/ToggleableSwitchCard";
import { FaCircleCheck } from "react-icons/fa6";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

interface PromocodeModalProps {
  promocodeData?: TPromocode;
  dialogTrigger?: React.ReactNode;
}

export function PromocodeModal({ promocodeData, dialogTrigger }: PromocodeModalProps) {
  const isNewPromocode: boolean = promocodeData == undefined;
  const [modalPromocodeData, setModalPromocodeData] = useState<TPromocode | undefined>(
    promocodeData,
  );
  useEffect(() => {
    if (isNewPromocode) {
      setModalPromocodeData(DEFAULTS.PROMOCODE);
    }
  }, []);

  return (
    <GenericModal
      title={isNewPromocode ? "New Promocode" : "Edit Promocode"}
      description="Promocode Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => {
        submitPromocode(modalPromocodeData, isNewPromocode);
      }}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Code</Label>
          <Input
            value={modalPromocodeData?.code ?? ""}
            onChange={(e) =>
              setModalPromocodeData(
                modalPromocodeData ? { ...modalPromocodeData, code: e.target.value } : undefined,
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
            className="flex flex-col space-y-1"
            disabled={!isNewPromocode}
          >
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="percentage">Percentage</RadioGroupItem>
              <Label>Percentage</Label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="shipping">Shipping</RadioGroupItem>
              <Label>Shipping</Label>
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
