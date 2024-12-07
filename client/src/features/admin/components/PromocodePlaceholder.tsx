import { TPromocode } from "@/types/shared";
import { PromocodeModal } from "./PromocodeModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { TicketX } from "lucide-react";

interface NoDataPlaceholderProps {
  onSubmit: (promocode: TPromocode) => void;
}

export default function NoDataPlaceholder({ onSubmit }: NoDataPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg border border-gray-300">
      <TicketX className="w-16 h-16 text-gray-500" />
      <h2 className="mt-4 text-lg font-semibold text-gray-700">No Promocodes Available</h2>
      <p className="mt-2 text-sm text-gray-500">Looks like you haven’t added any promocodes yet.</p>
      <p className="mt-2 text-sm text-gray-500">
        People are waiting for some discounts! Add a new promocode now.
      </p>
      <PromocodeModal promocodeData={undefined} dialogTrigger={<DataTableAddButton />} onSubmit={onSubmit} />
    </div>
  );
}
