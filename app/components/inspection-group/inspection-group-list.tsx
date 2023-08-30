import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import dynamic from "next/dynamic";
import InspectionGroupListItem from "./inspection-group-list-item";
const List = dynamic(() => import("@mui/material").then((mod) => mod.List), {
  ssr: false,
});

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
