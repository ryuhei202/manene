"use client";
import QrCodeReader from "./components/common/barcode/qrcodeReader";

export default function Page() {
  return (
    <>
      <>hello</>
      <QrCodeReader onScan={() => {}} />
    </>
  );
}
