"use client";
import fetchCleaningCostsItemDetail from "@/app/api/cleaning-costs/fetchCleaningCostsItemDetail";
import { TCleaningCostsResponse } from "@/app/api/cleaning-costs/getCreaningCostsChoice";
import useCleaningCostsCreate from "@/app/api/cleaning-costs/useCleaningCostsCreate";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import QrCodeReader from "../common/barcode/qr-code-reader";
import LoadingDialog from "../common/dialog/loading-dialog";
import CleaningCostsList from "./cleaning-costs-list";
import { TItem } from "./cleaning-costs-list-item";

type TProps = {
  cleaningOptions: TCleaningCostsResponse[];
};
export default function CleaningCostsContainer({ cleaningOptions }: TProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<number>();
  const [inputtedCost, setInputtedCost] = useState<number>();
  const [items, setItems] = useState<TItem[]>([]);
  const { mutate, isLoading } = useCleaningCostsCreate();

  const isItemSelected = (targetId: number): boolean => {
    return items.some((item) => item.id === targetId);
  };
  const handleScan = (id: number) => {
    isItemSelected(id)
      ? alert(`アイテム(ID: ${id})は既にスキャンしています。`)
      : fetchCleaningCostsItemDetail({ tItemId: id })
          .then((data: TItem) => setItems([...items, data]))
          .catch((error) => alert(error.message));
  };

  const handleRegister = () => {
    if (items.length > 0 && selectedOptionId && inputtedCost) {
      mutate(
        {
          mCleaningCategoryId: selectedOptionId,
          tItemIds: items.map((item) => item.id),
          cost: inputtedCost,
        },
        {
          onSuccess: () => {
            alert("クリーニングコスト登録が完了しました。");
            setItems([]);
          },
          onError(error: AxiosError) {
            alert(
              `登録に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };

  return (
    <>
      <LoadingDialog isOpen={isLoading} />
      <QrCodeReader onScan={(id: number) => handleScan(id)} isRectangle />
      <Typography>読取件数: {items.length}</Typography>
      {items && (
        <Box overflow="auto" height={430}>
          <CleaningCostsList items={items} />
        </Box>
      )}
      <Box
        marginBottom={3}
        position="fixed"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bottom={0}
        left="50%"
        sx={{
          width: "90%",
          transform: "translateX(-50%)",
        }}
      >
        <Box marginBottom={2} display="flex" justifyContent={"space-between"}>
          <FormControl sx={{ width: "45%" }}>
            <InputLabel>クリーニング内容</InputLabel>
            <Select
              value={selectedOptionId ?? ""}
              label="option-id"
              onChange={(e: SelectChangeEvent<number>) => {
                setSelectedOptionId(e.target.value as number);
                setInputtedCost(
                  cleaningOptions.find(
                    (option: TCleaningCostsResponse) =>
                      option.id === e.target.value
                  )?.baseCost
                );
              }}
            >
              {cleaningOptions.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="コスト"
            value={inputtedCost}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setInputtedCost(
                isNaN(parseInt(e.target.value))
                  ? undefined
                  : parseInt(e.target.value)
              );
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "45%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">円</InputAdornment>,
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{ height: "50px" }}
          disabled={
            items.length < 1 ||
            selectedOptionId === undefined ||
            inputtedCost === undefined
          }
        >
          登録
        </Button>
      </Box>
    </>
  );
}
