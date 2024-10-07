import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import {preferenceTagsColumns,TPreferenceTag} from "@/table-columns/preference-tags-columns"
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls"
import DataTableAddButton from "../DataTableAddButton";
import { PreferenceTagsModal } from "./PreferenceTagsModal";
function  AdminPreferenceTagView (){
    const [preferenceTags , setPreferenceTags] = useState<TPreferenceTag[]>([]);

    useEffect(() => {
        fetchPreferenceTags().then((data) => setPreferenceTags(data));
    }, []);

    return (
        <>
        <DataTable
            data={preferenceTags}
            columns={preferenceTagsColumns}
            newRowModal={
                <PreferenceTagsModal preferenceTagData={undefined} dialogTrigger={<DataTableAddButton />} />
            }
        />
    </>
    );

    
}

export default AdminPreferenceTagView;