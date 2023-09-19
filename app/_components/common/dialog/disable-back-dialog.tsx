"use client";
import { Dialog } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  children: React.ReactNode;
};

export default function DisableBackDialog({
  open,
  onClose,
  fullScreen = false,
  children,
}: TProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (open) {
      history.pushState("", "", pathname);
      addEventListener("popstate", onClose);
      return () => {
        removeEventListener("popstate", onClose);
      };
    }
  }, [open, onClose, pathname]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={fullScreen}>
      {children}
    </Dialog>
  );
}
