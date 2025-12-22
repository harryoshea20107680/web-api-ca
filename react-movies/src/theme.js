import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#7C3AED" },
      secondary: { main: "#F59E0B" },
      ...(mode === "light"
        ? {
            background: { default: "#F8FAFC", paper: "#FFFFFF" },
            text: { primary: "#0F172A", secondary: "#475569" },
          }
        : {
            background: { default: "#0B1020", paper: "#0F1629" },
            text: { primary: "#E5E7EB", secondary: "#9CA3AF" },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(","),
      h4: { fontWeight: 700, letterSpacing: 0.2 },
      h5: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderBottom: mode === "light" ? "1px solid #E2E8F0" : "1px solid rgba(255,255,255,0.08)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === "light"
              ? "0 6px 20px rgba(2,6,23,.06)"
              : "0 8px 28px rgba(0,0,0,.35)",
            backgroundColor: mode === "light" ? "#FFFFFF" : "#11182b",
          },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiContainer: { defaultProps: { maxWidth: "lg" } },
    },
  });

export default createAppTheme;