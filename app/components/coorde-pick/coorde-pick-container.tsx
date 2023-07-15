"use client";
import { useState } from "react";
import ChartItemFetcher from "./chart-item-fetcher";
import QrCodeReader from "../common/barcode/qrcodeReader";

export default function CoordPickContainer() {
  const [tChartId, setTChartId] = useState<number>();

  const handleSetTChartId = (id: number): void => {
    setTChartId(id);
  };
  const handleBackQrReader = () => {
    setTChartId(undefined);
  };
  return (
    <>
      {!tChartId ? (
        <QrCodeReader onScan={handleSetTChartId} />
      ) : (
        <ChartItemFetcher
          tChartId={tChartId}
          onClickBackQrReader={handleBackQrReader}
        />
      )}
    </>
  );
}
