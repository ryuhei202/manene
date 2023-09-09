import { TChart as TProps } from "@/app/api/before-inspections/useBeforeInspectionsCreate";
import { Box, Card, Typography } from "@mui/material";

export default function ChartCard({
  id,
  tMemberId,
  name,
  deliveryDate,
  tChartItems,
}: TProps) {
  return (
    <Card
      sx={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        bgcolor: "secondary.light",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        paddingY="1px"
        paddingX={3}
      >
        <Box>
          <Typography variant="caption">
            カルテID: {id}/発送日: {deliveryDate}
          </Typography>
          <Typography variant="body2">
            {name}: {tMemberId}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            color="primary.main"
            component="span"
            marginRight={1}
          >
            {tChartItems.length}
          </Typography>
          <Typography variant="subtitle1" component="span">
            アイテム
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
