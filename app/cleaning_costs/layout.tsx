import React from "react";
import Header from "../components/common/pages/header";

export default function CleaningCostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="クリーニングコスト登録" />
      {children}
    </section>
  );
}
