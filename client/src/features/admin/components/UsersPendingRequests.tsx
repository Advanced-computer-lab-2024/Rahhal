/*
-[x] When clicked go to another page
-[x] View modified table with actions be delete, approve
-[ ] View details;
    * all of them are in the form of key value pair except [description, company profile, previous work]
*/
import { useQuery } from "@tanstack/react-query";
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
import { useState } from "react";

function UserRequestsView() {
  const [usersRequests, setUsersRequests] = useState<TUser[]>([]);

  const { isLoading, error } = useQuery<TUser[]>({
    queryKey: ["users-pending-requests"],
    queryFn: async () => {
      const data = await fetchUsersPendingRequests();
      setUsersRequests(data);
      return data;
    },
  });

  const handleUserDelete = async (row: Row<TUser>) => {
    await deleteUserNoReload(row.original);

    const updatedUsers = usersRequests.filter((user) => user._id !== row.original._id);
    setUsersRequests(updatedUsers);

    toast({
      title: "Success",
      description: "User deleted successfully",
      variant: "default", // Assuming your toast uses 'status' or similar for the type of message
    });
  };

  const handleUserApprove = async (row: Row<TUser>) => {
    await updateUser(row.original, {
      approved: true,
    });

    const updatedUsers = usersRequests.filter((user) => user._id !== row.original._id);
    setUsersRequests(updatedUsers);

    toast({
      title: "Success",
      description: "User approved successfully",
      variant: "default", // Assuming your toast uses 'status' or similar for the type of message
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <DataTable
      data={usersRequests}
      columns={userRequestColumns({ onApprove: handleUserApprove, onDelete: handleUserDelete })}
    />
  );
}

export default UserRequestsView;
