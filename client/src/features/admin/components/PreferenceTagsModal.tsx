import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { DEFAULTS } from "@/lib/constants";
import { TPreferenceTag } from "@/features/admin/utils/columns-definitions/preference-tags-columns";
import { submitPreferenceTag } from "@/api-calls/preference-tags-api-calls";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PreferenceTagsModalProps {
  preferenceTagData?: TPreferenceTag;
  dialogTrigger?: React.ReactNode;
  onDelete?: (id: string) => void;
  onSubmit?: (preferenceTag: TPreferenceTag) => void;
}

export function PreferenceTagsModal({
  preferenceTagData,
  dialogTrigger,
  onDelete,
  onSubmit,
}: PreferenceTagsModalProps) {
  const isNewPreferenceTag: boolean = preferenceTagData == undefined;
  const [modalPrefernceTagData, setModalPrefernceTagData] = useState<TPreferenceTag | undefined>(
    preferenceTagData,
  );
  useEffect(() => {
    if (isNewPreferenceTag) {
      setModalPrefernceTagData(DEFAULTS.PREFERENCE_TAG);
    }
  }, []);

  const handleDelete = () => {
    if (modalPrefernceTagData && onDelete) {
      onDelete(modalPrefernceTagData._id);
    }
  };

  const handleSubmit = async () => {
    if (!modalPrefernceTagData) return;

    try {
      const response = await submitPreferenceTag(modalPrefernceTagData, isNewPreferenceTag);
      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "Preference Tag saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalPrefernceTagData);
          setModalPrefernceTagData(DEFAULTS.PREFERENCE_TAG);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preference tag",
        variant: "destructive",
      });
    }
  };

  return (
    <GenericModal
      title={isNewPreferenceTag ? "Add Preference Tag" : "Edit Preference Tag"}
      description="Preference Tag Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewPreferenceTag}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Preference Tag</Label>
          <Input
            value={modalPrefernceTagData?.name ?? ""}
            onChange={(e) =>
              setModalPrefernceTagData(
                modalPrefernceTagData
                  ? { ...modalPrefernceTagData, name: e.target.value }
                  : undefined,
              )
            }
            placeholder="Enter Preference Tag Name"
          />
        </div>
      </div>
      <></>
    </GenericModal>
  );
}
