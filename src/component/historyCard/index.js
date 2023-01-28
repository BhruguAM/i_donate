import React from "react";

export function HistoryCard({ extraClass = "", item, onClick }) {
  return (
    <div
      className={`flex flex-col bg-gray-100 p-3 rounded-md ${extraClass}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="text-black text-base font-semibold">
            {"$ " + item?.payment?.amount + ".00"}
          </label>
          <label className="text-greyout text-[8px] font-medium ml-1">
            ({item?.organization?.organization_name})
          </label>
        </div>
        <label className="text-primary text-xs font-semibold">
          {item?.payment?.gateway_paymentIntentKey.substring(19)}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium">
          {item.donation_category.category_name +
            " | " +
            item.donation_event.event_name}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium mr-1">
          {"Date:"}
        </label>
        <label className="text-greyout text-xs font-medium">
          {new Date(item.created_at).toDateString()}
        </label>
      </div>
    </div>
  );
}
