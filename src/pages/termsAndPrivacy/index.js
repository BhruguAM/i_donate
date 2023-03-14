import React, { useEffect } from "react";

import { useHeaderContext, useLoadingContext } from "../../context";
import { getWithExpiry, setWithExpiry, ToastMsg } from "../../utils";
import { useLoaderData, useNavigate } from "react-router-dom";

export const Info = ({ title }) => {
  const navigate = useNavigate();
  const member = getWithExpiry("member");
  const headerCtx = useHeaderContext();
  const { setLoading, Loading } = useLoadingContext();
  const { data } = useLoaderData();

  useEffect(() => {
    console.log("DATAAA", data);
    headerCtx.setHeader(title);
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center max-w-2xl w-full self-center">
      <div
        className={`px-5 py-8 shadow-xl mb-5 rounded-xl bg-primaryCard w-full max-w-2xl`}
      >
        {data}
      </div>
    </div>
  );
};
