import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import AnimatedData from "../../assets/lottie/payment_tick.json";
import { Button } from "../../component";
import { PaymentDetails } from "../../services/payment";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BaseUrl } from "../../config/config";
import { ToastMsg } from "../../utils";

export const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [recieptNumber, setRecieptNumber] = useState("");
  const [totalAmout, setTotalAmout] = useState("");
  const [paymentType, setPaymentType] = useState("Card");
  const [transactionDate, setTransactionDate] = useState("");
  const [PDFUrl, setPDFUrl] = useState("");

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.querySelector("#LoadingAnimation"), // the dom element
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: AnimatedData,
    });

    return () => instance.destroy();
  }, []);

  const GetPaymentDetails = async () => {
    const paymentIntent = searchParams.get("payment_intent");
    const Redirection = searchParams.get("redirect_status");
    if (Redirection === "succeeded") {
      const body = { payment_intent_key: paymentIntent };
      const res = await PaymentDetails(body);
      if (res.status) {
        setPDFUrl(BaseUrl + "/" + res.data.link);
        let paymentDetails = res.data.payment_details;
        setTotalAmout(paymentDetails.amount);
        setRecieptNumber(
          paymentDetails.gateway_paymentIntentKey.substring(
            paymentDetails.gateway_paymentIntentKey.length - 8
          )
        );
        const date = new Date(paymentDetails.payment_date);
        setTransactionDate(date.toLocaleString());
      } else {
        ToastMsg(res.message, "error");
      }
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  useEffect(() => {
    GetPaymentDetails();
  }, []);

  const onDonwnloadPDF = () => {
    window.open(PDFUrl);
  };

  return (
    <div>
      <div
        className={`px-5 pb-5 shadow-md mb-5 rounded-md bg-white flex flex-col items-center`}
      >
        <div className="h-48 w-48 animate-wiggle">
          <div id="LoadingAnimation" />
        </div>
        <label className="text-center text-2xl text-primary">
          Payment Successful!
        </label>
        <label className="text-center text-xs text-greyout mb-14">
          Details of transaction are included below
        </label>
        {transactionDate === "" ? (
          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
            loading...
          </div>
        ) : (
          <div
            className={`w-full ${transactionDate === "" && "animate-pulse"}`}
          >
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Receipt Number"}
              </label>
              <label className="text-center text-sm text-greyout">
                {recieptNumber}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Total Amount"}
              </label>
              <label className="text-center text-sm text-greyout">
                {`$ ${Number(totalAmout).toFixed(2)}`}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Payment Type"}
              </label>
              <label className="text-center text-sm text-greyout">
                {paymentType}
              </label>
            </div>
            <div className="flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Transanction Date"}
              </label>
              <label className="text-center text-sm text-greyout">
                {transactionDate}
              </label>
            </div>
          </div>
        )}
      </div>
      <Button
        disabled={transactionDate === ""}
        title={"Download Receipt"}
        onClick={() => onDonwnloadPDF()}
      />
      <Button
        disabled={transactionDate === ""}
        secondary
        title={"Done"}
        onClick={() => {
          navigate("/", { replace: true });
        }}
        extraClass={"mt-4"}
      />
    </div>
  );
};
