"use client";
import useLostArticlesCreate from "@/app/api/coorde_pick/lost_articles/useLostArticlesCreate";
import { useState } from "react";
import LostArticlesConfirmFetcher from "./lost_articles-confirm-fetcher";
import LostArticlesForm from "./lost_articles-form";

export default function LostArticlesContainer() {
  const [memberId, setMemberId] = useState<number>();
  const [message, setMessage] = useState<string>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [lostArticleId, setLostArticleId] = useState<number>();

  const { mutate, isLoading } = useLostArticlesCreate();
  const handleClickOk = () => {
    if (memberId && message) {
      mutate(
        { memberId, message },
        {
          onError: (error) => {
            alert(error);
          },
          onSuccess: (data) => {
            setLostArticleId(data.data.id);
          },
        }
      );
    }
  };

  return (
    <>
      <LostArticlesForm
        memberId={memberId}
        message={message}
        onChangeMemberId={(value) => setMemberId(value)}
        onChangeMessage={(value) => setMessage(value)}
        onClickOpenLostArticlesFetcherVisible={() => setIsOpenDialog(true)}
      />
      {isOpenDialog && memberId && message && (
        <LostArticlesConfirmFetcher
          memberId={memberId}
          message={message}
          isLoading={isLoading}
          onClose={() => setIsOpenDialog(false)}
          onComplete={() => {
            setIsOpenDialog(false);
            setMemberId(undefined);
            setMessage(undefined);
          }}
          onClickOkButton={handleClickOk}
          lostArticleId={lostArticleId}
        />
      )}
    </>
  );
}
