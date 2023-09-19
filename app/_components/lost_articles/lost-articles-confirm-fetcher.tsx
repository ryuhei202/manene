import useLostArticlesConfirm from "@/app/_api/coorde_pick/lost_articles/useLostArticlesConfirm";
import LoadingDialog from "../common/dialog/loading-dialog";
import LostArticlesDialogs from "./lost-articles-dialogs";

type TProps = {
  memberId: number;
  message: string;
  lostArticleId?: number;
  isCreateLoading: boolean;
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
  isCreateLoading,
  onClose,
  onComplete,
  onClickOkButton,
}: TProps) {
  const { data, error, isLoading } = useLostArticlesConfirm({ memberId });
  if (error) {
    alert(`ユーザーが見つかりません。${error.message}`);
    onClose();
  }

  return (
    <>
      <LoadingDialog isOpen={isLoading} />
      {data && (
        <LostArticlesDialogs
          lostArticlesUserInfo={data}
          message={message}
          lostArticleId={lostArticleId}
          isLoading={isCreateLoading}
          onClose={onClose}
          onComplete={onComplete}
          onClickOkButton={onClickOkButton}
        />
      )}
    </>
  );
}
