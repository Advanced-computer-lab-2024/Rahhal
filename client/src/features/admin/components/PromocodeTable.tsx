import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { promoCodeColumns } from "@/features/admin/utils/columns-definitions/promocode-columns";
import { TPromocode } from "@/types/shared";
import {
  fetchPromocodes,
  deletePromocode,
} from "@/api-calls/promocode-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { PromocodeModal } from "./PromocodeModal";
import PromocodePlaceholder from "./PromocodePlaceholder";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AdminPromocodeView() {
  const [promocodes, setPromocodes] = useState<TPromocode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromocodes = async () => {
      setLoading(true);
      try {
        const data = await fetchPromocodes();
        setPromocodes(data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            (error as any).response?.data?.message ||
            "Error loading promocodes",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
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
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newPromocodes = promocodes.filter(
          (promocode) => promocode._id !== id
        );
        setPromocodes(newPromocodes);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error deleting promocode",
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
        Promocodes
      </h1>
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
          columns={promoCodeColumns(
            handlePromocodeDelete,
            handlePromocodeUpdate
          )}
          newRowModal={
            <PromocodeModal
              promocodeData={undefined}
              dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
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
