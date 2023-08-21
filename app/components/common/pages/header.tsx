"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";

import Link from "next/link";
import React from "react";

type TProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: TProps) {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={"/"} passHref>
          <Button
            style={{
              color: "white",
              marginTop: "8px",
              marginBottom: "8px",
              marginLeft: "12px",
              marginRight: "12px",
              fontSize: "1.25rem",
              fontWeight: 500,
            }}
          >
            {title}
          </Button>
        </Link>
        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}
