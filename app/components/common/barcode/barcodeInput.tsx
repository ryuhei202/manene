import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

type TProps = {
  onClickSetChartId: (chartId: number) => void;
  onClickCloseBarcodeModal: () => void;
};

export default function BarcodeInput({
  onClickSetChartId,
  onClickCloseBarcodeModal,
}: TProps) {
  const [id, setId] = useState<string>("");

  const handleChangeTChartId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setId(e.target.value);
  };

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
      height="17vh"
      textAlign="center"
    >
      <Typography margin={2} textAlign="left">
        バーコードのIDを入力
      </Typography>
      <TextField
        type="number"
        variant="standard"
        sx={{ width: "80%" }}
        onChange={handleChangeTChartId}
        value={id}
      />
      <Box margin="10px" textAlign="right">
        <Button onClick={() => onClickCloseBarcodeModal}>キャンセル</Button>
        <Button onClick={() => onClickSetChartId(parseInt(id))}>OK</Button>
      </Box>
    </Box>
  );
}
