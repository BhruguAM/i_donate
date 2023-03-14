import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, HistoryCard } from "../../component";
import { BaseUrl } from "../../config/config";
import {
  useHeaderContext,
  useLoadingContext,
  useModalContext,
} from "../../context";
import { useDonationHistory } from "../../services/donation";
import IcSearch from "../../assets/icons/ic-search.svg";
import { PaymentDetails } from "../../services/payment";
import { ToastMsg } from "../../utils";

export const History = () => {
  const navigate = useNavigate();
  const loadingCtx = useLoadingContext();
  const { data, isFetching, isLoading } = useDonationHistory();
  const { setOpen, setOkay, ModalData } = useModalContext();
  const [historyData, setHistoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [extra, setExtra] = useState(0);
  const [itemIndex, setItemIndex] = useState(-1);
  const headerCtx = useHeaderContext();

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    headerCtx.setSearchBar(
      <div className="h-full w-[90vw] max-w-2xl bg-white z-50 border border-lineColor overflow-hidden rounded-md px-4 flex items-center">
        <img src={IcSearch} className="h-6 w-6 object-contain" alt="search" />
        <input
          value={searchText}
          onChange={onChangeText}
          className={`h-full w-full text-sm text-title pl-2`}
          placeholder={
            "Search Receipt Number, Amount, Date, Event, Donation For"
          }
        />
      </div>
    );
  }, [searchText]);

  useEffect(() => {
    headerCtx.setHeader("History");
    headerCtx.setIsBack(false);
    headerCtx.setMainHeader(true);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      if (data.status) {
        setHistoryData(data.data);
        setExtra(extra + 1);
      } else {
        if (data.statusCode === 401) {
          headerCtx.setSearchBar(false);
          navigate("/auth/signin");
        }
      }
    }
  }, [isFetching, isLoading]);

  const ModalOutput = ({ item, link }) => {
    return (
      <div className="p-5 bg-primaryBg">
        <div
          className={`px-5 pb-5 shadow-md mb-5 pt-2 rounded-md bg-primaryCard flex flex-col items-center`}
        >
          <label className="text-center text-base text-title">
            {`${item.donar_full_name}${
              item.donar_gam_village ? " (" + item.donar_gam_village + ")" : ""
            }`}
          </label>
          <label className="text-center text-base text-greyOut">
            {item.donation_event.event_name +
              " | " +
              item.donation_category.category_name}
          </label>
          <label className="text-center text-base text-greyOut">
            {item.organization.organization_name}
          </label>
          <div
            className={`w-full ${item.donation_date === "" && "animate-pulse"}`}
          >
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-title">
                {"Invoice Number"}
              </label>
              <label className="text-center text-sm text-primary">
                {`#${item.payment.gateway_paymentIntentKey.substring(19)}`}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-title">
                {"Total Amount"}
              </label>
              <label className="text-center text-sm text-primary">
                {`$ ${Number(item.donation_amount).toFixed(2)}`}
              </label>
            </div>
            <div className="border-b border-gray-200 flex py-3 w-full justify-between">
              <label className="text-center text-sm text-title">
                {"Payment Type"}
              </label>
              <label className="text-center text-sm text-primary">{`Card`}</label>
            </div>
            <div className="flex py-3 w-full justify-between">
              <label className="text-center text-sm text-title">
                {"Transaction Date"}
              </label>
              <label className="text-center text-sm text-primary">
                {new Date(item.donation_date).toDateString()}
              </label>
            </div>
          </div>
        </div>
        <Button
          disabled={!item}
          title={"Download Receipt"}
          onClick={() => {
            window.open(BaseUrl + "/" + link);
            setOkay(true);
            setOpen(false);
          }}
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
    loadingCtx.setLoading(true);
    return <div />;
  } else {
    loadingCtx.setLoading(false);
  }

  const onClickHistoryCard = async (e, i, k) => {
    setItemIndex(k);
    e.stopPropagation();
    const body = { payment_intent_key: i.payment.gateway_paymentIntentKey };
    const res = await PaymentDetails(body);
    if (res.status) {
      ModalData(
        <ModalOutput
          item={{ ...res.data.payment_details, ...i }}
          link={res.data.link}
        />
      );
      setOkay(false);
      setOpen(true);
      setItemIndex(-1);
    } else {
      ToastMsg(res.message, "error");
      setItemIndex(-1);
    }
  };

  return (
    <div className="pb-5 flex flex-col items-center">
      {historyData?.length > 0 ? (
        <div className={`shadow-md mb-5 px-5 bg-primaryCard max-w-2xl w-full`}>
          {React.Children.toArray(
            historyData.map((i, k, arr) => {
              if (
                !i.payment.amount
                  .toString()
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                if (
                  !i.payment.gateway_paymentIntentKey
                    .substring(19)
                    .includes(searchText.toLowerCase())
                ) {
                  if (
                    !i?.organization?.organization_name
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return null;
                  }
                }
              }
              // if (
              //   !i?.payment?.gateway_paymentIntentKey
              //     .substring(19)
              //     .includes(searchText.toLowerCase())
              // ) {
              //   return null;
              // }
              // if (
              //   !i?.organization?.organization_name
              //     .toString()
              //     .toLowerCase()
              //     .includes(searchText.toLowerCase())
              // ) {
              //   return null;
              // }
              return (
                <HistoryCard
                  isLoading={itemIndex === k}
                  item={i}
                  extraClass={`${
                    arr.length !== k + 1 && "border-b border-b-primary"
                  }`}
                  onClick={(e) => onClickHistoryCard(e, i, k)}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="text-black text-base font-semibold text-center max-w-2xl w-full">
          No History Found
        </div>
      )}
    </div>
  );
};
