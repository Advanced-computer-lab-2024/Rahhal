import { GenericModal } from "../../GenericModal";
import { useEffect, useState } from "react";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TPreferenceTag } from "@/table-columns/preference-tags-columns";
import { submitPreferenceTag } from "@/api-calls/preference-tags-api-calls";

interface PreferenceTagsModalProps {
    preferenceTagData?: TPreferenceTag;
    dialogTrigger?: React.ReactNode;
}

export function PreferenceTagsModal({ preferenceTagData, dialogTrigger }: PreferenceTagsModalProps) {
const isNewPreferenceTag : boolean = preferenceTagData == undefined;
const [modalPrefernceTagData, setModalPrefernceTagData] = useState<TPreferenceTag | undefined>(preferenceTagData);
    useEffect(() => {
        if (isNewPreferenceTag) {
            setModalPrefernceTagData(DEFAULTS.PREFERENCE_TAG);  
        }
    },[]);

    return (
        <GenericModal
        title={PreferenceTagsModal?.name?? "New Preference Tag"}
        description="Preference Tag Details"
        dialogTrigger={dialogTrigger}
        onSubmit={() => {
             submitPreferenceTag(modalPrefernceTagData, isNewPreferenceTag);
            
        }
         } 
>
    <ShortText
    title="Name"
    initialValue={modalPrefernceTagData?.name??""}
    type="text"
    onSave={(value) => 
        setModalPrefernceTagData(
            modalPrefernceTagData ? {...modalPrefernceTagData, name: value} : undefined,
            
        )
    }
    placeholder={"Enter Preference Tag Name"}
    initialDisabled={!isNewPreferenceTag}
    />

    <></>
    </GenericModal>
    );  
}
