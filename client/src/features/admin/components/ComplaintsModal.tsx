import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { TComplaint } from "@/features/admin/utils/complaints-columns";
import { Label } from "@radix-ui/react-label";
import { GenericSelect } from "@/components/GenericSelect";
import { updateComplaint, addReply } from "@/api-calls/complaints-api-calls";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "@/features/admin/utils/complaint-details-formatter";

interface ComplaintsModalProps {
  complaintData?: TComplaint;
  dialogTrigger?: React.ReactNode;
}

type KeyValuePairViewProps = {
  complaint: Partial<TComplaint>;
};

const KeyValuePairView = ({ complaint }: KeyValuePairViewProps) => {
  const entries = Object.entries(complaint).filter(([key, value]) => {
    const excludedFields = ["_id", "status", "replies", "createdAt", "updatedAt", "__v"];
    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (excludedFields.includes(key)) return false;
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(([key, value]) => {
            const [formattedKey, formattedValue] = format(key, value);
            return (
              <div
                key={key}
                className="flex flex-col p-4 bg-muted rounded-lg overflow-hidden break-words"
              >
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  {formattedKey}
                </span>
                <span className="text-base">{formattedValue}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

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
      <KeyValuePairView complaint={modalComplaintData} />
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
