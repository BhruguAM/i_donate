import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HistoryCard } from "../../component";
import { useHeaderContext, useLoadingContext } from "../../context";
import { useDoantionHistory } from "../../services/donation";

export const History = () => {
  const navigate = useNavigate();
  const loadingCtx = useLoadingContext();
  const { data, isFetching, isLoading } = useDoantionHistory();
  const [historyData, setHistoryData] = useState([]);
  const [extra, setExtra] = useState(0);
  const headerCtx = useHeaderContext();
  headerCtx.setHeader("Donations");
  headerCtx.setIsBack(false);

  useEffect(() => {
    console.log("Loading", data, isLoading, isFetching);
    if (!isFetching) {
      if (data.status) {
        setHistoryData(data.data);
        setExtra(extra + 1);
      } else {
        navigate("/auth/signin");
      }
    }
  }, [data, isFetching]);

  if (isLoading) {
    loadingCtx.setLoading(isLoading);
    return <div />;
  } else {
    loadingCtx.setLoading(false);
  }

  return (
    <div>
      {historyData?.length > 0 ? (
        <div className={`px-5 pt-4 pb-1 shadow-md mb-5 rounded-md bg-white`}>
          {React.Children.toArray(
            historyData.map((i, k) => (
              <HistoryCard item={i} extraClass="mb-4" />
            ))
          )}
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
