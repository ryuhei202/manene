import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import { Box, Button, ListItem, Typography } from "@mui/material";

type TProps = Omit<TInspectionGroup, "id"> & {
  onClickEndRegistration: () => void;
  isLoadingEndRegistration: boolean;
  onClickInspect: () => void;
  isLoadingInspect: boolean;
};

export default function InspectionGroupRow({
  groupNo,
  registrationStartTime,
  registrationEndTime,
  inspectionEndTime,
  chartCount,
  washingItemCount,
  purchaseItemCount,
  onClickEndRegistration,
  isLoadingEndRegistration,
  onClickInspect,
  isLoadingInspect,
}: TProps) {
  return (
    <ListItem disablePadding divider>
      <Box
        paddingX={3}
        paddingY={2}
        display="flex"
        justifyContent="space-between"
        width="100%"
        color="gray"
      >
        <Box display="flex" flexDirection="column" marginLeft={1}>
          <Typography variant="h6" paddingBottom={1}>
            グループ{groupNo}
          </Typography>
          <Typography variant="subtitle1">
            登録開始: {registrationStartTime}
          </Typography>
          {registrationEndTime ? (
            <>
              <Typography variant="subtitle1">
                登録締切: {registrationEndTime}
              </Typography>
              {inspectionEndTime ? (
                <>
                  <Typography variant="caption" paddingTop={1}>
                    一斉検品済み
                  </Typography>
                  <Typography variant="caption">
                    検品時刻: {inspectionEndTime}
                  </Typography>
                </>
              ) : (
                <Button
                  onClick={onClickInspect}
                  variant="contained"
                  sx={{
                    height: "40px",
                    backgroundColor: "warning.dark",
                    marginTop: "15px",
                  }}
                  disabled={isLoadingInspect}
                >
                  一斉検品
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={onClickEndRegistration}
              variant="contained"
              sx={{
                height: "40px",
                backgroundColor: "primary.main",
                marginTop: "15px",
              }}
              disabled={isLoadingEndRegistration}
            >
              登録締切
            </Button>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          marginRight={2}
        >
          <Typography
            variant="subtitle1"
            paddingBottom={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ fontSize: "larger", marginRight: "0.5rem" }}>
              {chartCount}
            </span>
            <span>カルテ</span>
          </Typography>
          <Typography
            variant="subtitle1"
            paddingBottom={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                fontSize: "larger",
                marginRight: "0.5rem",
                color: "#ff0000",
              }}
            >
              {washingItemCount}
            </span>
            <span>汚れアイテム</span>
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                fontSize: "larger",
                marginRight: "0.5rem",
                color: "#ff0000",
              }}
            >
              {purchaseItemCount}
            </span>
            <span>買取品</span>
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
