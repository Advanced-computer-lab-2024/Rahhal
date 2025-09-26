import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  categoriesColumns,
  TCategory,
} from "@/features/admin/utils/columns-definitions/categories-columns";
import {
  fetchCategories,
  deleteCategory,
} from "@/api-calls/categories-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { CategoryModal } from "./CategoryModal";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function CategoryView() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCategoryDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Category deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(newCategories);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error deleting category",
        variant: "destructive",
      });
    }
  };

  const handleCategoryUpdate = (category: TCategory) => {
    const newCategories = categories.map((oldCategory) => {
      if (oldCategory._id === category._id) {
        return category;
      }
      return oldCategory;
    });
    setCategories(newCategories);
  };

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Categories
      </h1>
      <DataTable
        data={categories}
        columns={categoriesColumns(handleCategoryDelete, handleCategoryUpdate)}
        newRowModal={
          <CategoryModal
            categoryData={undefined}
            dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
            onSubmit={(newCategory) => {
              setCategories((prevCategories) => [
                ...prevCategories,
                newCategory,
              ]);
            }}
            onDelete={handleCategoryDelete}
          />
        }
      />
    </div>
  );
}

export default CategoryView;
