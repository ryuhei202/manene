"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

type TProps = {
  onClickSetId: (id: number) => void;
  onClickCloseBarcodeModal: () => void;
  isOpen: boolean;
};

export default function BarcodeInput({
  onClickSetId,
  onClickCloseBarcodeModal,
  isOpen,
}: TProps) {
  const [id, setId] = useState<string>("");

  const handleChangeTChartId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setId(e.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClickCloseBarcodeModal}>
      <DialogTitle>バーコードのIDを入力</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="number"
          variant="standard"
          fullWidth
          onChange={handleChangeTChartId}
          value={id}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClickCloseBarcodeModal}>キャンセル</Button>
        <Button onClick={() => onClickSetId(parseInt(id))}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
