import React, { useEffect, useState } from "react";
import { Button, Dropdown, InputText } from "../../component";
import IcRightArrow from "../../assets/icons/ic-right-arrow.svg";
import { useDoantionList } from "../../services/donation";
import { useNavigate } from "react-router-dom";
import { ToastMsg } from "../../utils";

const dataa = {
  status: true,
  statusCode: 200,
  message: "Donation details",
  data: {
    donation_categories: [
      {
        id: 1,
        category_name: "Aarati",
        description: "this is for aarati donation",
        status: true,
        created_at: "2023-01-15T16:30:19.948Z",
        updated_at: "2023-01-15T16:30:19.948Z",
      },
      {
        id: 2,
        category_name: "Parayan",
        description: null,
        status: true,
        created_at: "2023-01-16T15:55:44.104Z",
        updated_at: "2023-01-16T15:55:44.104Z",
      },
    ],
    donation_events: [
      {
        id: 2,
        event_name: "Diwali",
        description: null,
        status: true,
        created_at: "2023-01-18T15:49:46.464Z",
        updated_at: "2023-01-18T15:49:46.464Z",
      },
      {
        id: 1,
        event_name: "Other",
        description: null,
        status: true,
        created_at: "2023-01-18T15:49:46.464Z",
        updated_at: "2023-01-18T15:49:46.464Z",
      },
    ],
    organizations: [
      {
        id: 1,
        full_name:
          "Shree Swaminarayan Siddhant Sajivan Mandal Midwest - Chicago",
        organization_name: "ssssm",
        address_line: "1020 Bapa Road (Off Irving Park)",
        city: "Streamwood",
        country_code: "+1",
        phone: "7733531633",
        email: null,
        state: "Illinois",
        zip: "60107",
        status: true,
        created_at: "2023-01-16T17:11:21.494Z",
        updated_at: "2023-01-16T17:11:21.494Z",
      },
    ],
  },
};

export const Donation = () => {
  const navigation = useNavigate();
  //for Demo
  // const data = dataa;
  // const isFetching = false;
  //for Demo

  const { status, data, error, isFetching } = useDoantionList();
  const [donationCategories, setDonationCategories] = useState([]);
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
      if (dataa?.status) {
        console.log("donation data", data);
        console.log(
          "data.donation_categories[0]",
          data.data.donation_categories[0]
        );
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
        <div className="mt-5" />
        <Dropdown
          items={donationEvent}
          onChange={setSelectedDonationEvent}
          value={selectedDonationEvent}
          showValue={selectedDonationEvent.event_name}
          title={"Event Type"}
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
            <label className="border-b border-gray-300 text-sm text-greyout mt-4 pb-2">
              $
            </label>
            <InputText
              extraclassName={"mt-4 pb-2 w-full"}
              type={"number"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={amount === ""}
        title={"Continue"}
        icon={IcRightArrow}
        onClick={() => navigation("/donation/details")}
      />
    </div>
  );
};
