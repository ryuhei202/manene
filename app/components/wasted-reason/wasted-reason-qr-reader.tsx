"use client";
import { useRouter } from "next/navigation";
import QrCodeReader from "../common/barcode/qr-code-reader";

export const WastedReasonQrReader = () => {
  const router = useRouter();
  const handleScan = (id: number): void => {
    router.push(`/wasted_reason/${id}`);
  };
  return <QrCodeReader onScan={handleScan} />;
};
