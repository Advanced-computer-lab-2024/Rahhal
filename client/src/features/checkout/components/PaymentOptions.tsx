import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StripeForm from "@/components/payment/StripeForm";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, CreditCard, Wallet } from "lucide-react";

export type TPaymentMethod = {
  id: string;
  label: string;
  icon: JSX.Element;
  additional?: string;
  expandable?: boolean;
};

type PaymentSelectorProps = {
  formattedWalletBalance: string;
  walletBalance: number;
  selectedPaymentMethod: string;
  stripePaymentTrigger: boolean;
  paymentMethods?: TPaymentMethod[];
  amount: number;
  setSelectedPaymentMethod: (value: string) => void;
  setStripePaymentTrigger: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  onPaymentCompletion: () => Promise<void>;
};

const defaultPaymentMethods: TPaymentMethod[] = [
  {
    id: "wallet",
    label: "Wallet",
    icon: <Wallet className="text-primary-color" />,
    expandable: false,
  },
  {
    id: "creditCard",
    label: "Pay via card card",
    icon: <CreditCard className="text-primary-color" />,
    expandable: true,
  },
  {
    id: "cash",
    label: "Cash on Delivery (COD)",
    icon: <CircleDollarSign className="text-primary-color" />,
    expandable: false,
  },
];

export function PaymentOptions({
  selectedPaymentMethod,
  stripePaymentTrigger,
  formattedWalletBalance,
  walletBalance,
  paymentMethods = defaultPaymentMethods,
  amount,
  setSelectedPaymentMethod,
  setIsLoading,
  setStripePaymentTrigger,
  onPaymentCompletion,
}: PaymentSelectorProps) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-medium">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>

      <RadioGroup
        value={selectedPaymentMethod}
        onValueChange={(value) => {
          setSelectedPaymentMethod(value);
        }}
      >
        {paymentMethods.map((method) => {
          const isDisabled = method.id === "wallet" && walletBalance < amount;

          return (
            <div key={method.id} className="border rounded-lg overflow-hidden">
              <div
                className={`border-l-2 transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "border-complementary"
                    : "border-transparent"
                } ${isDisabled ? "" : "hover:bg-gray-50"}`}
              >
                <label
                  onClick={() => !isDisabled && setSelectedPaymentMethod(method.id)}
                  htmlFor={method.id}
                  className={`block p-4 ${
                    isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  } flex flex-col`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="text-complementary disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isDisabled}
                      />
                      <Label htmlFor={method.id} className="text-sm font-medium">
                        {method.label}
                      </Label>
                      {method.icon}
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <span className={isDisabled ? "text-gray-400" : "text-gray-500"}>
                        {method.id === "wallet" && formattedWalletBalance}
                      </span>
                      {isDisabled && method.id === "wallet" && (
                        <p className="text-[0.7rem] text-red-800 ">Insufficient balance</p>
                      )}
                    </div>
                  </div>
                </label>
                {method.expandable && selectedPaymentMethod === method.id && (
                  <div className="p-4 border-t bg-white">
                    {method.id === "creditCard" && (
                      <StripeForm
                        onPaymentCompletion={onPaymentCompletion}
                        stripePaymentTrigger={stripePaymentTrigger}
                        setStripePaymentTrigger={setStripePaymentTrigger}
                        setIsLoading={setIsLoading}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
