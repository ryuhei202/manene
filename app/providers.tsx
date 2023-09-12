"use client";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#bdbdbd", light: "#d3d3d3", dark: "#808080" },
    success: { main: "#DDFFDD" },
    warning: { main: "#FADBDA", dark: "#ff0000", light: "#fd7e00" },
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
