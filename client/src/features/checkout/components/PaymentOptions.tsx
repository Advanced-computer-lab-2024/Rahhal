import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';

type PaymentMethod = {
  id: string;
  label: string;
  icons: string[];
  additional?: string;
};

type PaymentSelectorProps = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (value: string) => void;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wallet',
    label: 'Wallet',
    icons: []
  },
  {
    id: 'pay-via',
    label: 'Pay via ( Debit Cards / Credit cards / Paypal / Apple Pay )',
    icons: []
  },
  {
    id: 'cod',
    label: 'Cash on Delivery (COD)',
    icons: []
  }
];

export function PaymentOptions({ selectedPaymentMethod, setSelectedPaymentMethod }: PaymentSelectorProps){
  return (
    <div className="w-full max-w-2xl mt-10">
      <div className="mb-2">
        <h2 className="text-xl font-medium">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>
      
      <RadioGroup 
        value={selectedPaymentMethod} 
        onValueChange={setSelectedPaymentMethod}
        className="space-y-2"
      >
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
              ${selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value={method.id}
                checked={selectedPaymentMethod === method.id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">{method.label}</span>
            </div>
            
            <div className="flex items-center gap-2">
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
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}