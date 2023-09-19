import { Box, Button } from "@mui/material";
import React, { CSSProperties } from "react";

type TProps = {
  onClick: () => void;
  disabled?: boolean;
  bgcolor?: string;
  children: React.ReactNode;
  style?: CSSProperties;
};
export default function FooterButton({
  onClick,
  disabled = false,
  bgcolor = "primary.main",
  children,
  style,
}: TProps) {
  return (
    <Box
      marginBottom={3}
      position="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bottom={0}
      left="50%"
      sx={{
        width: "90%",
        transform: "translateX(-50%)",
      }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        sx={{ height: "50px", bgcolor }}
        style={style}
        disabled={disabled}
      >
        {children}
      </Button>
    </Box>
  );
}
