import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Theme, LocaleProvider } from "@chakra-ui/react";
import App from "./app/page.tsx";
import system from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <Theme colorPalette="blue" bg="bg.subtle">
        <LocaleProvider locale={Intl.DateTimeFormat().resolvedOptions().locale}>
          <App />
        </LocaleProvider>
      </Theme>
    </ChakraProvider>
  </StrictMode>,
);
