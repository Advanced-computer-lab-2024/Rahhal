import { PromocodeModal } from "./PromocodeModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";

export default function NoDataPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg border border-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6 6m0 0l6-6m-6 6V3m6 6H9" />
      </svg>
      <h2 className="mt-4 text-lg font-semibold text-gray-700">No Promocodes Available</h2>
      <p className="mt-2 text-sm text-gray-500">Looks like you haven’t added any promocodes yet.</p>
      <p className="mt-2 text-sm text-gray-500">
        People are waiting for some discounts! Add a new promocode now.
      </p>
      <PromocodeModal promocodeData={undefined} dialogTrigger={<DataTableAddButton />} />
    </div>
  );
}
