"use client";

import {
  TJudgeThrowAwayOptionsResponse,
  TOption,
} from "@/app/api/judge_throw_away/getJudgeThrowAwayOptions";
import { TItemsJudgeThrowAwayResponse } from "@/app/api/judge_throw_away/useItemsJudgeThrowAway";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import ScanButton from "../common/button/scan-button";
import JudgeThrowAwayList from "./judge-throw-away-list";
import JudgeThrowAwaySender from "./judge-throw-away-sender";

type TProps = {
  option: TJudgeThrowAwayOptionsResponse;
};
export default function JudgeThrowAwayContainer({ option }: TProps) {
  const [itemId, setItemId] = useState<number>();
  const [selectedConditionId, setSelectedConditionId] = useState<number>(1);
  const [selectedRepairMethodId, setSelectedRepairMethodId] =
    useState<number>(4);
  const [judgedItems, setJudgedItems] = useState<
    TItemsJudgeThrowAwayResponse[]
  >([]);
  const addJudgedItems = (item: TItemsJudgeThrowAwayResponse) => {
    setJudgedItems([...judgedItems, item]);
    setItemId(undefined);
  };
  return (
    <>
      {itemId && (
        <JudgeThrowAwaySender
          itemId={itemId}
          selectedConditionId={selectedConditionId}
          selectedRepairMethodId={selectedRepairMethodId}
          addJudgedItems={addJudgedItems}
        />
      )}
      <Box overflow="auto" height={530}>
        <JudgeThrowAwayList judgedItems={judgedItems} />
      </Box>
      <hr></hr>
      <Box
        position="fixed"
        bottom={0}
        width="90%"
        display="flex"
        flexDirection="column"
        left="50%"
        justifyContent="center"
        gap={2}
        marginBottom={5}
        sx={{
          transform: "translateX(-50%)",
        }}
      >
        <FormControl sx={{ width: "45%" }}>
          <InputLabel>状態</InputLabel>
          <Select
            value={selectedConditionId}
            label="condition-id"
            onChange={(e: SelectChangeEvent<number>) => {
              setSelectedConditionId(e.target.value as number);
            }}
          >
            {option.conditions.map((condition: TOption) => {
              return (
                <MenuItem key={condition.value} value={condition.value}>
                  {condition.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "45%" }}>
          <InputLabel>状態</InputLabel>
          <Select
            value={selectedRepairMethodId}
            label="repair-method-id"
            onChange={(e: SelectChangeEvent<number>) => {
              setSelectedRepairMethodId(e.target.value as number);
            }}
          >
            {option.repairMethods.map((method: TOption) => {
              return (
                <MenuItem key={method.value} value={method.value}>
                  {method.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <ScanButton
          onScan={(id: number) => setItemId(id)}
          title="アイテムスキャン"
        />
      </Box>
    </>
  );
}
