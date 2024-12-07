import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  preferenceTagsColumns,
  TPreferenceTag,
} from "@/features/admin/utils/columns-definitions/preference-tags-columns";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { PreferenceTagsModal } from "./PreferenceTagsModal";
function AdminPreferenceTagView() {
  const [preferenceTags, setPreferenceTags] = useState<TPreferenceTag[]>([]);

  useEffect(() => {
    fetchPreferenceTags().then((data) => setPreferenceTags(data));
  }, []);

  return (
    <div className="container m-auto">
      <DataTable
        data={preferenceTags}
        columns={preferenceTagsColumns}
        newRowModal={
          <PreferenceTagsModal
            preferenceTagData={undefined}
            dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
          />
        }
      />
    </div>
  );
}

export default AdminPreferenceTagView;
