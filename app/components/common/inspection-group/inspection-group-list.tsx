import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import { List } from "@mui/material";
import InspectionGroupRow from "./inspection-group-row";

type TProps = {
  inspectionGroups: TInspectionGroup[];
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
            inspectionGroup={group}
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
