import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import AnimatedData from "../../assets/lottie/payment_tick.json";
import { Button } from "../../component";
import { PaymentDetails } from "../../services/payment";
import { useSearchParams } from "react-router-dom";
import { BaseUrl } from "../../config/config";

export const Success = () => {
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
        setRecieptNumber(paymentDetails.receipt_no);
        const date = new Date(paymentDetails.payment_date);
        setTransactionDate(date.toLocaleString());
      }
    }
  };

  useEffect(() => {
    GetPaymentDetails();
  }, []);

  const onDonwnloadPDF = () => {
    window.open(PDFUrl);
  };

  return (
    <div>
      <div
        className={`px-5 py-5 shadow-md mb-5 rounded-md bg-white flex flex-col items-center`}
      >
        <div className="h-52 w-52 animate-wiggle">
          <div id="LoadingAnimation" />
        </div>
        <label className="text-center text-2xl text-primary">
          Payment Successful!
        </label>
        <label className="text-center text-xs text-greyout mb-14">
          Details of transaction are included below
        </label>
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
            {totalAmout}
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
      <Button title={"Download Receipt"} onClick={() => onDonwnloadPDF()} />
      <Button
        secondary
        title={"Done"}
        onClick={() => {
          window.close();
        }}
        extraClass={"mt-4"}
      />
    </div>
  );
};
