import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { userColumns } from "@/features/admin/utils/columns-definitions/user-columns";
import { fetchUsers } from "@/api-calls/users-api-calls";
import { UserModal } from "./UserModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { Button } from "@/components/ui/button";
import type { TUser } from "@/types/user";

function UserView() {
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data as TUser[]));
  }, []);
  return (
    <div className="container m-auto">
      <DataTable
        data={users}
        columns={userColumns}
        newRowModal={<UserModal dialogTrigger={<DataTableAddButton className="bg-[#1d3c51] text-white rounded"/>} />}
      />

      <a href="/admin/users/requests" className="flex justify-center mt-10">
        <Button className="bg-[#1d3c51]" >Show Users Requests</Button>
      </a>
    </div>
  );
}

export default UserView;
