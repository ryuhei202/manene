import { Box, Button, TextField, Typography } from "@mui/material";
import { cookies } from "next/dist/client/components/headers";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

type TProps = {
  onClickSetChartId: (chartId: number) => void;
  onClickCloseBarcodeModal: () => void;
};

export default function BarcodeInput(
  {
    //   onClickSetChartId,
    //   onClickCloseBarcodeModal,
  }
) {
  const [tChartId, setTChartId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeTChartId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTChartId(e.target.value);
    if (typeof e.target.value !== "number") {
      setError("数値のみを入力してください");
    }
  };

  console.log(tChartId);
  console.log(error);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "50vh",
        border: 1,
      }}
      width="80vw"
      height="20vh"
    >
      <Typography margin={2}>バーコードのIDを入力</Typography>
      <TextField
        variant="standard"
        sx={{ width: "80%" }}
        onChange={handleChangeTChartId}
        value={tChartId}
      />
      <Box>
        <Button>キャンセル</Button>
        <Button>OK</Button>
      </Box>
    </Box>
  );
}
