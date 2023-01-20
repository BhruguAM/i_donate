import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component";

export const ErrorElement = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-full bg-background">
      <Header />
      <div className="flex p-4 pt-5 items-center justify-center min-h-full">
        <label
          onClick={() => navigate("/donation")}
          className="text-center font-bold text-xl cursor-pointer text-blue-700"
        >
          Go To Donation Page
        </label>
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 animate-ping ml-2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};
