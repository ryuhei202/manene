import React from "react";
import Header from "../components/common/pages/header";

export default function JudgeThrowAwayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="廃棄判定" />
      {children}
    </section>
  );
}
