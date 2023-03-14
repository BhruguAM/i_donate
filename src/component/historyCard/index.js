import React from "react";

export function HistoryCard({ extraClass = "", item, onClick, isLoading }) {
  return (
    <div
      className={`flex flex-col bg-primaryCard relative py-4 ${
        isLoading & "pointer-events-none"
      } ${extraClass}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-1 items-center justify-center bg-opacity-50 bg-primaryCard animate-pulse">
          ... Loading
        </div>
      )}
      <div className="flex items-end justify-between">
        <div className="flex items-end">
          <label className="text-title text-base font-semibold">
            {"$ " + item?.payment?.amount + ".00"}
          </label>
          <label className="text-title text-[8px] font-medium ml-1 pb-1">
            ({item?.organization?.organization_name})
          </label>
        </div>
        <label className="text-primary text-xs font-semibold pb-1">
          {"#" + item?.payment?.gateway_paymentIntentKey.substring(19)}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-primary text-xs font-medium">
          {item.donation_category.category_name +
            " | " +
            item.donation_event.event_name}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-primary text-xs font-medium mr-1">
          {"Date:"}
        </label>
        <label className="text-primary text-xs font-medium">
          {new Date(item.created_at).toDateString()}
        </label>
      </div>
    </div>
  );
}
