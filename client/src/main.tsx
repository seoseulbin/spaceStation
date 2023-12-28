import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { theme } from "./global/styles/theme.ts";
import { queryClient } from "./global/reactQeury.ts";
import GlobalStyle from "./global/styles/GlobalStyle.ts";
import { ModalProvider } from "styled-react-modal";
import { RecoilRoot } from "recoil";
import EntireLoading from "./components/common/Loading/EntireLoading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toaster />
        <RecoilRoot>
          <ModalProvider>
            <EntireLoading />
            <App />
          </ModalProvider>
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
