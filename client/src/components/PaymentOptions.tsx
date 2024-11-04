import masterCard from "@/assets/mastercard.svg";
import visa from "@/assets/visa.svg";
import paypal from "@/assets/paypal.svg";
import amex from "@/assets/amex.svg";

function PaymentOptions() {
  return (
    <div className="flex gap-2">
      <img src={masterCard} alt="MasterCard" width={40} height={40} />
      <img src={visa} alt="Visa" width={40} height={40} />
      <img src={paypal} alt="PayPal" width={40} height={40} />
      <img src={amex} alt="Amex" width={40} height={40} />
    </div>
  );
}

export default PaymentOptions;
