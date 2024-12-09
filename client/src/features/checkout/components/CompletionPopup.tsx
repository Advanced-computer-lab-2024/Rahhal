import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import currencyExchange from "@/utils/currency-exchange";
import { useCurrencyStore } from "@/stores/currency-exchange-store";

interface CompletionPopupProps {
  completed: boolean;
  isPayedWithWallet?: boolean;
  remainingWalletBalance?: number;
  orderDetails?: string;
}

export function CompletionPopup({
  completed,
  isPayedWithWallet,
  remainingWalletBalance,
  orderDetails = "Cheeseburger and Fries",
}: CompletionPopupProps) {
  if (!completed) return null;

  const { currency } = useCurrencyStore();

  const convertedWalletBalance = currencyExchange("EGP", remainingWalletBalance || 0);
  const formattedRemainingWalletBalance = `${convertedWalletBalance?.toFixed(2)} ${currency}`;

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
          You will be redirected in a few seconds. Thanks for your patience 🙏
        </div>
      </div>
    </div>
  );
}
