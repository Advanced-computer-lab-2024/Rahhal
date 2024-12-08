import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { DEFAULTS } from "@/lib/constants";
import { TComplaint } from "@/features/admin/utils/columns-definitions/complaints-columns";
import { Label } from "@radix-ui/react-label";
import { GenericSelect } from "@/components/GenericSelect";
import { updateComplaint, addReply } from "@/api-calls/complaints-api-calls";
import { format } from "../utils/key-value-formatters/complaint-details-formatter";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";

interface ComplaintsModalProps {
  complaintData?: TComplaint;
  dialogTrigger?: React.ReactNode;
  onSubmit?: (complaint: TComplaint) => void;
}

export function ComplaintsModal({ complaintData, dialogTrigger, onSubmit}: ComplaintsModalProps) {
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
    if (!modalComplaintData) return;

    try {
      const response = await updateComplaint(modalComplaintData._id,  modalComplaintData.status);
      if (response?.status === STATUS_CODES.STATUS_OK || response?.status === STATUS_CODES.CREATED) {
        toast({
          title: "Success",
          description: "Complaint saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (newReply) {
          const replyResponse = await addReply(modalComplaintData._id, newReply);
          if (replyResponse?.status === STATUS_CODES.STATUS_OK || replyResponse?.status === STATUS_CODES.CREATED) {
            toast({
              title: "Success",
              description: "Reply added successfully",
              style: {
                backgroundColor: "#34D399",
                color: "white",
              },
            });
            setNewReply("");
            setModalComplaintData(replyResponse.data as TComplaint);
          }
        }
        if (onSubmit) {
          onSubmit(modalComplaintData);
          setModalComplaintData(DEFAULTS.COMPLAINT);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error saving complaint",
        variant: "destructive",
      });
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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
          <Label>Enter A New Reply</Label>
          <Input
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Enter A New Reply"
          />
        </div>
      </div>
    </GenericModal>
  );
}
