"use client";
import ItemCard from "../components/common/Item/item-card";

const imagePath = "/images/item-image/1.webp";

export default function CoordePick() {
  return (
    <ItemCard imagePath={imagePath}>
      <div>棚名: kiizankiizan</div>
    </ItemCard>
  );
}
