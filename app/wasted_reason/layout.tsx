import React from "react";
import Header from "../components/common/pages/header";

export default function WastedReasonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="廃棄登録" />
      {children}
    </section>
  );
}
