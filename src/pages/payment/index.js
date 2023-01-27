import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { StripeKey } from "../../config/config";
import { useHeaderContext } from "../../context";

export const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const headerCtx = useHeaderContext();
  headerCtx.setHeader("Card Details");
  headerCtx.setIsBack(true);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (state.gateway_clientSecret) {
      setStripePromise(loadStripe(StripeKey));
      setClientSecret(state.gateway_clientSecret);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <h1 className="text-primary font-bold mb-5">
        Add Card Detail for Payment
      </h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
