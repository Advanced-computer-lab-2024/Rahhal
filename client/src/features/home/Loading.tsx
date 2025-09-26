import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-[var(--complimentary-color-dark)] mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Loading...
        </h1>
      </div>
    </div>
  );
}
