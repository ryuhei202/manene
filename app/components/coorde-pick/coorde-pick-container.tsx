"use client";
import QrCodeReader from "../common/barcode/qr-code-reader";
import { useRouter } from "next/navigation";

export default function CoordPickContainer() {
  const router = useRouter();

  const handleSetTChartId = (id: number): void => {
    router.push(`/coorde_pick/${id}`);
  };

  return <QrCodeReader onScan={handleSetTChartId} />;
}
