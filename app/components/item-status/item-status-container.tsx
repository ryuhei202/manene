"use client";
import { TOptionsIndexResponse } from "@/app/api/item_status/getOptionsIndex";
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
  Typography,
} from "@mui/material";
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

  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState<number>();

  const [notExistIds, setNotExistIds] = useState<number[]>();

  const [statusName, setStatusName] = useState<string>("");

  const { mutate: updateMutate, isLoading: updateIsLoading } =
    useItemsBulkUpdateStatus();

  const { mutate: validateMutate, isLoading: validateIsLoading } =
    useItemsValidateBulkUpdateStatus();

  const handleSend = () => {
    if (status !== undefined && itemIds.length > 0) {
      validateMutate(
        { status: status, itemIds: itemIds },
        {
          onSuccess: (response) => {
            if (response.data.notExistIds.length > 0) {
              setNotExistIds(response.data.notExistIds);
            } else {
              updateMutate(
                { status: status, itemIds: itemIds },
                {
                  onSuccess: () => {
                    alert("ステータス更新に成功しました");
                    setItemIds([]);
                    setStatus(undefined);
                    setOpen(false);
                    setStatusName("");
                  },
                  onError: (error) => {
                    alert(error.message);
                  },
                }
              );
            }
          },
          onError: (error) => {
            alert(error.message);
          },
        }
      );
    }
  };

  const handleDeleteNotExistIds = (ids: number[]) => {
    const updateItemIds = itemIds.filter((itemId) => !ids?.includes(itemId));
    setItemIds(updateItemIds);
    setNotExistIds(undefined);
  };

  const updateStatus = (value: number, name: string) => {
    setStatus(value);
    setStatusName(name);
    setOpen(!open);
  };

  return (
    <>
      {updateIsLoading && <LoadingDialog />}
      {validateIsLoading && <LoadingDialog />}

      <Header title={"ステータス一括変更"} />
      <SubHeader>アイテムID数:{itemIds.length}</SubHeader>
      {itemIds.map((itemId) => (
        <List key={itemId}>
          <ListItem disablePadding>
            <ListItemText primary={itemId} />
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
                <InputLabel id="demo-simple-select-label">
                  アイテムステータス
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
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
            <Typography ml={2}>{statusName}</Typography>
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
              flexDirection: "row", // 横並びに
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
              disabled={status === undefined}
              onClick={() => {
                handleSend();
              }}
            >
              送信
            </Button>
          )}
        </Box>
      </div>

      {notExistIds && (
        <Dialog open>
          <DialogTitle>{"更新できないアイテムがあります"}</DialogTitle>
          <DialogContent>
            ▼存在しないアイテム
            <br />
            {notExistIds.join(",")}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotExistIds(undefined)}>
              キャンセル
            </Button>
            <Button onClick={() => handleDeleteNotExistIds(notExistIds)}>
              一覧から削除する
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
