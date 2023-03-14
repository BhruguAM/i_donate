import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import {
  HeaderContextProvider,
  LoadingContextProvider,
  ModalContextProvider,
} from "./context";
import router from "./routes";
import "react-datepicker/dist/react-datepicker.css";
import { SplashScreen } from "./pages";

const queryClient = new QueryClient();

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    let timer1 = setTimeout(() => setShow(false), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  // const [isShowing, setShowing] = useState(false);
  const isIOS = navigator.userAgent.match(/OS/i) != null;
  if (isIOS) document.body.classList.add("ios-status-bar");
  return (
    <LoadingContextProvider>
      <ModalContextProvider>
        <HeaderContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <SplashScreen show={show} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HeaderContextProvider>
      </ModalContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
