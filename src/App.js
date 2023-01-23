import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import { LoadingContextProvider } from "./context";
import router from "./routes";
const queryClient = new QueryClient();

function App() {
  return (
    <LoadingContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </LoadingContextProvider>
  );
}

export default App;
