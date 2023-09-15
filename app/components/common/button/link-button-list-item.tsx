"use client";
import { Button, ListItem } from "@mui/material";
import Link from "next/link";

type TProps = {
  buttonName: string;
  path: string;
  disabled?: boolean;
};

export default function LinkButtonListItem({
  buttonName,
  path,
  disabled,
}: TProps) {
  return (
    <ListItem
      disablePadding
      divider
      sx={{ bgcolor: disabled ? "warning.main" : undefined }}
    >
      <Link href={path} style={{ width: "100%" }}>
        <Button fullWidth sx={{ justifyContent: "flex-start" }}>
          {buttonName}
        </Button>
      </Link>
    </ListItem>
  );
}
