import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from "./contexts/app.context.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AppProvider>
    </QueryClientProvider>
  </BrowserRouter>
  //</React.StrictMode>
);
