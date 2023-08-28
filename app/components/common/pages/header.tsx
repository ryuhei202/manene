"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
const AppBar = dynamic(
  () => import("@mui/material").then((mod) => mod.AppBar),
  {
    ssr: false,
  }
);
const Box = dynamic(() => import("@mui/material").then((mod) => mod.Box), {
  ssr: false,
});
const Button = dynamic(
  () => import("@mui/material").then((mod) => mod.Button),
  {
    ssr: false,
  }
);
const Toolbar = dynamic(
  () => import("@mui/material").then((mod) => mod.Toolbar),
  {
    ssr: false,
  }
);

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
