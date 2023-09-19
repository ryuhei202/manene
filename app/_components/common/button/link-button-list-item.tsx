"use client";
import { Button, ListItem } from "@mui/material";
import Link from "next/link";

type TProps = {
  buttonName: string;
  path: string;
};

export default function LinkButtonListItem({ buttonName, path }: TProps) {
  return (
    <ListItem disablePadding divider>
      <Link href={path}>
        <Button fullWidth={true} sx={{ justifyContent: "flex-start" }}>
          {buttonName}
        </Button>
      </Link>
    </ListItem>
  );
}
