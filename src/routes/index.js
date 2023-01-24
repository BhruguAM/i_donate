import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthContainer from "../container/AuthContainer";
import MainContainer from "../container/MainContainer";
import {
  Donation,
  DonationDetails,
  ErrorElement,
  Payment,
  SignIn,
  Success,
} from "../pages";

const ProtectedRoutes = ({ children }) => {
  // return <Navigate to={"/auth/signin"} />;
  return children;
};

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <MainContainer />
          </ProtectedRoutes>
        ),
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
      {
        path: "/auth",
        element: <AuthContainer />,
        children: [
          {
            path: "/auth/signin",
            element: <SignIn />,
          },
        ],
      },
    ],
  },
]);

export default router;
