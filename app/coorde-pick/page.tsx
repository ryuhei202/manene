"use client";
import ItemCard from "../components/common/Item/item-card";

const imagePaths = {
  defaultPath: "/images/item-image/1.webp",
  expandedPath: "images/item-image/1.webp",
};

export default function CoordePick() {
  return (
    <div>
      <ItemCard imagePaths={imagePaths}>
        <div>Hello</div>
      </ItemCard>
    </div>
  );
}
