// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  QrDimensionFunction,
  QrDimensions,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode/esm/core";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

type TConfigArgs = {
  fps: number;
  qrbox?: number | QrDimensions | QrDimensionFunction;
  aspectRatio?: number;
  disableFlip?: boolean;
};
type TProps = TConfigArgs & {
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback?: QrcodeErrorCallback;
};

// Creates the configuration object for Html5QrcodeScanner.

const Html5QrcodePlugin = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
}: TProps) => {
  useEffect(() => {
    // when component mounts
    const config: TConfigArgs = { fps, qrbox, aspectRatio, disableFlip };

    // Suceess callback is required.
    if (!qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      true
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
