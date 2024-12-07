import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TPreferenceTag } from "@/features/admin/utils/columns-definitions/preference-tags-columns";
import { deletePreferenceTag } from "@/api-calls/preference-tags-api-calls";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { submitPreferenceTag } from "@/api-calls/preference-tags-api-calls";

interface PreferenceTagsModalProps {
  preferenceTagData?: TPreferenceTag;
  dialogTrigger?: React.ReactNode;
}

export function PreferenceTagsModal({
  preferenceTagData,
  dialogTrigger,
}: PreferenceTagsModalProps) {
  const isNewPreferenceTag: boolean = preferenceTagData == undefined;
  const [modalPrefernceTagData, setModalPrefernceTagData] = useState<TPreferenceTag | undefined>(
    preferenceTagData,
  );

  const handleDeletePreferenceTag = () => {
    if (preferenceTagData) 
      deletePreferenceTag(preferenceTagData._id);
  };
  useEffect(() => {
    if (isNewPreferenceTag) {
      setModalPrefernceTagData(DEFAULTS.PREFERENCE_TAG);
    }
  }, []);

  return (
    <GenericModal
      title={PreferenceTagsModal?.name ?? "New Preference Tag"}
      description="Preference Tag Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => {
        submitPreferenceTag(modalPrefernceTagData, isNewPreferenceTag);
      }}
    >
      <Button variant="destructive" className="fixed top-2 right-9" onClick={() => handleDeletePreferenceTag()}>
        <span className="sr-only">Delete</span>
        <FaTrash className="h-4 w-4" />
      </Button>
      <ShortText
        title="Name"
        initialValue={modalPrefernceTagData?.name ?? ""}
        type="text"
        onSave={(value) =>
          setModalPrefernceTagData(
            modalPrefernceTagData ? { ...modalPrefernceTagData, name: value } : undefined,
          )
        }
        placeholder={"Enter Preference Tag Name"}
        initialDisabled={!isNewPreferenceTag}
      />

      <></>
    </GenericModal>
  );
}
