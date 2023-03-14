import React, { useEffect, useState } from "react";
import { Button, Dropdown, InputText } from "../../component";
import IcRightArrow from "../../assets/icons/ic-right-arrow.svg";
import { useDonationList } from "../../services/donation";
import { useNavigate } from "react-router-dom";
import { ToastMsg } from "../../utils";
import {
  useHeaderContext,
  useLoadingContext,
  useModalContext,
} from "../../context";

export const Donation = () => {
  const navigation = useNavigate();
  const headerCtx = useHeaderContext();
  // const { setOpen, setOkay, ModalData } = useModalContext();
  const loadingCtx = useLoadingContext();

  const { data, isFetching } = useDonationList();
  const [showDollar, setShowDollar] = useState(false);
  const [donationCategories, setDonationCategories] = useState([]);
  const [donationCategoriesErr, setDonationCategoriesErr] = useState(false);
  const [selectedDonationCategory, setSelectedDonationCategory] = useState({
    category_name: "select",
  });
  const [donationEvent, setDonationEvent] = useState([]);
  const [donationEventErr, setDonationEventErr] = useState(false);
  const [selectedDonationEvent, setSelectedDonationEvent] = useState({
    event_name: "select",
  });
  const [donationOrg, setDonationOrg] = useState([]);
  const [donationOrgErr, setDonationOrgErr] = useState(false);
  const [selectedDonationOrg, setSelectedDonationOrg] = useState({
    organization_name: "select",
  });
  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventNameErr, setEventNameErr] = useState(false);

  useEffect(() => {
    loadingCtx.setLoading(false);
    headerCtx.setHeader("Donation");
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(true);
    headerCtx.setSearchBar(false);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      if (data?.status) {
        setDonationCategories(data.data.donation_categories);
        // setSelectedDonationCategory(data.data.donation_categories[0]);
        setDonationEvent(data.data.donation_events);
        // setSelectedDonationEvent(data.data.donation_events[0]);
        setDonationOrg(data.data.organizations);
        // setSelectedDonationOrg(data.data.organizations[0]);
      } else {
        ToastMsg(data ? data.message : "something went wrong", "error");
      }
    } else {
      // ToastMsg("fetching...", "info");
    }
  }, [isFetching]);

  const onCheckFields = () => {
    let IsDisable = false;
    if (selectedDonationCategory?.category_name === "select") {
      IsDisable = true;
      setDonationCategoriesErr("Please select category");
    }
    if (selectedDonationOrg?.organization_name === "select") {
      IsDisable = true;
      setDonationOrgErr("Please select organization");
    }
    if (selectedDonationEvent?.event_name === "select") {
      IsDisable = true;
      setDonationEventErr("Please select event");
    }
    if (selectedDonationEvent?.event_name === "Other") {
      if (eventName === "") {
        IsDisable = true;
        setEventNameErr("Please enter event name");
      }
    }
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      IsDisable = true;
      setAmountErr("Please enter donation amount");
    } else if (amount > 3000 || amount <= 2) {
      IsDisable = true;
      setAmountErr("Please enter amount between $3 to $3000");
    }
    if (!IsDisable) {
      navigation("/donation/details", {
        state: {
          donation_category_id: selectedDonationCategory.id,
          donation_event_id: selectedDonationEvent.id,
          organization_id: selectedDonationOrg.id,
          event_name: eventName,
          donation_amount: amount,
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center flex-1">
      <div
        className={`px-5 py-5 shadow-xl mb-5 rounded-xl bg-primaryCard max-w-2xl w-full`}
      >
        <label className={`text-title font-bold text-base`}>
          {"Donation Detail"}
        </label>
        <div className="mt-5" />
        <Dropdown
          disabled={donationOrg.length === 0}
          isError={donationOrgErr}
          items={donationOrg}
          onChange={(e) => {
            setDonationOrgErr(false);
            setSelectedDonationOrg(e);
          }}
          value={selectedDonationOrg}
          showValue={selectedDonationOrg?.organization_name}
          title={"Donation To*"}
        />
        <div className="mt-5" />
        <Dropdown
          items={donationEvent}
          isError={donationEventErr}
          onChange={(e) => {
            setDonationEventErr(false);
            setSelectedDonationEvent(e);
          }}
          value={selectedDonationEvent}
          showValue={selectedDonationEvent?.event_name}
          title={"Event Type*"}
        />
        {selectedDonationEvent?.event_name === "Other" && (
          <InputText
            value={eventName}
            isError={eventNameErr}
            placeholder="Enter event name"
            extraClassName={"mt-2"}
            onChange={(e) => {
              const re = /^[A-Za-z\s]*$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setEventNameErr(false);
                setEventName(e.target.value);
              }
            }}
          />
        )}
        <div className="mt-5" />
        <Dropdown
          isError={donationCategoriesErr}
          items={donationCategories}
          onChange={(e) => {
            setDonationCategoriesErr(false);
            setSelectedDonationCategory(e);
          }}
          value={selectedDonationCategory}
          showValue={selectedDonationCategory?.category_name}
          title={"Donation For*"}
        />
        <div className="mt-5" />
        <div className="flex flex-col pb-5">
          <label className="text-sm font-medium text-primary">
            Donation Amount*
          </label>
          <div className="flex w-full">
            {(showDollar || amount !== "") && (
              <label
                className={`border-b ${
                  amountErr
                    ? "border-red-700"
                    : showDollar
                    ? "border-lineColor"
                    : "border-gray-300"
                } text-sm text-greyOut mt-4 pb-2 pr-1`}
              >
                {"$"}
              </label>
            )}
            <InputText
              id={"text"}
              isError={amountErr}
              autoComplete={"new-password"}
              onFocus={() => {
                setShowDollar(true);
                amount === "" &&
                  ToastMsg("enter amount between $3 to $3000", "info");
              }}
              onBlur={() => {
                setShowDollar(false);
                if (amount !== "") {
                  setAmount(Number(amount).toFixed(2));
                }
              }}
              extraClassName={"mt-4 pb-2 w-full"}
              type={"number"}
              value={amount}
              onChange={(e) => {
                if (e.target.value <= 3000) {
                  setAmountErr(false);
                  setAmount(e.target.value);
                } else {
                  setAmountErr("Please enter amount between $3 to $3000");
                }
              }}
            />
          </div>
        </div>
      </div>
      <Button
        // disabled={ButtonDisabled()}
        title={"Continue"}
        onClick={() => onCheckFields()}
        extraClass={"max-w-2xl w-full"}
      />
    </div>
  );
};
