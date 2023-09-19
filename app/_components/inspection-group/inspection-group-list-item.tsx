import { TInspectionGroup } from "@/app/_api/inspection-groups/getInspectionGroupsIndex";
import { Box, Button, ListItem, Typography } from "@mui/material";
type TProps = {
  inspectionGroup: TInspectionGroup;
  onClickEndRegistration: (id: number) => void;
  onClickInspect: (id: number) => void;
};

export default function InspectionGroupListItem({
  inspectionGroup,
  onClickEndRegistration,
  onClickInspect,
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
            グループ{inspectionGroup.groupNo}
          </Typography>
          <Typography variant="subtitle1">
            登録開始: {inspectionGroup.registrationStartTime}
          </Typography>
          {inspectionGroup.registrationEndTime ? (
            <>
              <Typography variant="subtitle1">
                登録締切: {inspectionGroup.registrationEndTime}
              </Typography>
              {inspectionGroup.inspectionEndTime ? (
                <>
                  <Typography variant="caption" paddingTop={1}>
                    一斉検品済み
                  </Typography>
                  <Typography variant="caption">
                    検品時刻: {inspectionGroup.inspectionEndTime}
                  </Typography>
                </>
              ) : (
                <Button
                  onClick={() => onClickInspect(inspectionGroup.id)}
                  variant="contained"
                  sx={{
                    height: "40px",
                    backgroundColor: "warning.dark",
                    marginTop: "15px",
                  }}
                >
                  一斉検品
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => onClickEndRegistration(inspectionGroup.id)}
              variant="contained"
              sx={{
                height: "40px",
                backgroundColor: "primary.main",
                marginTop: "15px",
              }}
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
            display="flex"
            alignItems="center"
          >
            <span style={{ fontSize: "larger", marginRight: "0.5rem" }}>
              {inspectionGroup.chartCount}
            </span>
            <span>カルテ</span>
          </Typography>
          <Typography
            variant="subtitle1"
            paddingBottom={2}
            display="flex"
            alignItems="center"
          >
            <span
              style={{
                fontSize: "larger",
                marginRight: "0.5rem",
                color: "#ff0000",
              }}
            >
              {inspectionGroup.washingItemCount}
            </span>
            <span>汚れアイテム</span>
          </Typography>
          <Typography variant="subtitle1" display="flex" alignItems="center">
            <span
              style={{
                fontSize: "larger",
                marginRight: "0.5rem",
                color: "#ff0000",
              }}
            >
              {inspectionGroup.purchaseItemCount}
            </span>
            <span>買取品</span>
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
