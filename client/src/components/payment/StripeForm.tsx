import { useState, useEffect } from "react";
import {
  Appearance,
  loadStripe,
  PaymentIntent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "@/hooks/use-toast";
import { createPaymentIntent } from "@/api-calls/payment-api-calls";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51QQY2DK2Z63nKLIBPwUrMkrN3WFje7T4H0JN50vTcIVALoQlbg6DDE2NOUzWIi6dJwGw2DfY7XgxIk2YjbXYFWmO00SRKzb3Ck";

const appearance: Appearance = {
  theme: "stripe",
};
// Enable the skeleton loader UI for optimal loading.
const loader = "auto";

const paymentElementOptions: StripePaymentElementOptions = {
  layout: "tabs",
};

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

type PaymentProps = {
  stripePaymentTrigger: boolean;
  setStripePaymentTrigger: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  onPaymentCompletion: () => Promise<void>;
};

export default function StripeForm(props: PaymentProps) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const create = async () => {
      // TODO - Disable complete order button untill payment intent is loaded successfully
      const paymentIntent = (await createPaymentIntent([
        { id: "1", amount: 100 },
      ])) as PaymentIntent;
      if (paymentIntent.client_secret) {
        setClientSecret(paymentIntent.client_secret);
      }
    };

    create();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance, locale: "en", loader }}
        >
          <PaymentForm {...props} />
        </Elements>
      )}
    </div>
  );
}

function PaymentForm({
  stripePaymentTrigger,
  setIsLoading,
  setStripePaymentTrigger,
  onPaymentCompletion,
}: PaymentProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if (error.type !== "validation_error") {
        toast({
          title: "Payment failed",
          description: error.message,
          variant: "destructive",
          duration: 5000,
        });
      }

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    await onPaymentCompletion();
  };

  useEffect(() => {
    if (stripePaymentTrigger) {
      handlePayment();
    }
    return () => {
      setStripePaymentTrigger(false);
    };
  }, [stripePaymentTrigger]);

  return <PaymentElement options={paymentElementOptions} />;
}
