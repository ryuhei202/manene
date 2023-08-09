import useLostArticlesConfirm from "@/app/api/coorde_pick/lost_articles/useLostArticlesConfirm";
import { CircularProgress, Dialog } from "@mui/material";
import LostArticlesDialogs from "./lost-articles-dialogs";

type TProps = {
  memberId: number;
  message: string;
  lostArticleId?: number;
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
};

export default function LostArticlesConfirmFetcher({
  memberId,
  message,
  lostArticleId,
  isLoading,
  onClose,
  onComplete,
  onClickOkButton,
}: TProps) {
  const { data, error } = useLostArticlesConfirm({ memberId });
  if (error) {
    return <Dialog open>{error.message}</Dialog>;
  }
  if (!data) {
    return (
      <Dialog
        open
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <CircularProgress color="primary" />
      </Dialog>
    );
  }

  return (
    <>
      <LostArticlesDialogs
        lostArticlesUserInfo={data}
        message={message}
        lostArticleId={lostArticleId}
        isLoading={isLoading}
        onClose={onClose}
        onComplete={onComplete}
        onClickOkButton={onClickOkButton}
      />
    </>
  );
}
