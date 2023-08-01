"use client";
import { TLostArticlesConfirmResponse as TUserInfo } from "@/app/api/coorde_pick/lost_articles/useLostArticlesConfirm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

type TProps = {
  lostArticlesUserInfo: TUserInfo;
  message: string;
  isOpenConfirmDialog: boolean;
  swichOpenConfirmDialog: () => void;
  onClickOkButton: (memberId: number, message: string) => void;
  onCloseCompleteDialog: () => void;
  lostArticlesId?: number;
};

export default function LostArticlesDialogs({
  lostArticlesUserInfo,
  message,
  isOpenConfirmDialog,
  swichOpenConfirmDialog,
  onClickOkButton,
  onCloseCompleteDialog,
  lostArticlesId,
}: TProps) {
  useEffect(() => {
    swichOpenConfirmDialog();
  }, []);

  return (
    <>
      <Dialog open={isOpenConfirmDialog} fullWidth={true}>
        <DialogTitle>登録しますか？</DialogTitle>
        <DialogContent>
          <Typography>パートナーID: {lostArticlesUserInfo.id}</Typography>
          <Typography>名前: {lostArticlesUserInfo.name}</Typography>
          <Typography>伝言メモ: {message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={swichOpenConfirmDialog}>キャンセル</Button>
          <Button
            onClick={() => onClickOkButton(lostArticlesUserInfo.id, message)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!lostArticlesId} onClose={onCloseCompleteDialog}>
        <DialogTitle>忘れ物を登録しました</DialogTitle>
        <DialogContent>
          <Typography>
            忘れ物(ID : {lostArticlesId})の登録が完了しました
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
