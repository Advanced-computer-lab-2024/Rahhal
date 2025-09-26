/*
-[x] When clicked go to another page
-[x] View modified table with actions be delete, approve
-[ ] View details;
    * all of them are in the form of key value pair except [description, company profile, previous work]
*/
import { DataTable } from "@/components/data-table/DataTable";
import type { TUser } from "@/types/user";
import {
  deleteUserNoReload,
  fetchUsersPendingRequests,
  updateUser,
} from "@/api-calls/users-api-calls";
import { userRequestColumns } from "@/features/admin/utils/columns-definitions/users-pending-requests-columns";
import { Row } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function UserRequestsView() {
  const [usersRequests, setUsersRequests] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchUsersPendingRequests();
      setUsersRequests(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUserDelete = async (row: Row<TUser>) => {
    await deleteUserNoReload(row.original);

    const updatedUsers = usersRequests.filter(
      (user) => user._id !== row.original._id
    );
    setUsersRequests(updatedUsers);

    toast({
      title: "Success",
      description: "User deleted successfully",
      style: {
        backgroundColor: "#34D399",
        color: "white",
      }, // Assuming your toast uses 'status' or similar for the type of message
    });
  };

  const handleUserApprove = async (row: Row<TUser>) => {
    await updateUser(row.original, {
      approved: true,
    });

    const updatedUsers = usersRequests.filter(
      (user) => user._id !== row.original._id
    );
    setUsersRequests(updatedUsers);

    toast({
      title: "Success",
      description: "User approved successfully",
      style: {
        backgroundColor: "#34D399",
        color: "white",
      }, // Assuming your toast uses 'status' or similar for the type of message
    });
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
        Pending Users
      </h1>
      <div className="overflow-x-auto">
        <DataTable
          data={usersRequests}
          columns={userRequestColumns({
            onApprove: handleUserApprove,
            onDelete: handleUserDelete,
          })}
        />
      </div>
    </div>
  );
}

export default UserRequestsView;
