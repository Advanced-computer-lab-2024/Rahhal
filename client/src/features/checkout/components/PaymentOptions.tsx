import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentMain from "@/features/payment/PaymentMain";
import { Label } from "@/components/ui/label";

type PaymentMethod = {
  id: string;
  label: string;
  icons: string[];
  additional?: string;
  expandable?: boolean;
};

type PaymentSelectorProps = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (value: string) => void;
  stripePaymentTrigger: boolean;
  setStripePaymentTrigger: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  onPaymentCompletion: () => Promise<void>;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "wallet",
    label: "Wallet",
    icons: [],
    expandable: false,
  },
  {
    id: "creditCard",
    label: "Pay via ( Debit Cards / Credit cards / Paypal / Apple Pay )",
    icons: [],
    expandable: true,
  },
  {
    id: "cash",
    label: "Cash on Delivery (COD)",
    icons: [],
    expandable: false,
  },
];

export function PaymentOptions({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  stripePaymentTrigger,
  setIsLoading,
  setStripePaymentTrigger,
  onPaymentCompletion,
}: PaymentSelectorProps) {
  return (
    <div className="w-full  mt-10">
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
                  </div>
                  {/* <div className="flex items-center gap-2">
                    {method.icons.map((icon, index) => (
                      <img
                        key={index}
                        src={icon}
                        alt="payment method"
                        className="h-6 object-contain"
                      />
                    ))}
                    {method.additional && (
                      <span className="text-sm text-gray-500">{method.additional}</span>
                    )}
                  </div> */}
                </div>
              </div>
              {method.expandable && selectedPaymentMethod === method.id && (
                <div className="p-4 border-t bg-white">
                  {method.id === "creditCard" && (
                    <PaymentMain
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
