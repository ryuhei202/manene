import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import { List } from "@mui/material";
import InspectionGroupListItem from "./inspection-group-list-item";
type TProps = {
  inspectionGroups: TInspectionGroup[];
  onClickEndRegistration: (id: number) => void;
  onClickInspect: (id: number) => void;
};

export default function InspectionGroupList({
  inspectionGroups,
  onClickEndRegistration,
  onClickInspect,
}: TProps) {
  return (
    <List>
      {inspectionGroups.map((group) => {
        return (
          <InspectionGroupListItem
            key={group.id}
            inspectionGroup={group}
            onClickEndRegistration={onClickEndRegistration}
            onClickInspect={onClickInspect}
          />
        );
      })}
    </List>
  );
}
