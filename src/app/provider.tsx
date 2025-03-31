import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Theme, LocaleProvider } from "@chakra-ui/react";
import themeSystem from "./theme.ts";
import Page from "../features/overlay/components/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={themeSystem}>
      <Theme colorPalette="blue" bg="bg.subtle">
        <LocaleProvider locale={Intl.DateTimeFormat().resolvedOptions().locale}>
          <Page />
        </LocaleProvider>
      </Theme>
    </ChakraProvider>
  </StrictMode>,
);
