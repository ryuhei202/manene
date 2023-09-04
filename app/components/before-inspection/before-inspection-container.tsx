"use client";
import useBeforeInspectionsCreate, {
  TBeforeInspectionsCreateResponse,
  TChart,
} from "@/app/api/before-inspections/useBeforeInspectionsCreate";
import useBeforeInspectionsInspect from "@/app/api/before-inspections/useBeforeInspectionsInspect";
import useBeforeInspectionsToMisplacedItem from "@/app/api/before-inspections/useBeforeInspectionsToMisplacedItem";
import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import { Alert, Box, Button, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import ScanButton from "../common/button/scan-button";
import ChartCard from "../common/card/chart-card";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import BeforeInspectionList from "./before-inspection-list";

type TProps = {
  inspectionGroup: TInspectionGroup | null;
};

export default function BeforeInspectionContainer({ inspectionGroup }: TProps) {
  const { mutate: createMutate, isLoading: isCreateLoading } =
    useBeforeInspectionsCreate();
  const { mutate: toMisplacedMutate, isLoading: isToMisplacedLoading } =
    useBeforeInspectionsToMisplacedItem();
  const { mutate: inspectMutate, isLoading: isInspectLoading } =
    useBeforeInspectionsInspect();
  const [inspectionData, setInspectionData] =
    useState<Omit<TBeforeInspectionsCreateResponse, "tChart">>();
  const [registeredChart, setRegisteredChart] = useState<TChart>();

  const onScanCreateBeforeInspection = (itemId: number) => {
    createMutate(
      { itemId: itemId },
      {
        onSuccess(response) {
          setInspectionData({
            isCreatedInspectionData: response.data.isCreatedInspectionData,
            registeredInspectionGroup: response.data.registeredInspectionGroup,
            acceptingInspectionGroup: response.data.acceptingInspectionGroup,
            isChartInspected: response.data.isChartInspected,
          });
          setRegisteredChart(response.data.tChart);
        },
        onError(error: AxiosError) {
          alert(
            `検品グループへの登録に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
  };

  const handleClickToMisplaced = (id: number) => {
    toMisplacedMutate(
      { chartItemId: id },
      {
        onSuccess(response) {
          setRegisteredChart(response.data);
          alert("入れ忘れ登録を完了しました。");
        },
        onError(error: AxiosError) {
          alert(
            `入れ忘れ登録に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
  };

  const handleClickInspect = (id: number) => {
    inspectMutate(
      { chartId: id },
      {
        onSuccess(response) {
          setInspectionData({
            isCreatedInspectionData: response.data.isCreatedInspectionData,
            registeredInspectionGroup: response.data.registeredInspectionGroup,
            acceptingInspectionGroup: response.data.acceptingInspectionGroup,
            isChartInspected: response.data.isChartInspected,
          });
          setRegisteredChart(response.data.tChart);
          alert("即時検品処理を完了しました。");
        },
        onError(error: AxiosError) {
          alert(
            `即時検品に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
  };
  return (
    <>
      <LoadingDialog
        isOpen={isCreateLoading || isToMisplacedLoading || isInspectLoading}
      />
      <Header title="返却検品前登録">
        <Typography>
          グループ{inspectionGroup ? inspectionGroup.groupNo : "なし"}
        </Typography>
      </Header>
      {inspectionData && (
        <Box margin={2}>
          {inspectionData.isChartInspected ? (
            <Alert severity="info">検品処理済みです</Alert>
          ) : inspectionData.isCreatedInspectionData ? (
            <Alert severity="info">
              グループ{inspectionData.registeredInspectionGroup.groupNo}
              に登録しました
            </Alert>
          ) : (
            <Alert severity="warning">
              グループ{inspectionData.registeredInspectionGroup.groupNo}
              に登録済みです
            </Alert>
          )}
        </Box>
      )}

      {registeredChart && (
        <>
          <ChartCard
            id={registeredChart.id}
            tMemberId={registeredChart.tMemberId}
            name={registeredChart.name}
            deliveryDate={registeredChart.deliveryDate}
            tChartItems={registeredChart.tChartItems}
          />
          <BeforeInspectionList
            chartItems={registeredChart.tChartItems}
            onClick={handleClickToMisplaced}
            isLoading={isToMisplacedLoading}
          />
        </>
      )}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          gap: 2,
          marginBottom: "30px",
        }}
      >
        <ScanButton
          onScan={(id: number) => onScanCreateBeforeInspection(id)}
          title="アイテムスキャン"
          autoCloseDialog
        />
        {registeredChart && (
          <Button
            variant="contained"
            sx={{ height: "50px", backgroundColor: "primary.main" }}
            onClick={() => handleClickInspect(registeredChart.id)}
            disabled={isInspectLoading}
          >
            即時検品する
          </Button>
        )}
      </Box>
    </>
  );
}
