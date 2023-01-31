import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import {
  HeaderContextProvider,
  LoadingContextProvider,
  ModalContextProvider,
} from "./context";
import router from "./routes";
const queryClient = new QueryClient();

function App() {
  const isIOS = navigator.userAgent.match(/OS/i) != null;
  if (isIOS) document.body.classList.add("ios-status-bar");
  return (
    <LoadingContextProvider>
      <ModalContextProvider>
        <HeaderContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HeaderContextProvider>
      </ModalContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
