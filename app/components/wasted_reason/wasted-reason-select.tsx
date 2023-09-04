"use client";

import { TItemMaster } from "@/app/api/item-location/useItemLocationsItemScan";
import {
  TDetail,
  TWastedReason,
} from "@/app/api/wasted_reason/getWastedReasonIndex";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

type TProps = {
  wastedReasons: TWastedReason[];
};

export default function WastedReasonSelect({ wastedReasons }: TProps) {
  const [categoryId, setCategoryId] = useState<number>();
  const [detailId, setDetailId] = useState<number>();
  const [partIds, setPartIds] = useState<number[]>([]);
  const currentDetail = wastedReasons
    .find((reason: TWastedReason) => reason.id === categoryId)
    ?.details?.find((detail: TDetail) => detail.id === detailId);

  return (
    <Box>
      <FormControl margin="normal" sx={{ width: "200px" }}>
        <InputLabel>カテゴリ</InputLabel>
        <Select
          value={categoryId ?? ""}
          onChange={(e: SelectChangeEvent<number>) => {
            setCategoryId(e.target.value as number);
            setDetailId(undefined);
            setPartIds([]);
          }}
        >
          {wastedReasons.map((reason: TWastedReason) => {
            return (
              <MenuItem key={reason.id} value={reason.id}>
                {reason.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl margin="normal" sx={{ width: "200px" }}>
        <InputLabel>詳細</InputLabel>
        <Select
          value={detailId ?? ""}
          onChange={(e: SelectChangeEvent<number>) => {
            setDetailId(e.target.value as number);
            setPartIds([]);
          }}
        >
          {categoryId &&
            wastedReasons
              .find((reason: TWastedReason) => reason.id === categoryId)
              ?.details.map((detail: TDetail) => {
                return (
                  <MenuItem key={detail.id} value={detail.id}>
                    {detail.name}
                  </MenuItem>
                );
              })}
        </Select>
      </FormControl>
      {(currentDetail?.itemParts.length as number) > 0 && (
        <FormControl margin="normal" sx={{ width: "200px" }}>
          <InputLabel>部位</InputLabel>
          <Select
            value={partIds}
            onChange={(e: SelectChangeEvent<number[]>) => {
              setPartIds(e.target.value as number[]);
            }}
            multiple
          >
            {currentDetail?.itemParts.map((part: TItemMaster) => {
              return (
                <MenuItem key={part.id} value={part.id}>
                  {part.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
