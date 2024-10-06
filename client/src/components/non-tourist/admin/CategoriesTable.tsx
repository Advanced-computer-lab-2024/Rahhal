import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { categoriesColumns, TCategory } from "@/table-columns/categories-columns";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import DataTableAddButton from "../DataTableAddButton";
import { CategoryModal } from "./CategoryModal";

function AdminView() {
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

export default AdminView;
