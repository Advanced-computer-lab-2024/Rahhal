import React, { useEffect, useState } from "react";
import { GenericModal } from "@/components/GenericModal";
import { Label } from "@/components/ui/label";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TComplaint } from "@/features/user-settings/utils/tourist-complaints-columns";

interface ComplaintsModalProps {
  complaintData?: TComplaint;
  dialogTrigger: React.ReactNode;
  id: string;
  onCreateComplaint?: (newComplaint: TComplaint) => void;
}

export function TouristComplaintsModal({
  complaintData,
  dialogTrigger,
  id,
  onCreateComplaint,
}: ComplaintsModalProps) {
  const isNewComplaint: boolean = complaintData == undefined;
  const [modalComplaintData, setModalComplaintData] = useState<TComplaint>(
    complaintData ?? DEFAULTS.TOURIST_COMPLAINT,
  );

  useEffect(() => {
    if (isNewComplaint) {
      setModalComplaintData(DEFAULTS.TOURIST_COMPLAINT);
    } else {
      setModalComplaintData(complaintData!);
    }
  }, [complaintData]);

  const handleSubmit = async () => {
    if (modalComplaintData) {
      const { _id, status, ...complaintData } = modalComplaintData;
      const newComplaint = { ...complaintData, owner: id };
      onCreateComplaint!(newComplaint);
    }
    setModalComplaintData(DEFAULTS.TOURIST_COMPLAINT);
  };

  return (
    <GenericModal
      title={"Complaint Details"}
     description=""
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <></>
      <div className="space-y-4">
        <Label>Complaint Title</Label>
        <ShortText
          title="Title"
          initialValue={modalComplaintData.title}
          type="text"
          onSave={(value) =>
            setModalComplaintData(
              modalComplaintData
                ? { ...modalComplaintData, title: value }
                : DEFAULTS.TOURIST_COMPLAINT,
            )
          }
          placeholder={"Enter Complaint Title"}
          initialDisabled={false}
        />
        <Label>Complaint Body </Label>
        <ShortText
          title="Body"
          initialValue={modalComplaintData.body}
          type="text"
          onSave={(value) =>
            setModalComplaintData(
              modalComplaintData
                ? { ...modalComplaintData, body: value }
                : DEFAULTS.TOURIST_COMPLAINT,
            )
          }
          placeholder={"Enter Complaint Body"}
          initialDisabled={false}
        />
        {!isNewComplaint && (
          <>
            <div className="pt-4 space-y-4">
              <Label>Previous Replies</Label>
              {modalComplaintData?.replies.length !== 0 ? (
                modalComplaintData?.replies.map((reply, index) => (
                  <li className="text-sm font-medium" key={index}>
                    {" "}
                    {reply}{" "}
                  </li>
                ))
              ) : (
                <p className="text-sm" style={{ color: "gray" }}>
                  No Replies Yet
                </p>
              )}
            </div>
            <div className="pt-4 space-y-4">
              <Label>Status</Label>
              <p className="capitalize">{modalComplaintData.status}</p>
            </div>
          </>
        )}
      </div>
    </GenericModal>
  );
}
