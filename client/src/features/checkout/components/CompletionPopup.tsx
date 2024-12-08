import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface CompletionPopupProps {
  completed: boolean;
  isPayedWithWallet?: boolean;
  formattedRemainingWalletBalance?: string;
  orderDetails?: string;
}

export function CompletionPopup({
  completed,
  isPayedWithWallet,
  formattedRemainingWalletBalance,
  orderDetails = "Cheeseburger and Fries",
}: CompletionPopupProps) {
  if (!completed) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
        <div className="flex flex-col gap-4">
          {isPayedWithWallet && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="content-center flex flex-col">
                <div>
                  <span className="font-semibold">{formattedRemainingWalletBalance} </span> left in
                  you wallet
                </div>
                <span>Enjoy them 🥳</span>
              </AlertDescription>
            </Alert>
          )}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-2">
          Thank you for making your order!
        </h2>
        <div className="text-gray-600">
          <p className="mb-1">You have chosen the following:</p>
          <p className="font-medium">{orderDetails}</p>
        </div>
      </div>
    </div>
  );
}
