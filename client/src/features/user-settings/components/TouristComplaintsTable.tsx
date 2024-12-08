import { useEffect, useState } from "react";
import { fetchComplaintByOwner, createComplaint } from "@/api-calls/complaints-api-calls";
import { useParams } from "react-router-dom";
import { TouristComplaintsModal } from "./TouristComplaintsModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { DataTable } from "@/components/data-table/DataTable";
import { touristComplaintsColumns } from "@/features/user-settings/utils/tourist-complaints-columns";
import { TComplaint } from "@/features/user-settings/utils/tourist-complaints-columns";
import NoComplaints from "@/assets/NoComplaints.png";
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
    const complaint = (await createComplaint(newComplaint)) as TComplaint;
    toast({
      title: "Success",
      description: "Complaint Created Successfully",
      variant: "default",
    });
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
  };

  return (
    <div className="p-4">
      {complaints.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={NoComplaints} alt="No Complaints Yet" className="w-1/2 h-auto mb-4" />
          <p className="text-lg text-gray-600 mb-4">
            You haven't filed any complaints yet. If you're experiencing any issues, feel free to
            let us know by clicking the button below!
          </p>
          {/* Button for adding a complaint */}
          <TouristComplaintsModal
            complaintData={undefined}
            dialogTrigger={<DataTableAddButton className="bg-[#1d3c51] text-white rounded" />}
            id={id ? id : ""}
            onCreateComplaint={handleCreateComplaint}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
          <div className="p-4 border-b border-gray-300">
            <div style={{ backgroundColor: "#6d91e1", padding: "10px", borderRadius: "5px" }}>
              <h2 className="text-lg font-semibold" style={{ color: "white" }}>
                My Complaints
              </h2>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2 mb-4"></div>
            <DataTable
              data={complaints}
              columns={touristComplaintsColumns}
              newRowModal={
                <TouristComplaintsModal
                  complaintData={undefined}
                  dialogTrigger={<DataTableAddButton className="bg-[var(--complimentary-color)] hover:bg-[var(--complimentary-color-dark)] text-white rounded" />}
                  id={id ? id : ""}
                  onCreateComplaint={handleCreateComplaint}
                />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintsTable;
