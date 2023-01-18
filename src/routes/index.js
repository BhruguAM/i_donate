import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../container/MainContainer";
import { Donation, DonationDetails } from "../pages";
const router = createBrowserRouter([
  {
    element: <MainContainer />,
    //   loader: rootLoader,
    children: [
      {
        path: "/donation",
        element: <Donation />,
        //   loader: teamLoader,
      },
      {
        path: "/donation/details",
        element: <DonationDetails />,
        //   loader: teamLoader,
      },
    ],
  },
]);

export default router;
