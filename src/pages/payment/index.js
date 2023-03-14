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

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    headerCtx.setHeader("Card Details");
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

  useEffect(() => {
    if (state.gateway_clientSecret) {
      setStripePromise(loadStripe(StripeKey));
      setClientSecret(state.gateway_clientSecret);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      {/* <h1 className="text-primary font-bold mb-5">
        Add Card Detail for Payment
      </h1> */}
      <div className="flex flex-col flex-1 max-w-2xl w-full">
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};
