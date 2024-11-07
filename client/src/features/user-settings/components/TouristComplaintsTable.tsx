import { useEffect, useState } from "react";
import { fetchComplaintByOwner, createComplaint } from "@/api-calls/complaints-api-calls";
import { useParams } from "react-router-dom";
import { TouristComplaintsModal } from "./TouristComplaintsModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { DataTable } from "@/components/data-table/DataTable";
import { touristComplaintsColumns } from "@/features/user-settings/utils/tourist-complaints-columns";
import { TComplaint } from "@/features/user-settings/utils/tourist-complaints-columns";
import { toast } from "@/hooks/use-toast";

function ComplaintsTable() {
  const { id } = useParams();
  const [complaints, setComplaints] = useState<TComplaint[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchComplaintByOwner(`${id}`);
      setComplaints(data);
    };
    init();
  }, [id]);

  const handleCreateComplaint = async (newComplaint: TComplaint) => {
    const complaint = await createComplaint(newComplaint) as TComplaint;
    toast({
      title: "Success",
      description: "Complaint Created Successfully",
      variant: "default",
    });
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
  };

  return (
    <div className="p-4">
      <DataTable
        data={complaints}
        columns={touristComplaintsColumns}
        newRowModal={
          <TouristComplaintsModal
            complaintData={undefined}
            dialogTrigger={<DataTableAddButton />}
            id={id ? id : ""}
            onCreateComplaint={handleCreateComplaint}
          />
        }
      />
    </div>
  );
}

export default ComplaintsTable;
