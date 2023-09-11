"use client";
import { TWastedReason } from "@/app/api/wasted_reason/getWastedReasonIndex";
import useWastedCreate from "@/app/api/wasted_reason/useWastedCreate";
import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FooterButton from "../common/button/footer-button";
import LoadingDialog from "../common/dialog/loading-dialog";
import WastedReasonItemMediumCard, {
  TIitemInfo,
} from "./wasted-reason-item-medium-card";
import WastedReasonSelect from "./wasted-reason-select";

type TProps = {
  itemInfo: TIitemInfo;
  wastedReasons: TWastedReason[];
};

export default function WastedReasonContainer({
  itemInfo,
  wastedReasons,
}: TProps) {
  const router = useRouter();
  const [selectedCategoryIdFirst, setSelectedCategoryIdFirst] =
    useState<number>();
  const [selectedDetailIdFirst, setSelectedDetailIdFirst] = useState<number>();
  const [selectedPartIdsFirst, setSelectedPartIdsFirst] = useState<number[]>(
    []
  );

  const [selectedCategoryIdSecond, setSelectedCategoryIdSecond] =
    useState<number>();
  const [selectedDetailIdSecond, setSelectedDetailIdSecond] =
    useState<number>();
  const [selectedPartIdsSecond, setSelectedPartIdsSecond] = useState<number[]>(
    []
  );

  const { mutate, isLoading } = useWastedCreate({ itemId: itemInfo.id });
  const handleClickRegister = () => {
    const createWastedReason = (detailId: number, partIds: number[]) => ({
      wastedReasonTypeId: detailId,
      wastedReasonPartIds: partIds,
    });

    const reasons = [];

    if (selectedDetailIdFirst) {
      reasons.push(
        createWastedReason(selectedDetailIdFirst, selectedPartIdsFirst)
      );
    }

    if (selectedDetailIdSecond) {
      reasons.push(
        createWastedReason(selectedDetailIdSecond, selectedPartIdsSecond)
      );
    }

    if (!reasons.length) return;

    mutate(
      { wastedReason: reasons },
      {
        onSuccess: () => {
          alert("廃棄登録に成功しました。");
        },
        onError: (error: AxiosError) => {
          alert(
            `廃棄登録に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );

    router.refresh();
  };

  return (
    <>
      <LoadingDialog isOpen={isLoading} />
      <WastedReasonItemMediumCard itemInfo={itemInfo} />
      <Box marginBottom={3}>
        <Typography variant="h6">理由1 *必須</Typography>
        <WastedReasonSelect
          wastedReasons={wastedReasons}
          selectedCategoryId={selectedCategoryIdFirst}
          selectedDetailId={selectedDetailIdFirst}
          selectedPartIds={selectedPartIdsFirst}
          onSetCategoryId={(id: number) => setSelectedCategoryIdFirst(id)}
          onSetDetailId={(id: number | undefined) =>
            setSelectedDetailIdFirst(id)
          }
          onSetPartIds={(ids: number[]) => setSelectedPartIdsFirst(ids)}
        />
      </Box>
      <Typography variant="h6">理由2 </Typography>
      <WastedReasonSelect
        wastedReasons={wastedReasons}
        selectedCategoryId={selectedCategoryIdSecond}
        selectedDetailId={selectedDetailIdSecond}
        selectedPartIds={selectedPartIdsSecond}
        onSetCategoryId={(id: number) => setSelectedCategoryIdSecond(id)}
        onSetDetailId={(id: number | undefined) =>
          setSelectedDetailIdSecond(id)
        }
        onSetPartIds={(ids: number[]) => setSelectedPartIdsSecond(ids)}
      />
      <FooterButton
        onClick={handleClickRegister}
        disabled={selectedDetailIdFirst === undefined || isLoading}
      >
        確定
      </FooterButton>
    </>
  );
}
