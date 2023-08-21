"use client";
import { TOptionsIndexResponse } from "@/app/api/item_status/getOptionsIndex";
import useItemsBulkUpdateStatus from "@/app/api/item_status/useItemsBulkUpdateStatus";
import useItemsValidateBulkUpdateStatus from "@/app/api/item_status/useItemsValidateBulkUpdateStatus";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ScanButton from "../common/button/scan-button";
import Header from "../common/pages/header";
import SubHeader from "../common/pages/sub-header";

type TProps = {
  statusOption: TOptionsIndexResponse;
};

export default function ItemStatusContainer({ statusOption }: TProps) {
  const [itemIds, setItemIds] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState<number>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [notExistIds, setNotExistIds] = useState<number[]>();

  const {
    mutate: updateMutate,
    error: updateError,
    isLoading: updateIsLoading,
  } = useItemsBulkUpdateStatus();

  const {
    mutate: validateMutate,
    error: validateError,
    isLoading: validateIsLoading,
  } = useItemsValidateBulkUpdateStatus();

  const handleSend = () => {
    if (status !== undefined && itemIds.length > 0) {
      validateMutate(
        { status: status, itemIds: itemIds },
        {
          onSuccess: (response) => {
            if (response.data.notExistIds.length > 0) {
              setIsOpen(true);
              setNotExistIds(response.data.notExistIds);
            } else {
              updateMutate(
                { status: status, itemIds: itemIds },
                {
                  onSuccess: () => {
                    alert("ステータス更新に成功しました");
                  },
                  onError: () => {
                    alert("Error");
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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header title={"ステータス一括変更"} />
      <SubHeader>アイテムID数:{itemIds.length}</SubHeader>
      {itemIds.map((itemId) => (
        <List key={itemId}>
          <ListItem disablePadding>
            <ListItemText primary={itemId} />
          </ListItem>
        </List>
      ))}

      {itemIds.length > 0 && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="アイテムステータス" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {statusOption.itemStatuses.map((status) => (
              <List key={status.value}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setStatus(status.value)}>
                    <ListItemText primary={status.name} />
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
          </Collapse>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "10px",
        }}
      >
        <ScanButton
          onScan={(id: number) => {
            setItemIds([...itemIds, id]);
          }}
          title="アイテムスキャン"
        />

        {/* useItemsBulkUpdateStatusを使ってアイテムステータスの更新 */}
        {itemIds.length > 0 && (
          <Button
            variant="contained"
            sx={{
              height: "50px",
              backgroundColor: "primary.main",
              marginLeft: "10px",
              width: "144px",
            }}
            disabled={status === undefined}
            onClick={() => {
              handleSend();
              setItemIds([]);
              setStatus(undefined);
              setOpen(false);
            }}
          >
            送信
          </Button>
        )}
      </Box>
      <Dialog open={isOpen}>
        <DialogContent>{notExistIds}</DialogContent>
      </Dialog>
    </>
  );
}
