import { createSystem, defaultConfig } from "@chakra-ui/react";

const themeSystem = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      bg: "{colors.bg.subtle}",
    },
  },
  theme: {
    semanticTokens: {
      borders: {
        subtle: {
          value: "1px solid {colors.border}",
        },
      },
    },
  },
});

export default themeSystem;
