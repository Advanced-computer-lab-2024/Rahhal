import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { complaintsColumns, TComplaint } from "@/features/admin/utils/complaints-columns";
import { fetchComplaints } from "@/api-calls/complaints-api-calls";
import { ComplaintsModal } from "./ComplaintsModal";

function AdminComplaintsView() {
  const [complaints, setComplaints] = useState<TComplaint[]>([]);
  useEffect(() => {
    const init = async () => {
      const data = await fetchComplaints();
      setComplaints(data);
    };
    init();
  }, []);

  return (
    <div className="p-4">
      <DataTable
        data={complaints}
        columns={complaintsColumns}
        complaintFilter={true}
        newRowModal={
          <ComplaintsModal
            complaintData={undefined}
          />
        }
      />
    </div>
  );
}

export default AdminComplaintsView;
