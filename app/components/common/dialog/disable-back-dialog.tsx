"use client";
import { Dialog } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function DisableBackDialog({ open, onClose, children }: TProps) {
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
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
}
