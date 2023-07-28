"use client"; // Error components must be Client Components

import { Box, Container } from "@mui/material";
import { useEffect } from "react";

export default function ReservationError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>問題が発生しました</h2>
        <button onClick={() => reset()}>再度試す</button>
      </Box>
    </Container>
  );
}
