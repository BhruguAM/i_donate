import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../container/MainContainer";
import { Donation } from "../pages";
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
    ],
  },
]);

export default router;
