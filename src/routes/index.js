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
  ForgotPassword,
  History,
  Info,
  Payment,
  PersonalInfo,
  ProfileScreen,
  SignIn,
  SignUp,
  Success,
  UserAddressInfo,
} from "../pages";
import { ChangePassword } from "../pages/changePassword";
import { getWithExpiry } from "../utils";
import { privacy, terms } from "./constant";

const ProtectedRoutes = ({ children }) => {
  if (getWithExpiry("token")) {
    return children;
  } else {
    return <Navigate to={"/auth/signin"} />;
  }
};
const AuthProtected = ({ children }) => {
  // if (getWithExpiry("token")) {
  // return <Navigate to={"/"} />;
  // } else {
  // return children;
  // }
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
          },
          {
            path: "/donation",
            element: <Donation />,
          },
          {
            path: "/donation/details",
            element: <DonationDetails />,
          },
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/success",
            element: <Success />,
          },
          {
            path: "/terms",
            element: <Info title={"Terms And Condition"} />,
            loader: async () => ({
              data: terms,
            }),
          },
          {
            path: "/privacy",
            element: <Info title={"Privacy"} />,
            loader: async () => ({
              data: privacy,
            }),
          },
          {
            path: "/changePassword",
            element: (
              <ProtectedRoutes>
                <ChangePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "/profile",
            element: (
              <ProtectedRoutes>
                <ProfileScreen />
              </ProtectedRoutes>
            ),
          },
          {
            path: "/personalInfo",
            element: (
              <ProtectedRoutes>
                <PersonalInfo />
              </ProtectedRoutes>
            ),
          },
          {
            path: "/addressInfo",
            element: (
              <ProtectedRoutes>
                <UserAddressInfo />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "/auth",
        element: (
          // <AuthProtected>
          <AuthContainer />
          // </AuthProtected>
        ),
        children: [
          {
            path: "/auth/signin",
            element: <SignIn />,
          },
          {
            path: "/auth/forgotPassword",
            element: <ForgotPassword />,
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
