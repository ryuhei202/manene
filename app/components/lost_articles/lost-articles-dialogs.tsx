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

type TProps = {
  lostArticlesUserInfo: TUserInfo;
  message: string;
  onClose: () => void;
  onClickOkButton: (memberId: number, message: string) => void;
  lostArticlesId?: number;
};

export default function LostArticlesDialogs({
  lostArticlesUserInfo,
  message,
  onClose,
  onClickOkButton,
  lostArticlesId,
}: TProps) {
  return (
    <>
      <Dialog open onClose={onClose} fullWidth>
        {!lostArticlesId ? (
          <>
            <DialogTitle>登録しますか？</DialogTitle>
            <DialogContent>
              <Typography>パートナーID: {lostArticlesUserInfo.id}</Typography>
              <Typography>名前: {lostArticlesUserInfo.name}</Typography>
              <Typography>伝言メモ: {message}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>キャンセル</Button>
              <Button
                onClick={() =>
                  onClickOkButton(lostArticlesUserInfo.id, message)
                }
              >
                OK
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>忘れ物を登録しました</DialogTitle>
            <DialogContent>
              <Typography>
                忘れ物(ID : {lostArticlesId})の登録が完了しました
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>OK</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
