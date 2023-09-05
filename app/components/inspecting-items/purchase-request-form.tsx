"use client";
import { TItemInfo } from "@/app/api/before-inspections/useBeforeInspectionsCreate";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import Header from "../common/pages/header";
import SectionHeader from "../common/pages/section-header";
type TProps = {
  itemInfo: TItemInfo;
  selectedImages: string[];
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  requestReason: number;
  onChangeSelect: (e: SelectChangeEvent<number>) => void;
  onClickRegister: () => void;
  canRegister: boolean;
  onClose: () => void;
};

export const REQUEST_REASON = {
  UNCLEANNESS: 0,
  OTHER: 1,
} as const;

export default function PurchaseRequestForm({
  itemInfo,
  selectedImages,
  onChangeImage,
  message,
  onChangeInput,
  requestReason,
  onChangeSelect,
  onClickRegister,
  canRegister,
  onClose,
}: TProps) {
  return (
    <>
      <Header title="買取依頼" />

      <Box marginY={2}>
        <ItemCard imagePath={itemInfo.itemImageUrl} divider={false}>
          <ItemInfoCard itemInfo={itemInfo} />
        </ItemCard>
      </Box>

      <SectionHeader>画像</SectionHeader>
      <Box display="flex" flexWrap="wrap" margin={2}>
        {selectedImages.map((image, index) => (
          <Box key={image} marginX={3} marginBottom={2}>
            <Image
              src={image}
              alt={`selected-image-${index}`}
              width={70}
              height={125}
            />
          </Box>
        ))}
      </Box>

      <Box
        height={80}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" component="label">
          画像追加
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onChangeImage}
            multiple
          />
        </Button>
      </Box>

      <SectionHeader>コメント</SectionHeader>
      <Box margin={1}>
        <TextField
          value={message}
          fullWidth
          multiline
          rows={4}
          onChange={onChangeInput}
        ></TextField>
      </Box>

      <SectionHeader>依頼理由</SectionHeader>
      <Box marginX={1} marginY={2}>
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="demo-simple-select-label">依頼理由</InputLabel>
          <Select
            value={requestReason}
            label="request-reason"
            onChange={onChangeSelect}
          >
            <MenuItem value={REQUEST_REASON.UNCLEANNESS}>色抜け・欠損</MenuItem>
            <MenuItem value={REQUEST_REASON.OTHER}>破れ</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          gap: 2,
          marginBottom: "30px",
        }}
      >
        <Button
          variant="contained"
          onClick={onClickRegister}
          disabled={!canRegister}
          sx={{ height: "50px" }}
        >
          確定
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={onClose}
          sx={{ height: "50px" }}
        >
          キャンセル
        </Button>
      </Box>
    </>
  );
}
