import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import useInspectionGroupsEndRegistration from "@/app/api/inspection-groups/useInspectionGroupsEndRegistration";
import useInspectionGroupsInspect from "@/app/api/inspection-groups/useInspectionGroupsInspect";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
type TProps = {
  selectedGroupId: number;
  isEndRegistrationDialogOpen: boolean;
  isInspectDialogOpen: boolean;
  onCloseEndRegistrationDialog: () => void;
  onCloseInspectDialog: () => void;
  unsetSelectedGroupId: () => void;
  onSetInspectionGroups: (groups: TInspectionGroup[]) => void;
};

export default function InspectionGroupDialogs({
  selectedGroupId,
  isEndRegistrationDialogOpen,
  isInspectDialogOpen,
  onCloseEndRegistrationDialog,
  onCloseInspectDialog,
  unsetSelectedGroupId,
  onSetInspectionGroups,
}: TProps) {
  const { mutate: endRegistrationMutate, isLoading: isEndRegistrationLoading } =
    useInspectionGroupsEndRegistration({ id: selectedGroupId });
  const { mutate: inspectMutate, isLoading: isInspectLoading } =
    useInspectionGroupsInspect({ id: selectedGroupId });

  const handleClickEndRegistration = () => {
    endRegistrationMutate(undefined, {
      onSuccess(response) {
        alert("検品グループの締切を完了しました。");
        onSetInspectionGroups(response.data.inspectionGroups);
        unsetSelectedGroupId();
        onCloseEndRegistrationDialog();
      },
      onError(error: AxiosError) {
        alert(
          `検品グループの締切に失敗しました。 ${
            (error.response?.data as { message: string })?.message
          }`
        );
      },
    });
  };

  const handleClickInspect = () => {
    inspectMutate(undefined, {
      onSuccess(response) {
        alert("一斉検品が完了しました。");
        onSetInspectionGroups(response.data.inspectionGroups);
        unsetSelectedGroupId();
        onCloseInspectDialog();
      },
      onError(error: AxiosError) {
        alert(
          `一斉検品に失敗しました。 ${
            (error.response?.data as { message: string })?.message
          }`
        );
      },
    });
  };

  return (
    <>
      <DisableBackDialog
        open={isEndRegistrationDialogOpen}
        onClose={onCloseEndRegistrationDialog}
      >
        <DialogTitle>検品前登録締切</DialogTitle>
        <DialogContent>検品グループへの登録を締め切りますか？</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onCloseEndRegistrationDialog();
              unsetSelectedGroupId();
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleClickEndRegistration}
            disabled={isEndRegistrationLoading}
          >
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      <DisableBackDialog
        open={isInspectDialogOpen}
        onClose={onCloseInspectDialog}
      >
        <DialogTitle>一斉検品</DialogTitle>
        <DialogContent>
          検品グループのアイテムを一斉検品しますか？
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onCloseInspectDialog();
              unsetSelectedGroupId();
            }}
          >
            キャンセル
          </Button>

          <Button onClick={handleClickInspect} disabled={isInspectLoading}>
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>
    </>
  );
}
