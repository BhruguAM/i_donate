import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { StripeKey } from "../../config/config";

export const Payment = () => {
  const { state } = useLocation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(StripeKey));
    setClientSecret(state.gateway_clientSecret);
  }, []);

  return (
    <>
      <h1 className="text-primary font-bold mb-5">
        Add Card Detail for Payment
      </h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
