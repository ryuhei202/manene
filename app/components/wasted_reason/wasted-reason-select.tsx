"use client";
import useWastedCreate from "@/app/api/wasted_reason/useWastedCreate";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import router from "next/router";
import { useState } from "react";

type TProps = {
  wastedReasons: {
    id: number;
    name: string;
    details: {
      id: number;
      name: string;
      itemParts: {
        id: number;
        name: string;
      }[];
    }[];
  }[];
};

export default function WastedReasonSelect({ wastedReasons }: TProps) {
  const [categoryId, setCategoryId] = useState<number>(1);
  const [detailId, setDetailId] = useState<number>(1);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const { mutate: createMutate, isLoading: createIsLoading } =
    useWastedCreate();

  const handleChangeCategory = (event: SelectChangeEvent<number>) => {
    setCategoryId(event.target.value as number);
  };

  const handleChangeDetail = (event: SelectChangeEvent<number>) => {
    setDetailId(event.target.value as number);
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedParts(event.target.value as string[]);
  };

  const itemParts = {
    肩幅: 1,
    身幅: 2,
    着丈: 3,
    袖丈: 4,
    ウエスト: 5,
    ヒップ: 6,
    もも周り: 7,
    股上: 8,
    股下: 9,
    ふくらはぎ: 10,
    //ここはconsoleでundifindになる
    襟: 11,
    袖: 12,
    ベルトループ: 13,
    全体: 99,
  };

  const selectedPartsIds = selectedParts
    .map((part) => {
      return itemParts[part as keyof typeof itemParts];
    })
    .sort((a, b) => a - b);

  const handleSend = () => {
    createMutate(
      {
        itemId: ItemId,
        wastedReason: {
          wastedReasonTypeId: detailId,
          wastedReasonPartIds: selectedPartsIds,
        },
      },
      {
        onSuccess: () => {
          // いずれ削除
          alert("成功");
          router.push("/wasted_reason");
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  console.log(wastedReasons);
  console.log(selectedPartsIds);

  return (
    <>
      <Box sx={{ padding: "7%" }}>
        <h2>理由１ ※必須</h2>
        <p>カテゴリ</p>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-label">カテゴリ</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={categoryId}
              label="カテゴリ"
              onChange={handleChangeCategory}
            >
              {wastedReasons.map((wastedReason) => {
                return (
                  <MenuItem key={wastedReason.id} value={wastedReason.id}>
                    {wastedReason.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <p>詳細</p>
          {categoryId && (
            <FormControl fullWidth>
              <InputLabel id="detail-label">詳細</InputLabel>
              <Select
                labelId="detail-label"
                id="detail-select"
                value={detailId}
                label="詳細"
                onChange={handleChangeDetail}
              >
                {wastedReasons
                  .find((wastedReason) => wastedReason.id === categoryId)
                  ?.details.map((detail) => (
                    <MenuItem key={detail.id} value={detail.id}>
                      {detail.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <p>部位</p>
          {(categoryId === 1 || categoryId === 3) && (
            <div>
              <FormControl fullWidth>
                <InputLabel id="part-label">部位</InputLabel>
                <Select
                  labelId="part-label"
                  id="part-checkbox"
                  multiple
                  value={selectedParts}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {wastedReasons
                    .find((wastedReason) => wastedReason.id === categoryId)
                    ?.details.find((detail) => detail.id === detailId)
                    ?.itemParts.map((itemPart) => (
                      <MenuItem key={itemPart.id} value={itemPart.name}>
                        <Checkbox
                          checked={selectedParts.indexOf(itemPart.name) > -1}
                        />
                        <ListItemText primary={itemPart.name} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          )}
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          sx={{
            height: "50px",
            backgroundColor: "primary.main",
            width: "90%",
          }}
          // disabled={selectedParts === 0}
          onClick={() => {
            handleSend();
          }}
        >
          確定
        </Button>
      </Box>
    </>
  );
}
