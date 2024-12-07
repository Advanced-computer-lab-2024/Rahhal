import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  promoCodeColumns,
} from "@/features/admin/utils/columns-definitions/promocode-columns";
import { TPromocode } from "@/types/shared";
import { fetchPromocodes } from "@/api-calls/promocode-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { PromocodeModal } from "./PromocodeModal";
import PromocodePlaceholder  from "./PromocodePlaceholder";

export default function AdminPromocodeView() {
  const [promocodes, setPromocodes] = useState<TPromocode[]>([]);

  useEffect(() => {
    fetchPromocodes().then((data) => setPromocodes(data));
  }, []);

  return (
    <div className="container m-auto">
        {promocodes.length === 0 ? (
            <>
            <PromocodePlaceholder />
            </>
        ) 
        : (
      <DataTable
        data={promocodes}
        columns={promoCodeColumns}
        newRowModal={
          <PromocodeModal
            promocodeData={undefined}
            dialogTrigger={<DataTableAddButton />}
          />
        }
      />
        )}
    </div>
  );
}
