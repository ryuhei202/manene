"use client";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrCodeReader() {
  const [data, setData] = useState<object>();

  console.log(data);

  return (
    <>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (result) {
            setData(result);
          }

          if (error) {
            // eslint-disable-next-line no-console
            console.info(error);
          }
        }}
        containerStyle={{ width: "100%" }}
      />
      <p>{data?.text}</p>
    </>
  );
}
