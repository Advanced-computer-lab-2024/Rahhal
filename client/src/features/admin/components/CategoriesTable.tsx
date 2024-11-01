import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  categoriesColumns,
  TCategory,
} from "@/features/admin/utils/columns-definitions/categories-columns";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { CategoryModal } from "./CategoryModal";

function CategoryView() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  return (
    <>
      <DataTable
        data={categories}
        columns={categoriesColumns}
        newRowModal={
          <CategoryModal categoryData={undefined} dialogTrigger={<DataTableAddButton />} />
        }
      />
    </>
  );
}

export default CategoryView;
