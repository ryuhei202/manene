import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useDisableBrowserBack() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleClickOpenBarcodeDialog = () => {
    setIsDialogOpen(true);
    history.pushState("", "", pathname);
  };
  const blockBrowserBack = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  useEffect(() => {
    addEventListener("popstate", blockBrowserBack);
  }, [blockBrowserBack]);
  return {
    isDialogOpen,
    setIsDialogOpen,
    handleClickOpenBarcodeDialog,
  };
}
