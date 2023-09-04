"use client";
import { TItemMaster } from "@/app/api/item-location/useItemLocationsItemScan";
import {
  TDetail,
  TWastedReason,
} from "@/app/api/wasted_reason/getWastedReasonIndex";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type TProps = {
  wastedReasons: TWastedReason[];
  selectedCategoryId: number;
  selectedDetailId: number;
  selectedPartIds: number[];
  onSetCategoryId: (id: number) => void;
  onSetDetailId: (id: number | undefined) => void;
  onSetPartIds: (ids: number[]) => void;
};

export default function WastedReasonSelect({
  wastedReasons,
  selectedCategoryId,
  selectedDetailId,
  selectedPartIds,
  onSetCategoryId,
  onSetDetailId,
  onSetPartIds,
}: TProps) {
  const currentDetail = wastedReasons
    .find((reason: TWastedReason) => reason.id === selectedCategoryId)
    ?.details?.find((detail: TDetail) => detail.id === selectedCategoryId);

  return (
    <Box>
      <FormControl margin="normal" sx={{ width: "200px" }}>
        <InputLabel>カテゴリ</InputLabel>
        <Select
          value={selectedCategoryId ?? ""}
          onChange={(e: SelectChangeEvent<number>) => {
            onSetCategoryId(e.target.value as number);
            onSetDetailId(undefined);
            onSetPartIds([]);
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
          value={selectedDetailId ?? ""}
          onChange={(e: SelectChangeEvent<number>) => {
            onSetDetailId(e.target.value as number);
            onSetPartIds([]);
          }}
        >
          {selectedCategoryId &&
            wastedReasons
              .find((reason: TWastedReason) => reason.id === selectedCategoryId)
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
            value={selectedPartIds}
            onChange={(e: SelectChangeEvent<number[]>) => {
              onSetPartIds(e.target.value as number[]);
            }}
            multiple
            renderValue={(selected) =>
              selected
                .map(
                  (id) =>
                    currentDetail?.itemParts.find((part) => part.id === id)
                      ?.name || ""
                )
                .join(", ")
            }
          >
            {currentDetail?.itemParts.map((part: TItemMaster) => {
              return (
                <MenuItem key={part.id} value={part.id}>
                  <Checkbox checked={selectedPartIds.includes(part.id)} />
                  <ListItemText primary={part.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
