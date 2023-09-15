import React from "react";
import Header from "../_components/common/pages/header";

export default function ItemDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="アイテム詳細表示" />
      {children}
    </section>
  );
}
