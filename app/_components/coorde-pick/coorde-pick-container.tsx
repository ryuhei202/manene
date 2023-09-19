"use client";
import { useState } from "react";
import QrCodeReader from "../common/barcode/qr-code-reader";
import { useRouter } from "next/navigation";
import LoadingPage from "../common/pages/loading-page";

export default function CoordPickContainer() {
  const router = useRouter();

  const [chartId, setChartId] = useState<number>();

  const handleSetTChartId = (id: number): void => {
    setChartId(id);
    router.push(`/coorde_pick/${id}`);
  };

  if (chartId) {
    return <LoadingPage />;
  }

  return <QrCodeReader onScan={handleSetTChartId} />;
}
