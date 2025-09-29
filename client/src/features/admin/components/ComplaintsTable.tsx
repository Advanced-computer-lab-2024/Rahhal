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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetchComplaints();
      setComplaints(data);
      setLoading(false);
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

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="w-full max-w-full mx-auto">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
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
