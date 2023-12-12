import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { theme } from "./global/styles/theme.ts";
import { queryClient } from "./global/reactQeury.ts";
import GlobalStyle from "./global/styles/GlobalStyle.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toaster />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
