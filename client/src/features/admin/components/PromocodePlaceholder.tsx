import { TPromocode } from "@/types/shared";
import { PromocodeModal } from "./PromocodeModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { TicketX } from "lucide-react";

interface NoDataPlaceholderProps {
  onSubmit: (promocode: TPromocode) => void;
}

export default function NoDataPlaceholder({ onSubmit }: NoDataPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-gray-700">
      {/* <div className="text-7xl mb-4">🎟️❌</div> */}
      <TicketX className="w-32 h-32 text-[#E1BC6D]" />
      <h2 className="text-2xl font-bold mb-2">No Promo Codes Yet!</h2>

      <p className="text-lg mb-4">
        Once you add a promo code, it will appear here. Ready to explore?
      </p>

      <PromocodeModal
        promocodeData={undefined}
        dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
        onSubmit={onSubmit}
      />
    </div>
  );
}
