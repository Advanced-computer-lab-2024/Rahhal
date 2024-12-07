import { GenericModal } from "@/components/GenericModal";
import { TCategory } from "@/features/admin/utils/columns-definitions/categories-columns";
import { useEffect, useState } from "react";
import { submitCategory } from "@/api-calls/categories-api-calls";
import ShortText from "@/components/ShortText";
import { deleteCategory } from "@/api-calls/categories-api-calls";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { DEFAULTS } from "@/lib/constants";

interface CategoryModalProps {
  categoryData?: TCategory;
  dialogTrigger?: React.ReactNode;
}

export function CategoryModal({ categoryData, dialogTrigger }: CategoryModalProps) {
  const isNewCategory: boolean = categoryData === undefined; // check if the category is new or existing
  const [modalCategoryData, setModalCategoryData] = useState<TCategory | undefined>(categoryData); // current category data present in the modal

  const handleDeleteCategory = () => {
    if (categoryData)
       deleteCategory(categoryData._id);
  };
  useEffect(() => {
    // if the category is new, set the modal data to default values
    if (isNewCategory) {
      setModalCategoryData(DEFAULTS.CATEGORY);
    }
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={categoryData?.name ?? "New Category"}
      description="Category Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => {
        submitCategory(modalCategoryData, isNewCategory);
      }}
    >
      <Button variant="destructive" className="fixed top-2 right-9" onClick={() => handleDeleteCategory()}>
      <span className="sr-only">Delete</span>
      <FaTrash className="h-4 w-4" />
  </Button>
      <ShortText
        title="Name"
        initialValue={modalCategoryData?.name ?? ""}
        type="text"
        onSave={(value) =>
          setModalCategoryData(
            modalCategoryData ? { ...modalCategoryData, name: value } : undefined,
          )
        }
        placeholder={"Enter Category Name"}
        initialDisabled={!isNewCategory}
      />
      <></>
    </GenericModal>
  );
}
