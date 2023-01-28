import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, HistoryCard } from "../../component";
import { BaseUrl } from "../../config/config";
import {
  useHeaderContext,
  useLoadingContext,
  useModalContext,
} from "../../context";
import { useDoantionHistory } from "../../services/donation";
import { PaymentDetails } from "../../services/payment";
import { ToastMsg } from "../../utils";

export const History = () => {
  const navigate = useNavigate();
  const loadingCtx = useLoadingContext();
  const { data, isFetching, isLoading } = useDoantionHistory();
  const { setOpen, setOkay, ModalData } = useModalContext();
  const [historyData, setHistoryData] = useState([]);
  const [extra, setExtra] = useState(0);
  const headerCtx = useHeaderContext();

  useEffect(() => {
    headerCtx.setHeader("Donations");
    headerCtx.setIsBack(false);
    console.log("Loading", data, isLoading, isFetching);
    if (!isFetching) {
      if (data.status) {
        setHistoryData(data.data);
        setExtra(extra + 1);
      } else {
        navigate("/auth/signin");
      }
    }
  }, [isFetching]);

  const ModalOutput = ({ item, link }) => {
    return (
      <div className="p-5 bg-white">
        <div
          className={`px-5 pb-5 shadow-md mb-5 rounded-md bg-white flex flex-col items-center`}
        >
          <label className="text-center text-base text-greyout">
            {item.donations[0].donar_full_name}
          </label>
          <label className="text-center text-base text-greyout">
            {item.donation_event.event_name +
              " | " +
              item.donation_category.category_name}
          </label>
          <label className="text-center text-base text-greyout">
            {item.organization.organization_name}
          </label>
          <div
            className={`w-full ${item.donation_date === "" && "animate-pulse"}`}
          >
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Invoice Number"}
              </label>
              <label className="text-center text-sm text-greyout">
                {`#${item.gateway_paymentIntentKey.substring(19)}`}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Total Amount"}
              </label>
              <label className="text-center text-sm text-greyout">
                {`$ ${Number(item.donations[0].donation_amount).toFixed(2)}`}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Payment Type"}
              </label>
              <label className="text-center text-sm text-greyout">{`Card`}</label>
            </div>
            <div className="flex py-3 w-full justify-between">
              <label className="text-center text-sm text-greyout">
                {"Transanction Date"}
              </label>
              <label className="text-center text-sm text-greyout">
                {new Date(item.donations[0].donation_date).toDateString()}
              </label>
            </div>
          </div>
        </div>
        <Button
          disabled={!item}
          title={"Download Receipt"}
          onClick={() => window.open(BaseUrl + "/" + link)}
        />
        <Button
          secondary
          title={"Done"}
          onClick={() => {
            setOkay(true);
            setOpen(false);
          }}
          extraClass={"mt-4"}
        />
      </div>
    );
  };

  if (isLoading) {
    loadingCtx.setLoading(isLoading);
    return <div />;
  } else {
    loadingCtx.setLoading(false);
  }

  const onClickHistoryCard = async (e, i, k) => {
    e.stopPropagation();
    const body = { payment_intent_key: i.payment.gateway_paymentIntentKey };
    const res = await PaymentDetails(body);
    if (res.status) {
      console.log("RES", res.data);
      ModalData(
        <ModalOutput
          item={{ ...res.data.payment_details, ...i }}
          link={res.data.link}
        />
      );
      setOkay(false);
      setOpen(true);
    } else {
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div>
      {historyData?.length > 0 ? (
        <div className={`px-5 pt-4 pb-1 shadow-md mb-5 rounded-md bg-white`}>
          {React.Children.toArray(
            historyData.map((i, k) => (
              <HistoryCard
                item={i}
                extraClass="mb-4"
                onClick={(e) => onClickHistoryCard(e, i, k)}
              />
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
