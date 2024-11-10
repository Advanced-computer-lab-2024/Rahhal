import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TComplaint } from "@/features/admin/utils/columns-definitions/complaints-columns";
import { Label } from "@radix-ui/react-label";
import { GenericSelect } from "@/components/GenericSelect";
import { updateComplaint, addReply } from "@/api-calls/complaints-api-calls";
import { format } from "../utils/key-value-formatters/complaint-details-formatter";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";

interface ComplaintsModalProps {
  complaintData?: TComplaint;
  dialogTrigger?: React.ReactNode;
}

export function ComplaintsModal({ complaintData, dialogTrigger }: ComplaintsModalProps) {
  const [modalComplaintData, setModalComplaintData] = useState<TComplaint>(
    complaintData ?? DEFAULTS.COMPLAINT,
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
  };

  return (
    <GenericModal
      title={"Complaint Details"}
      description="Complaint Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <KeyValuePairGrid
        data={modalComplaintData}
        formatter={format}
        excludedFields={["_id", "status", "replies", "createdAt", "updatedAt", "__v"]}
      />
      <div className="pt-4 space-y-4">
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
              modalComplaintData ? { ...modalComplaintData, status: value } : DEFAULTS.COMPLAINT,
            )
          }
          placeholder={"Select Status"}
        />
      </div>
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
      <ShortText
        title="Add a Reply"
        initialValue={" "}
        type="text"
        onSave={(value) => setNewReply(value)}
        placeholder={"Enter A New Reply"}
      />
    </GenericModal>
  );
}
