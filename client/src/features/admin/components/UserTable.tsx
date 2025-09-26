import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { userColumns } from "@/features/admin/utils/columns-definitions/user-columns";
import { fetchUsers, deleteUser } from "@/api-calls/users-api-calls";
import { UserModal } from "./UserModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import type { TUser } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function UserView() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            (error as any).response?.data?.message || "Error loading users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "User deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newUsers = users.filter((user) => user._id !== id);
        setUsers(newUsers);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error deleting user",
        variant: "destructive",
      });
    }
  };

  const handleUserUpdate = (user: TUser) => {
    const newUsers = users.map((oldUser) => {
      if (oldUser._id === user._id) {
        return user;
      }
      return oldUser;
    });
    setUsers(newUsers);
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
        Users
      </h1>
      <DataTable
        data={users}
        columns={userColumns(handleUserDelete, handleUserUpdate)}
        newRowModal={
          <UserModal
            dialogTrigger={
              <DataTableAddButton className="bg-[#1d3c51] text-white rounded" />
            }
            onDelete={handleUserDelete}
            onSubmit={(newUser) => {
              setUsers((prev) => [...prev, newUser]);
            }}
          />
        }
      />
    </div>
  );
}

export default UserView;
