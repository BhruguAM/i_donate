import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthContainer from "../container/AuthContainer";
import MainContainer from "../container/MainContainer";
import {
  AddressInfo,
  CreatePassword,
  Donation,
  DonationDetails,
  ErrorElement,
  History,
  Payment,
  SignIn,
  SignUp,
  Success,
} from "../pages";
import { getWithExpiry } from "../utils";

const ProtectedRoutes = ({ children }) => {
  if (getWithExpiry("token")) {
    return children;
  } else {
    return <Navigate to={"/auth/signin"} />;
  }
};

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        element: <MainContainer />,
        children: [
          {
            path: "/",
            element: (
              <ProtectedRoutes>
                <History />
              </ProtectedRoutes>
            ),
            //   loader: teamLoader,
          },
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
          {
            path: "/auth/signup",
            element: <SignUp />,
          },
          {
            path: "/auth/addressInfo",
            element: <AddressInfo />,
          },
          {
            path: "/auth/createPassword",
            element: <CreatePassword />,
          },
        ],
      },
    ],
  },
]);

export default router;
