import { TInspectionGroupResponse } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import { List } from "@mui/material";
import InspectionGroupRow from "./inspection-group-row";

type TProps = TInspectionGroupResponse & {
  onClickEndRegistration: () => void;
  isLoadingEndRegistration: boolean;
  onClickInspect: () => void;
  isLoadingInspect: boolean;
};

export default function InspectionGroupList({
  inspectionGroups,
  onClickEndRegistration,
  isLoadingEndRegistration,
  onClickInspect,
  isLoadingInspect,
}: TProps) {
  return (
    <List>
      {inspectionGroups.map((group) => {
        return (
          <InspectionGroupRow
            key={group.id}
            groupNo={group.groupNo}
            registrationStartTime={group.registrationStartTime}
            registrationEndTime={group.registrationEndTime}
            inspectionEndTime={group.inspectionEndTime}
            chartCount={group.chartCount}
            washingItemCount={group.washingItemCount}
            purchaseItemCount={group.purchaseItemCount}
            onClickEndRegistration={onClickEndRegistration}
            isLoadingEndRegistration={isLoadingEndRegistration}
            onClickInspect={onClickInspect}
            isLoadingInspect={isLoadingInspect}
          />
        );
      })}
    </List>
  );
}
