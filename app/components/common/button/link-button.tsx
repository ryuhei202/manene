"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

type TProps = {
  buttonName: string;
  path: string;
};

export default function LinkButton({ buttonName, path }: TProps) {
  const router = useRouter();
  return (
    <>
      <Button
        fullWidth={true}
        sx={{ justifyContent: "flex-start" }}
        onClick={() => router.push(path)}
      >
        {buttonName}
      </Button>
    </>
  );
}
