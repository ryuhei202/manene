import { AppBar, Typography } from "@mui/material";
import React from "react";

export default function CoordePickLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppBar position="static">
        <Typography variant="h6" m={1.5}>
          コーデピック
        </Typography>
      </AppBar>
      {children}
    </section>
  );
}
