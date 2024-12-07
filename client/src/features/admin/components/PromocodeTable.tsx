import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { promoCodeColumns } from "@/features/admin/utils/columns-definitions/promocode-columns";
import { TPromocode } from "@/types/shared";
import { fetchPromocodes, deletePromocode } from "@/api-calls/promocode-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { PromocodeModal } from "./PromocodeModal";
import PromocodePlaceholder from "./PromocodePlaceholder";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";

export default function AdminPromocodeView() {
  const [promocodes, setPromocodes] = useState<TPromocode[]>([]);

  useEffect(() => {
    const loadPromocodes = async () => {
      try {
        const data = await fetchPromocodes();
        setPromocodes(data);
      } catch (error) {
        toast({
          title: "Error",
          description: (error as any).response?.data?.message || "Error loading promocodes",
          variant: "destructive",
        });
      }
    };
    loadPromocodes();
  }, []);

  const handlePromocodeDelete = async (id: string) => {
    try {
      const response = await deletePromocode(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Promocode deleted successfully",
          variant: "default",
        });

        const newPromocodes = promocodes.filter((promocode) => promocode._id !== id);
        setPromocodes(newPromocodes);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error deleting promocode",
        variant: "destructive",
      });
    }
  };

  const handlePromocodeUpdate = (promocode: TPromocode) => {
    const newPromocodes = promocodes.map((oldPromocode) => {
      if (oldPromocode._id === promocode._id) {
        return promocode;
      }
      return oldPromocode;
    });
    setPromocodes(newPromocodes);
  }



  return (
    <div className="container m-auto">
      {promocodes.length === 0 ? (
        <>
          <PromocodePlaceholder
            onSubmit={(newPromocode) => {
              setPromocodes((prev) => [...prev, newPromocode]);
            }}
          />
        </>
      ) : (
        <DataTable
          data={promocodes}
          columns={promoCodeColumns(handlePromocodeDelete, handlePromocodeUpdate)}
          newRowModal={
            <PromocodeModal
              promocodeData={undefined}
              dialogTrigger={<DataTableAddButton />}
              onDelete={handlePromocodeDelete}
              onSubmit={(newPromocode) => {
                setPromocodes((prev) => [...prev, newPromocode]);
              }}
            />
          }
        />
      )}
    </div>
  );
}
