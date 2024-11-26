import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PROMO_CODES } from '../utils/CartExample';
import { useState } from 'react';
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { TUser } from "@/types/user";
import currencyExchange from '@/utils/currency-exchange';
import { handlePayment } from './Payment';
import { updateUser } from '@/api-calls/users-api-calls';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  picture: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  _id: string;
  userId: string;
  products: CartItem[];
}

interface Promotion {
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  description: string;
}

export function OrderSummary({
  cart,
  user,
  newAddress,
  city,
  postalCode,
  phone,
  saveInfo,
  selectedPaymentMethod,
  setErrors,
  setCompleted,
}: {
  cart:CartProps;
  user:TUser;
  newAddress: string;
  city: string;
  postalCode: string;
  phone: string;
  saveInfo: boolean;
  selectedPaymentMethod: string;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
})  {
  const {toast} = useToast();
  const navigate = useNavigate();
  const {currency} = useCurrencyStore();
  const baseCurrency = 'EGP';

  const [promoCode, setPromoCode] = useState('');
  const [activePromotion, setActivePromotion] = useState<{ code: string; promotion: Promotion } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const defaultShipping = 100;
  
  let subtotal = cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const subTotalConverted = currencyExchange(baseCurrency, subtotal);
  const subTotalDisplayed = subTotalConverted ? subTotalConverted.toFixed(2) : 'N/A';
  
  const calculateDiscount = () => {
    if (!activePromotion) return 0;

    switch (activePromotion.promotion.type) {
      case 'percentage':
        return (subtotal * activePromotion.promotion.value) / 100;
      case 'fixed':
        return Math.min(activePromotion.promotion.value, subtotal);
      default:
        return 0;
    }
  };

  const getShippingCost = () => {
    if (activePromotion?.promotion.type === 'shipping') return 0;
    return defaultShipping;
  };

  let discountAmount = calculateDiscount();
  const discountAmountConverted = currencyExchange(baseCurrency, discountAmount);
  const discountAmountDisplayed = discountAmountConverted ? discountAmountConverted.toFixed(2) : 'N/A';

  let shippingCost = getShippingCost();
  const shippingCostConverted = currencyExchange(baseCurrency, shippingCost);
  const shippingCostDisplayed = shippingCostConverted ? shippingCostConverted.toFixed(2) : 'N/A';

  const subtotalAfterDiscount = subtotal - discountAmount;

  const tax = subtotalAfterDiscount * 0.12;
  const taxConverted = currencyExchange(baseCurrency, tax);
  const taxDisplayed = taxConverted ? taxConverted.toFixed(2) : 'N/A';

  const total = subtotalAfterDiscount + shippingCost + tax;
  const totalConverted = currencyExchange(baseCurrency, total);
  const totalDisplayed = totalConverted ? totalConverted.toFixed(2) : 'N/A';
  
  const  handleApplyPromoCode = () => {
    setError(null);

    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    const normalizedCode = promoCode.trim().toUpperCase();
    const promotion = PROMO_CODES[normalizedCode];

    if (!promotion) {
      setError('Invalid promo code');
      return;
    }

    setActivePromotion({ code: normalizedCode, promotion });
    setPromoCode('');
  };


  const handleRemovePromotion = () => {
    
    setActivePromotion(null);
    getShippingCost();
  };

  const productsWithViewingPrices = cart.products.map((item) => ({
    ...item,
    viewingPrice: currencyExchange(baseCurrency, item.product.price * item.quantity)?.toFixed(2) || 'N/A'
  }));

  async function handleContinueToPayment () {
    const newErrors: { address?: string; city?: string; postalCode?: string; phone?: string } = {};

    if (!newAddress) {
      newErrors.address = "Address is required";
    }
    if (!city) {
      newErrors.city = "City is required";
    }
    if (!postalCode) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!phone) {
      newErrors.phone = "Phone is required";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    else{
      newErrors.address = "";
      newErrors.city = "";
      newErrors.postalCode = "";
      newErrors.phone = "";
      setErrors(newErrors);
    }


    try{
      const fullAddress = `${newAddress}, ${city}`;
      await handlePayment(selectedPaymentMethod, discountAmount, activePromotion?.code || '', fullAddress);
      if(saveInfo){
        const updatedAddresses = [...(user.addresses || []), fullAddress];
        console.log(updatedAddresses);
        await updateUser(user, {addresses: updatedAddresses});
      }
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        navigate(`/my-orders/${user._id}`);

      }, 7000);
    }
    catch(e){
      toast({
        title: "Error",
        description: (e as any).response.data.error,
        variant: "destructive",

        duration: 3000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="space-y-4">
        {productsWithViewingPrices.map((item) => (
          <div key={item.product._id} className="flex items-center gap-4">
            <div className="relative">
              <img
                src={item.product.picture}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <span className="absolute -top-2 -right-2 bg-[#E0D1A5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {item.viewingPrice}
                {" "} {currency}</p>
            </div>
          </div>
        ))}

        {activePromotion && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="flex justify-between items-center">
              <div>
                <span className="font-medium">{activePromotion.code}</span>: {activePromotion.promotion.description}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePromotion}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {!activePromotion && (
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleApplyPromoCode}>
                Apply
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="space-y-2 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>  {subTotalDisplayed}
              {" "} {currency}
            </span>
          </div>

          {activePromotion && discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{discountAmountDisplayed}
                {" "} {currency}
                </span>
              
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Shipping</span>
              <Package className="w-4 h-4" />
            </div>
            {shippingCost === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              <span>{shippingCostDisplayed}
                {" "} {currency}
                </span>
            )}
          </div>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">Total</p>
              <p className="text-sm text-gray-600">Including 
                {" "} {taxDisplayed}
                  {" "} {currency} {" "}
                 in taxes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{currency}</p>
              <p className="font-medium text-lg">
                {totalDisplayed}
                  {" "} 
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
          <button
            className="w-full bg-[--complimentary-color-dark] hover:bg-[--complimentary-color-fade] disabled:bg-[--complimentary-color-fade] text-white py-3 px-4 rounded-md font-medium transition-colors"
            onClick={handleContinueToPayment}
            disabled={selectedPaymentMethod === ''}
          >
            {selectedPaymentMethod === 'cash' ? "Complete Order" : "Continue to Payment"}
            
          </button>
        </div>
    </div>
  );
};
