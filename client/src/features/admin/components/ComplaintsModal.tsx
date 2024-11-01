import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TComplaint } from "@/features/admin/utils/complaints-columns";
import { Label } from "@radix-ui/react-label";
import { GenericSelect } from "@/components/GenericSelect";
import { updateComplaint, addReply } from "@/api-calls/complaints-api-calls";


interface ComplaintsModalProps {
  complaintData?: TComplaint;
  dialogTrigger?: React.ReactNode;
}

export function ComplaintsModal({
  complaintData,
  dialogTrigger,
}: ComplaintsModalProps) {
  const [modalComplaintData, setModalComplaintData] = useState<TComplaint | undefined>(
    complaintData,
  );
  const [newReply, setNewReply] = useState<string>("");
  useEffect(() => {
    if (!complaintData) {
      setModalComplaintData(DEFAULTS.COMPLAINT);
    }
  }, []);

  const handleSubmit = async () => {
    if (modalComplaintData) {
      await updateComplaint(modalComplaintData._id, modalComplaintData.status);
      if (newReply !== "") {
        await addReply(modalComplaintData._id, newReply);
      }
    }
  }

  return (
    <GenericModal
      title={"Complaint Details"}
      description="Complaint Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <Label>Complaint Title</Label>
      <small className="text-sm font-medium leading-none">{modalComplaintData?.title ?? ""}</small>

      <Label>Complaint Body</Label>
      <small className="text-sm font-medium leading-none">{modalComplaintData?.body ?? ""} </small>

      <Label>Complaint Issuer</Label>
      <small className="text-sm font-medium leading-none">
        {modalComplaintData?.owner ? `${modalComplaintData.owner.firstName} ${modalComplaintData.owner.lastName}` : ""}
      </small>

      <Label>Date Issued</Label>
      <small className="text-sm font-medium leading-none">
        {modalComplaintData?.date ? new Date(modalComplaintData.date).toLocaleDateString("en-GB") : ""}
      </small>

      <Label>Status</Label>
      <GenericSelect
        label={"Status"}
        options={[
          { value: "pending", label: "Pending" },
          { value: "resolved", label: "Resolved" },
        ]}
        initialValue={modalComplaintData?.status ?? "pending"}
        onSelect={(value: string) =>
          setModalComplaintData(
            modalComplaintData ? { ...modalComplaintData, status: value } : undefined,
          )
        }
        placeholder={"Select Status"}
      />

      <Label>Previous Replies</Label>
      {modalComplaintData?.replies.map((reply, index) => (
        <li className="text-sm font-medium" key={index}> {reply} </li>
      ))}

      <ShortText
        title="Add a Reply"
        initialValue={" "}
        type="text"
        onSave={(value) =>
          setNewReply(value)
        }
        placeholder={"Enter A New Reply"}
      />

    </GenericModal>
  );
}
