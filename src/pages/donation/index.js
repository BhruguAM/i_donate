import React, { useEffect, useState } from "react";
import { Button, Dropdown, InputText } from "../../component";
import IcRightArrow from "../../assets/icons/ic-right-arrow.svg";
import { useDoantionList } from "../../services/donation";
import { useNavigate } from "react-router-dom";
import { ToastMsg } from "../../utils";

export const Donation = () => {
  const navigation = useNavigate();

  const { status, data, error, isFetching } = useDoantionList();
  const [donationCategories, setDonationCategories] = useState([]);
  const [showDollar, setShowDollar] = useState(false);
  const [selectedDonationCategory, setSelectedDonationCategory] = useState({
    category_name: "select",
  });
  const [donationEvent, setDonationEvent] = useState([]);
  const [selectedDonationEvent, setSelectedDonationEvent] = useState({
    event_name: "select",
  });
  const [donationOrg, setDonationOrg] = useState([]);
  const [selectedDonationOrg, setSelectedDonationOrg] = useState({
    organization_name: "select",
  });
  const [amount, setAmount] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    if (!isFetching) {
      if (data?.status) {
        setDonationCategories(data.data.donation_categories);
        setSelectedDonationCategory(data.data.donation_categories[0]);
        setDonationEvent(data.data.donation_events);
        setSelectedDonationEvent(data.data.donation_events[0]);
        setDonationOrg(data.data.organizations);
        setSelectedDonationOrg(data.data.organizations[0]);
      } else {
        ToastMsg(data ? data.message : "something went wrong", "error");
      }
    } else {
      // ToastMsg("fetching...", "info");
    }
  }, [isFetching]);

  return (
    <div>
      <div className={`px-5 py-5 shadow-md mb-5 rounded-md bg-white`}>
        <label className={`text-title font-semibold text-base`}>
          Donation Detail
        </label>
        <div className="mt-5" />
        <Dropdown
          items={donationEvent}
          onChange={setSelectedDonationEvent}
          value={selectedDonationEvent}
          showValue={selectedDonationEvent.event_name}
          title={"Event Type"}
        />
        <div className="mt-5" />
        <Dropdown
          items={donationOrg}
          onChange={setSelectedDonationOrg}
          value={selectedDonationOrg}
          showValue={selectedDonationOrg.organization_name}
          title={"Donation To"}
        />
        <div className="mt-5" />
        <Dropdown
          items={donationCategories}
          onChange={setSelectedDonationCategory}
          value={selectedDonationCategory}
          showValue={selectedDonationCategory.category_name}
          title={"Donation For"}
        />
        {selectedDonationEvent.event_name === "Other" && (
          <input
            className="border-b border-gray-300 text-sm text-greyout mt-4 pb-2 w-full"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
        )}
        <div className="mt-5" />
        <div className="flex flex-col pb-5">
          <label className="text-sm font-medium text-primary">
            Doantion Amount
          </label>
          <div className="flex w-full">
            {(showDollar || amount !== "") && (
              <label
                className={`border-b ${
                  showDollar ? "border-primary" : "border-gray-300"
                } text-sm text-greyout mt-4 pb-2 pr-1`}
              >
                {"$"}
              </label>
            )}
            <InputText
              id={"text"}
              onFocus={() => setShowDollar(true)}
              onBlur={() => setShowDollar(false)}
              extraclassName={"mt-4 pb-2 w-full"}
              type={"number"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={
          amount === "" || selectedDonationCategory.category_name === "select"
        }
        title={"Continue"}
        icon={IcRightArrow}
        onClick={() => {
          navigation("/donation/details", {
            state: {
              donation_category_id: selectedDonationCategory.id,
              donation_event_id: selectedDonationEvent.id,
              organization_id: selectedDonationOrg.id,
              event_name: eventName,
              donation_amount: amount,
            },
          });
        }}
      />
    </div>
  );
};
