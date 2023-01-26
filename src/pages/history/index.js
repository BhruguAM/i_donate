import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HistoryCard } from "../../component";
import { useHeaderContext } from "../../context";

export const History = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([...Array(2)]);
  const headerCtx = useHeaderContext();
  headerCtx.setHeader("History");
  headerCtx.setIsBack(false);
  return (
    <div>
      {historyData?.length > 0 ? (
        <div className={`px-5 py-5 shadow-md mb-5 rounded-md bg-white`}>
          {React.Children.toArray(historyData.map(() => <HistoryCard />))}
        </div>
      ) : (
        <div className="text-black text-base font-semibold text-center">
          No History Found
        </div>
      )}
      <div
        onClick={() => navigate("/donation")}
        className="flex mt-2 mb-2 text-primary items-center justify-center"
      >
        <label className=" text-lg font-semibold text-center">
          Go to Donation Page
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
