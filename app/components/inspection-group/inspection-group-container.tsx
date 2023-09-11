"use client";
import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import useInspectionGroupsCreate from "@/app/api/inspection-groups/useInspectionGroupsCreate";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import FooterButton from "../common/button/footer-button";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import InspectionGroupDialogs from "./inspection-group-dialogs";
import InspectionGroupList from "./inspection-group-list";
type TProps = {
  initialInspectionGroups: TInspectionGroup[];
};

export default function InspectionGroupContainer({
  initialInspectionGroups,
}: TProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEndRegistrationDialogOpen, setIsEndRegistrationDialogOpen] =
    useState<boolean>(false);
  const [isInspectDialogOpen, setIsInspectDialogOpen] =
    useState<boolean>(false);

  const [selectedGroupId, setSelectedGroupId] = useState<number>();
  const [inspectionGroups, setInspectionGroups] = useState<TInspectionGroup[]>(
    initialInspectionGroups
  );
  const { mutate: createMutate, isLoading: isCreateLoading } =
    useInspectionGroupsCreate();

  const handleClickCreate = () => {
    createMutate(undefined, {
      onSuccess(response) {
        setInspectionGroups(response.data.inspectionGroups);
        setIsCreateDialogOpen(false);
      },
      onError: (error: AxiosError) => {
        alert((error.response?.data as { message: string })?.message);
      },
    });
  };

  return (
    <>
      <LoadingDialog isOpen={isCreateLoading} />
      <Header title="返却検品管理"></Header>

      <InspectionGroupList
        inspectionGroups={inspectionGroups}
        onClickEndRegistration={(id: number) => {
          setIsEndRegistrationDialogOpen(true);
          setSelectedGroupId(id);
        }}
        onClickInspect={(id: number) => {
          setIsInspectDialogOpen(true);
          setSelectedGroupId(id);
        }}
      />
      <Box height={50}></Box>
      <FooterButton onClick={() => setIsCreateDialogOpen(true)}>
        +検品グループ追加
      </FooterButton>
      <DisableBackDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <DialogTitle>新規検品グループを追加しますか？</DialogTitle>
        <DialogContent>
          登録中の検品グループがある場合は自動で締め切られます。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={handleClickCreate} disabled={isCreateLoading}>
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      {selectedGroupId && (
        <InspectionGroupDialogs
          selectedGroupId={selectedGroupId}
          isEndRegistrationDialogOpen={isEndRegistrationDialogOpen}
          isInspectDialogOpen={isInspectDialogOpen}
          onCloseEndRegistrationDialog={() =>
            setIsEndRegistrationDialogOpen(false)
          }
          onCloseInspectDialog={() => setIsInspectDialogOpen(false)}
          unsetSelectedGroupId={() => setSelectedGroupId(undefined)}
          onSetInspectionGroups={(groups: TInspectionGroup[]) =>
            setInspectionGroups(groups)
          }
        />
      )}
    </>
  );
}
