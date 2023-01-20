import React, { useEffect } from "react";
import lottie from "lottie-web";
import AnimatedData from "../../assets/lottie/payment_tick.json";
import { Button } from "../../component";

export const Success = () => {
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
            {"#254DB21A"}
          </label>
        </div>
        <div className="border-b border-gray-200 flex py-3 w-full justify-between">
          <label className="text-center text-sm text-greyout">
            {"Totoal Amount"}
          </label>
          <label className="text-center text-sm text-greyout">{"$2000"}</label>
        </div>
        <div className="border-b border-gray-200 flex py-3 w-full justify-between">
          <label className="text-center text-sm text-greyout">
            {"Payment Type"}
          </label>
          <label className="text-center text-sm text-greyout">{"Card"}</label>
        </div>
        <div className="flex py-3 w-full justify-between">
          <label className="text-center text-sm text-greyout">
            {"Transanction Date"}
          </label>
          <label className="text-center text-sm text-greyout">
            {"01/05/2023, 8:00 AM"}
          </label>
        </div>
      </div>
      <Button
        title={"Download Receipt"}
        onClick={() => {
          console.log("click");
        }}
      />
      <Button
        secondary
        title={"Done"}
        onClick={() => {
          console.log("click");
        }}
        extraClass={"mt-4"}
      />
    </div>
  );
};
