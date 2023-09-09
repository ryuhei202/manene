import React from "react";
import Header from "../components/common/pages/header";

export default function LostArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="忘れ物登録" />
      {children}
    </section>
  );
}
