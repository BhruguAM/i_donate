import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../container/MainContainer";
import {
  Donation,
  DonationDetails,
  ErrorElement,
  Payment,
  Success,
} from "../pages";

const router = createBrowserRouter([
  {
    element: <MainContainer />,
    errorElement: <ErrorElement />,

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
      {
        path: "/payment",
        element: <Payment />,
        //   loader: teamLoader,
      },
      {
        path: "/success",
        element: <Success />,
        //   loader: teamLoader,
      },
    ],
  },
]);

export default router;
