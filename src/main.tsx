import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/global.css";
import { App } from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Toaster } from "sonner";

if (import.meta.env.PROD) disableReactDevTools();

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <App />
            <Toaster
                richColors
                closeButton
                toastOptions={{ duration: 1000 * 10 }}
            />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
