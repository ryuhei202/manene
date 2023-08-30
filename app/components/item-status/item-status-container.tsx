"use client";
import {
  TItemStatus,
  TOptionsIndexResponse,
} from "@/app/api/item_status/getOptionsIndex";
import useItemsBulkUpdateStatus from "@/app/api/item_status/useItemsBulkUpdateStatus";
import useItemsValidateBulkUpdateStatus from "@/app/api/item_status/useItemsValidateBulkUpdateStatus";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import ScanButton from "../common/button/scan-button";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import SubHeader from "../common/pages/sub-header";

type TProps = {
  statusOption: TOptionsIndexResponse;
};

export default function ItemStatusContainer({ statusOption }: TProps) {
  const [itemIds, setItemIds] = useState<number[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<TItemStatus>(
    statusOption.itemStatuses[0]
  );

  const [notExistIds, setNotExistIds] = useState<number[]>([]);

  const { mutate: updateMutate, isLoading: updateIsLoading } =
    useItemsBulkUpdateStatus();

  const { mutate: validateMutate, isLoading: validateIsLoading } =
    useItemsValidateBulkUpdateStatus();

  const handleSend = () => {
    if (itemIds.length > 0) {
      validateMutate(
        { status: selectedStatus.value, itemIds },
        {
          onSuccess: (response) => {
            if (response.data.notExistIds.length > 0) {
              setNotExistIds(response.data.notExistIds);
            } else {
              updateMutate(
                { status: selectedStatus.value, itemIds },
                {
                  onSuccess: () => {
                    alert("ステータス更新に成功しました");
                    setItemIds([]);
                    setSelectedStatus(statusOption.itemStatuses[0]);
                  },
                  onError(error: AxiosError) {
                    alert(
                      `ステータス更新に失敗しました。 ${
                        (error.response?.data as { message: string })?.message
                      }`
                    );
                  },
                }
              );
            }
          },
          onError(error: AxiosError) {
            alert(
              `ステータス更新に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };

  const handleDeleteIds = (ids: number[]) => {
    const updateItemIds = itemIds.filter((itemId) => !ids.includes(itemId));
    setItemIds(updateItemIds);
    setNotExistIds([]);
  };

  const updateStatus = (value: number, name: string) => {
    setSelectedStatus({ value, name });
  };

  return (
    <>
      {updateIsLoading && <LoadingDialog />}
      {validateIsLoading && <LoadingDialog />}

      <Header title={"ステータス一括変更"} />
      <SubHeader>アイテムID数:{itemIds.length}</SubHeader>
      {itemIds.map((itemId) => (
        <List key={itemId}>
          <ListItem disablePadding divider>
            <ListItemText primary={itemId} />
            <Button
              onClick={() => {
                handleDeleteIds([itemId]);
              }}
            >
              削除
            </Button>
          </ListItem>
        </List>
      ))}

      <div
        style={{
          display: "flex",
          flexFlow: "column",
          position: "fixed",
          bottom: 0,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {itemIds.length > 0 && (
          <Box
            sx={{
              padding: "10%",
              marginBottom: "1px",
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="status-label">アイテムステータス</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={selectedStatus.value}
                  label="アイテムステータス"
                  onChange={(event) =>
                    updateStatus(
                      event.target.value as number,
                      event.target.name
                    )
                  }
                >
                  {statusOption.itemStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            bottom: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            marginBottom: "30px",
            alignItems: "center",
            ...(itemIds.length > 0 && {
              flexDirection: "row",
            }),
          }}
        >
          <ScanButton
            onScan={(id: number) => {
              setItemIds([...itemIds, id]);
            }}
            title="アイテムスキャン"
            buttonStyle={{ width: itemIds.length > 0 ? "45%" : "90%" }}
          />

          {itemIds.length > 0 && (
            <Button
              variant="contained"
              sx={{
                height: "50px",
                backgroundColor: "primary.main",
                width: "45%",
              }}
              disabled={itemIds.length === 0}
              onClick={() => {
                handleSend();
              }}
            >
              送信
            </Button>
          )}
        </Box>
      </div>

      {notExistIds.length > 0 && (
        <Dialog open>
          <DialogTitle>{"更新できないアイテムがあります"}</DialogTitle>
          <DialogContent>
            ▼存在しないアイテム
            <br />
            {notExistIds.join(",")}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotExistIds([])}>キャンセル</Button>
            <Button onClick={() => handleDeleteIds(notExistIds)}>
              一覧から削除する
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
