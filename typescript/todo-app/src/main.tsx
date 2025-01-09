import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyContextProvider } from "./components/MyContext.tsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
