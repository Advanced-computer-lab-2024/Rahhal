import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  complaintsColumns,
  TComplaint,
} from "@/features/admin/utils/columns-definitions/complaints-columns";
import { fetchComplaints } from "@/api-calls/complaints-api-calls";
import { ComplaintsModal } from "./ComplaintsModal";
import { cn } from "@/lib/utils";

function AdminComplaintsView() {
  const [complaints, setComplaints] = useState<TComplaint[]>([]);
  useEffect(() => {
    const init = async () => {
      const data = await fetchComplaints();
      setComplaints(data);
    };
    init();
  }, []);

  const handleComplaintUpdate = (complaint: TComplaint) => {
    const newComplaints = complaints.map((oldComplaint) => {
      if (oldComplaint._id === complaint._id) {
        return complaint;
      }
      return oldComplaint;
    });
    setComplaints(newComplaints);
  };

  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent",
        )}
      >
        User Complaints
      </h1>
      <DataTable
        data={complaints}
        columns={complaintsColumns(handleComplaintUpdate)}
        complaintFilter={true}
        newRowModal={<ComplaintsModal complaintData={undefined} />}
      />
    </div>
  );
}

export default AdminComplaintsView;
