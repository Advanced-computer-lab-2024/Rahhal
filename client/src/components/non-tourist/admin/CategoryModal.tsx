import { GenericModal } from "../../GenericModal";
import { TCategory } from "@/table-columns/categories-columns";
import { useEffect, useState } from "react";
import { submitCategory } from "@/api-calls/categories-api-calls";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";

interface CategoryModalProps {
  categoryData?: TCategory;
  dialogTrigger?: React.ReactNode;
}

export function CategoryModal({ categoryData, dialogTrigger }: CategoryModalProps) {
  const isNewCategory: boolean = categoryData === undefined; // check if the category is new or existing
  const [modalCategoryData, setModalCategoryData] = useState<TCategory | undefined>(categoryData); // current category data present in the modal

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
