"use client";
import { Alert, AlertTitle } from "@mui/material";

type TProps = {
  massage: string;
};

export default function ErrorPage({ massage }: TProps) {
  return (
    <Alert
      severity="error"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertTitle>Error</AlertTitle>
      {massage}
    </Alert>
  );
}
