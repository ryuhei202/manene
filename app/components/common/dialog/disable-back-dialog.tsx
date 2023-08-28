"use client";
import { Dialog } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  altCallback: () => void;
  children: React.ReactNode;
};

export default function DisableBackDialog({
  open,
  altCallback,
  children,
}: TProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (open) {
      history.pushState("", "", pathname);
      addEventListener("popstate", altCallback);
      return () => {
        removeEventListener("popstate", altCallback);
      };
    }
  }, [open, altCallback, pathname]);
  return (
    <Dialog open={open} fullScreen>
      {children}
    </Dialog>
  );
}
