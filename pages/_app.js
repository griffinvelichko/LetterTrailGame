import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// // 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  shadows: {
    outline: "none",
  },
  colors: {
    background: "#FEFBF5",
    beige: "#fff",
    lightBeige: "#fdead2",
    orange: "#DB6441",
    lightOrange: "#F19B50",
    lightBlue: "#7EACA6",
    blue: "#245275",
  },
  components: {
    List: {},
    Button: {
      baseStyle: { borderWidth: "5px", borderColor: "transparent" },
      variants: {
        // Make a variant, we'll call it `base` here and leave it empty
        base: {
          _hover: {
            background: `linear-gradient(#fff, #fff) padding-box, 
              linear-gradient(315deg, #245275, #7EACA6, #fff, #F19B50,  #DB6441) border-box`,
          },
          _focus: {
            borderColor: "transparent",
          },
        },
        back: {
          _hover: {
            borderColor: "orange",
          },
        },
        submit: {
          _hover: {
            borderColor: "blue",
          },
        },
      },
      defaultProps: {
        // Then here we set the base variant as the default
        variant: "base",
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
