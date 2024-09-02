import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultOptions } from "./configs/reactQuery.js";


const queryClient = new QueryClient({defaultOptions});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  // </React.StrictMode>
);
