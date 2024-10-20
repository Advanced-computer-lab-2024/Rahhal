import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { userColumns } from "@/features/admin/utils/columns-definitions/user-columns";
import { TUser } from "@/types/user";
import { fetchUsers } from "@/api-calls/users-api-calls";
import { UserModal } from "./UserModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { Button } from "@/components/ui/button";

function UserView() {
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data as TUser[]));
  }, []);
  return (
    <>
      <DataTable
        data={users}
        columns={userColumns}
        newRowModal={<UserModal dialogTrigger={<DataTableAddButton />} />}
      />

      <a href="/admin/users/requests">
        <Button>Show Users Requests</Button>
      </a>
    </>
  );
}

export default UserView;
