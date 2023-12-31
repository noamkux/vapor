import { PaletteColorOptions, PaletteMode, createTheme } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: "#1E2329",
              main: "#313843",
              light: "#14344B",
            },
            secondary: {
              light: "#66C0F4",
              main: "#4B619B",
              dark: "#1e262f",
            },
            grey: {
              900: "#0E141B", // Main
            },
            text: {
              primary: "#F3F3F3",
              secondary: "#76808C",
            },
            error: { main: "#CD5444" },
            warning: { main: "#C1B15F" },
            info: { main :"#67C1F5" },
            sucsses: { main: "#A1CD44" },
          }
        : {
            primary: {
              main: "#3F4365",
              dark: "#2D3250",
              light: "#676F9D",
            },
            secondary: {
              main: "#F8B179",
              light: "#F9C093",
              dark: "#AD7B54",
            },
            background: {
              default: "#DDE4E6",
              // alt: "#DDE4E6",
            },
          }),
    },
    typography: {
      fontFamily: ["MotivaSansBlack", "sans-serif"].join(","),
      h1: {
        fontSize: "26px",
        fontWeight: 700,
      },
      h2: {
        fontSize: "22px",
        fontWeight: 700,
      },
      h3: {
        fontSize: "18px",
        fontWeight: 700,
      },
      h4: {
        fontSize: "16px",
        fontWeight: 400,
      },
      subtitle1: {
        fontSize: "14px",
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: "12px",
        fontWeight: 400,
      },
      body1: {
        fontSize: "14px",
        fontWeight: 400,
      },
      body2: {
        fonsSize: "12px",
        fontWeight: 400,
      },
    },
  });

  return theme;
};
