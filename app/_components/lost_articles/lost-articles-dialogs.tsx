"use client";
import { TLostArticlesConfirmResponse as TUserInfo } from "@/app/_api/coorde_pick/lost_articles/useLostArticlesConfirm";
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
  isLoading: boolean;
  onClose: () => void;
  onComplete: () => void;
  onClickOkButton: ({
    memberId,
    message,
  }: {
    memberId: number;
    message: string;
  }) => void;
  lostArticleId?: number;
};

export default function LostArticlesDialogs({
  lostArticlesUserInfo,
  message,
  isLoading,
  onClose,
  onComplete,
  onClickOkButton,
  lostArticleId,
}: TProps) {
  return (
    <>
      <Dialog open onClose={onClose} fullWidth>
        {!lostArticleId ? (
          <div id="lost-articles-confirm-dialogs">
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
                  onClickOkButton({
                    memberId: lostArticlesUserInfo.id,
                    message,
                  })
                }
                disabled={isLoading}
              >
                OK
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div id="lost-articles-complete-dialogs">
            <DialogTitle>忘れ物を登録しました</DialogTitle>
            <DialogContent>
              <Typography>
                忘れ物(ID : {lostArticleId})の登録が完了しました
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onComplete}>OK</Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </>
  );
}
