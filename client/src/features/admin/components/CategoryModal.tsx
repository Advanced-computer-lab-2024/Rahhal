import { GenericModal } from "@/components/GenericModal";
import { TCategory } from "@/features/admin/utils/columns-definitions/categories-columns";
import { useEffect, useState } from "react";
import { submitCategory } from "@/api-calls/categories-api-calls";
import { DEFAULTS } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CategoryModalProps {
  categoryData?: TCategory;
  dialogTrigger?: React.ReactNode;
  onDelete?: (id: string) => void;
  onSubmit?: (category: TCategory) => void;
}

export function CategoryModal({
  categoryData,
  dialogTrigger,
  onDelete,
  onSubmit,
}: CategoryModalProps) {
  const isNewCategory: boolean = categoryData === undefined; // check if the category is new or existing
  const [modalCategoryData, setModalCategoryData] = useState<TCategory | undefined>(categoryData); // current category data present in the modal

  useEffect(() => {
    // if the category is new, set the modal data to default values
    if (isNewCategory) {
      setModalCategoryData(DEFAULTS.CATEGORY);
    }
  }, []);

  const handleDelete = () => {
    if (modalCategoryData && onDelete) {
      onDelete(modalCategoryData._id);
    }
  };

  const handleSubmit = async () => {
    if (!modalCategoryData) return;
    try {
      const response = await submitCategory(modalCategoryData, isNewCategory);
      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "Category saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalCategoryData);
          setModalCategoryData(DEFAULTS.CATEGORY);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={categoryData?.name ?? "New Category"}
      description="Category Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewCategory}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <Input 
            value={modalCategoryData?.name}
            onChange={(e) =>
              setModalCategoryData(
                modalCategoryData ? { ...modalCategoryData, name: e.target.value } : undefined,
              )
            }
            placeholder="Category Name"
          />
        </div>
      </div>
      <></>
    </GenericModal>
  );
}
