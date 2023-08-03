import useLostArticlesConfirm from "@/app/api/coorde_pick/lost_articles/useLostArticlesConfirm";
import LostArticlesDialogs from "./lost-articles-dialogs";
import { Box, CircularProgress, Dialog } from "@mui/material";

type TProps = {
  memberId: number;
  message: string;
  onClose: () => void;
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
  onClose,
  onClickOkButton,
}: TProps) {
  const { data, error, isLoading } = useLostArticlesConfirm({ memberId });
  if (error) {
    return <Dialog open>{error.message}</Dialog>;
  }
  if (isLoading || !data) {
    return <CircularProgress color="primary" />;
  }

  return (
    <>
      <LostArticlesDialogs
        lostArticlesUserInfo={data}
        message={message}
        onClose={onClose}
        onClickOkButton={onClickOkButton}
      />
    </>
  );
}
