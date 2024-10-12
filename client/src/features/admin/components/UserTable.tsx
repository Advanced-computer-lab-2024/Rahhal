import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { userColumns, TUser } from "@/features/admin/utils/user-columns";
import { fetchUsers } from "@/api-calls/users-api-calls";
import { UserModal } from "./UserModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";

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
