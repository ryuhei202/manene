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
          {buttonName}
        </Button>
      </Link>
    </ListItem>
  );
}
