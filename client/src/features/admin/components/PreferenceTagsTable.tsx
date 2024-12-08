import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  preferenceTagsColumns,
  TPreferenceTag,
} from "@/features/admin/utils/columns-definitions/preference-tags-columns";
import { fetchPreferenceTags, deletePreferenceTag } from "@/api-calls/preference-tags-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { PreferenceTagsModal } from "./PreferenceTagsModal";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AdminPreferenceTagView() {
  const [preferenceTags, setPreferenceTags] = useState<TPreferenceTag[]>([]);

  useEffect(() => {
    fetchPreferenceTags().then((data) => setPreferenceTags(data));
  }, []);

  const handlePreferenceTagDelete = async (id: string) => {
    try {
      const response = await deletePreferenceTag(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Preference tag deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newPreferenceTags = preferenceTags.filter(
          (preferenceTag) => preferenceTag._id !== id,
        );
        setPreferenceTags(newPreferenceTags);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error deleting preference tag",
        variant: "destructive",
      });
    }
  };

  const handlePreferenceTagUpdate = (preferenceTag: TPreferenceTag) => {
    const newPreferenceTags = preferenceTags.map((oldPreferenceTag) => {
      if (oldPreferenceTag._id === preferenceTag._id) {
        return preferenceTag;
      }
      return oldPreferenceTag;
    });
    setPreferenceTags(newPreferenceTags);
  };

  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent",
        )}
      >
        Preference Tags
      </h1>
      <DataTable
        data={preferenceTags}
        columns={preferenceTagsColumns(handlePreferenceTagDelete, handlePreferenceTagUpdate)}
        newRowModal={
          <PreferenceTagsModal
            preferenceTagData={undefined}
            dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
            onDelete={handlePreferenceTagDelete}
            onSubmit={(preferenceTag) => {
              setPreferenceTags([...preferenceTags, preferenceTag]);
            }}
          />
        }
      />
    </div>
  );
}

export default AdminPreferenceTagView;
