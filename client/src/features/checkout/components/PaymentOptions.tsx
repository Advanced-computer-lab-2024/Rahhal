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
  walletBalance: string;
  selectedPaymentMethod: string;
  stripePaymentTrigger: boolean;
  setSelectedPaymentMethod: (value: string) => void;
  setStripePaymentTrigger: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  onPaymentCompletion: () => Promise<void>;
  paymentMethods?: TPaymentMethod[];
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
  walletBalance,
  setSelectedPaymentMethod,
  setIsLoading,
  setStripePaymentTrigger,
  onPaymentCompletion,
  paymentMethods = defaultPaymentMethods,
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
        {paymentMethods.map((method) => (
          <div key={method.id} className="border rounded-lg overflow-hidden">
            <div
              className={`border-l-2 transition-colors ${
                selectedPaymentMethod === method.id
                  ? "border-complementary"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="text-complementary"
                    />
                    <Label htmlFor={method.id} className="text-sm font-medium">
                      {method.label}
                    </Label>
                    {method.icon}
                  </div>
                  <span className="text-gray-500">{method.id === "wallet" && walletBalance}</span>
                </div>
              </div>
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
        ))}
      </RadioGroup>
    </div>
  );
}
