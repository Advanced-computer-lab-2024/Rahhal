import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { userColumns, TUser } from "@/table-columns/user-columns";
import { fetchUsers } from "@/api-calls/users-api-calls";
import { User } from "lucide-react";
import { UserModal } from "./UserModal";
import DataTableAddButton from "../DataTableAddButton";

function UserView() {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    fetchUsers().then((data: TUser[]) => setUsers(data));
  }, []);

  return (
    <>
      <DataTable
        data={users}
        columns={userColumns}
        newRowModal={<UserModal dialogTrigger={<DataTableAddButton />} />}
      />
    </>
  );
}

export default UserView;
