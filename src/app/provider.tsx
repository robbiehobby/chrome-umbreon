import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Theme, LocaleProvider } from "@chakra-ui/react";
import themeSystem from "./theme.ts";
import Settings from "../features/overlay/components/settings.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={themeSystem}>
      <Theme colorPalette="blue" bg="bg.subtle">
        <LocaleProvider locale={Intl.DateTimeFormat().resolvedOptions().locale}>
          <Settings />
        </LocaleProvider>
      </Theme>
    </ChakraProvider>
  </StrictMode>,
);
