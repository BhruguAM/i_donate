import React from "react";

export function HistoryCard() {
  return (
    <div className="flex flex-col bg-gray-100 p-3 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="text-black text-base font-semibold">
            {"$2000"}
          </label>
          <label className="text-greyout text-[8px] font-medium">
            {"(SSSSM Midwest Chicago)"}
          </label>
        </div>
        <label className="text-primary text-xs font-semibold">
          {"#235GH4D"}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium">
          {"Charity | Shakostav"}
        </label>
      </div>
      <div className="flex items-center">
        <label className="text-greyout text-xs font-medium mr-1">
          {"Date:"}
        </label>
        <label className="text-greyout text-xs font-medium">
          {"08/30/2022"}
        </label>
      </div>
    </div>
  );
}
