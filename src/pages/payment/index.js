import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

export const Payment = () => {
  const { state } = useLocation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51LfGhWSFqtS6SXI7HNa4xM2OYfMJwW42hKDix7uLcctS5ewdngMTDnbVYdEiWkLXNmPlS1egNjFUR5QFykbl8FR300DGtLCrZf"
      )
    );
    setClientSecret(state.gateway_clientSecret);
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
