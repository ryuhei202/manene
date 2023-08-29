"use client";
import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import useInspectionGroupsCreate from "@/app/api/inspection-groups/useInspectionGroupsCreate";
import useInspectionGroupsEndRegistration from "@/app/api/inspection-groups/useInspectionGroupsEndRegistration";
import useInspectionGroupsInspect from "@/app/api/inspection-groups/useInspectionGroupsInspect";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useReducer, useState } from "react";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import InspectionGroupList from "./inspection-group-list";
const Box = dynamic(() => import("@mui/material").then((mod) => mod.Box), {
  ssr: false,
});
const Button = dynamic(
  () => import("@mui/material").then((mod) => mod.Button),
  {
    ssr: false,
  }
);
const DialogActions = dynamic(
  () => import("@mui/material").then((mod) => mod.DialogActions),
  {
    ssr: false,
  }
);
const DialogContent = dynamic(
  () => import("@mui/material").then((mod) => mod.DialogContent),
  {
    ssr: false,
  }
);
const DialogTitle = dynamic(
  () => import("@mui/material").then((mod) => mod.DialogTitle),
  {
    ssr: false,
  }
);
const DisableBackDialog = dynamic(
  () => import("../common/dialog/disable-back-dialog"),
  {
    ssr: false,
  }
);

type TProps = {
  initialInspectionGroups: TInspectionGroup[];
};

type TDialogState = {
  isCreateDialogOpen: boolean;
  isEndRegistrationDialogOpen: boolean;
  isInspectDialogOpen: boolean;
};

type TAction =
  | {
      type: "create";
    }
  | {
      type: "endRegistration";
    }
  | {
      type: "inspect";
    };

export default function InspectionGroupContainer({
  initialInspectionGroups,
}: TProps) {
  const dialogReducer = (
    dialogState: TDialogState,
    action: TAction
  ): TDialogState => {
    switch (action.type) {
      case "create":
        return {
          ...dialogState,
          isCreateDialogOpen: !dialogState.isCreateDialogOpen,
        };
      case "endRegistration":
        return {
          ...dialogState,
          isEndRegistrationDialogOpen: !dialogState.isEndRegistrationDialogOpen,
        };
      case "inspect":
        return {
          ...dialogState,
          isInspectDialogOpen: !dialogState.isInspectDialogOpen,
        };
      default:
        throw new Error(
          "操作を完了できませんでした。担当者にお問い合わせください"
        );
    }
  };

  const initialDialogState: TDialogState = {
    isCreateDialogOpen: false,
    isEndRegistrationDialogOpen: false,
    isInspectDialogOpen: false,
  };

  const [dialogState, dispatch] = useReducer(dialogReducer, initialDialogState);

  const [selectedGroupId, setSelectedGroupId] = useState<number>();
  const [inspectionGroups, setInspectionGroups] = useState<TInspectionGroup[]>(
    initialInspectionGroups
  );
  const { mutate: createMutate, isLoading: isCreateLoading } =
    useInspectionGroupsCreate();
  const { mutate: endRegistrationMutate, isLoading: isEndRegistrationLoading } =
    useInspectionGroupsEndRegistration();
  const { mutate: inspectMutate, isLoading: isInspectLoading } =
    useInspectionGroupsInspect();

  const handleClickCreate = () => {
    createMutate(undefined, {
      onSuccess(response) {
        setInspectionGroups(response.data.inspectionGroups);
        dispatch({ type: "create" });
      },
      onError: (error: AxiosError) => {
        alert((error.response?.data as { message: string })?.message);
      },
    });
  };

  const handleClickEndRegistration = (id: number) => {
    endRegistrationMutate(
      {
        path: `inspection/inspection_groups/${id}/end_registration`,
      },
      {
        onSuccess(response) {
          alert("検品グループの締切を完了しました。");
          setInspectionGroups(response.data.inspectionGroups);
          setSelectedGroupId(undefined);
          dispatch({ type: "endRegistration" });
        },
        onError(error: AxiosError) {
          alert((error.response?.data as { message: string })?.message);
        },
      }
    );
  };

  const handleClickInspect = (id: number) => {
    inspectMutate(
      {
        path: `inspection/inspection_groups/${id}/inspect`,
      },
      {
        onSuccess(response) {
          alert("一斉検品が完了しました。");
          setInspectionGroups(response.data.inspectionGroups);
          setSelectedGroupId(undefined);
          dispatch({ type: "inspect" });
        },
        onError(error: AxiosError) {
          alert((error.response?.data as { message: string })?.message);
        },
      }
    );
  };

  return (
    <>
      <LoadingDialog
        isOpen={isCreateLoading || isEndRegistrationLoading || isInspectLoading}
      />
      <Header title="返却検品管理"></Header>

      <InspectionGroupList
        inspectionGroups={inspectionGroups}
        onClickEndRegistration={(id: number) => {
          dispatch({ type: "endRegistration" });
          setSelectedGroupId(id);
        }}
        isLoadingEndRegistration={isEndRegistrationLoading}
        onClickInspect={(id: number) => {
          dispatch({ type: "inspect" });
          setSelectedGroupId(id);
        }}
        isLoadingInspect={isInspectLoading}
      />
      <Box height={50}></Box>
      <Box
        marginBottom={3}
        position="fixed"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bottom={0}
        left="50%"
        sx={{
          width: "90%",
          transform: "translateX(-50%)",
        }}
      >
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "create" })}
          sx={{ height: "50px" }}
        >
          +検品グループ追加
        </Button>
      </Box>

      <DisableBackDialog
        open={dialogState.isCreateDialogOpen}
        onClose={() => dispatch({ type: "create" })}
      >
        <DialogTitle>新規検品グループを追加しますか？</DialogTitle>
        <DialogContent>
          登録中の検品グループがある場合は自動で締め切られます。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch({ type: "create" })}>
            キャンセル
          </Button>
          <Button onClick={handleClickCreate} disabled={isCreateLoading}>
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      {selectedGroupId && (
        <>
          <DisableBackDialog
            open={dialogState.isEndRegistrationDialogOpen}
            onClose={() => dispatch({ type: "endRegistration" })}
          >
            <DialogTitle>検品前登録締切</DialogTitle>
            <DialogContent>
              検品グループへの登録を締め切りますか？
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  dispatch({ type: "endRegistration" });
                  setSelectedGroupId(undefined);
                }}
              >
                キャンセル
              </Button>
              <Button
                onClick={() => handleClickEndRegistration(selectedGroupId)}
                disabled={isCreateLoading}
              >
                OK
              </Button>
            </DialogActions>
          </DisableBackDialog>

          <DisableBackDialog
            open={dialogState.isInspectDialogOpen}
            onClose={() => dispatch({ type: "inspect" })}
          >
            <DialogTitle>一斉検品</DialogTitle>
            <DialogContent>
              検品グループのアイテムを一斉検品しますか？
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  dispatch({ type: "inspect" });
                  setSelectedGroupId(undefined);
                }}
              >
                キャンセル
              </Button>

              <Button
                onClick={() => handleClickInspect(selectedGroupId)}
                disabled={isCreateLoading}
              >
                OK
              </Button>
            </DialogActions>
          </DisableBackDialog>
        </>
      )}
    </>
  );
}
