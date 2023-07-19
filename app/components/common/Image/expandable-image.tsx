"use client";
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import Image from "next/image";

type TProps = {
  imagePath: string;
  className?: string;
};

export default function ExpandableImage({ imagePath }: TProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleClickOpenModal = () => {
    setIsExpanded(true);
  };
  const handleClickCloseModal = () => {
    setIsExpanded(false);
  };
  return (
    <>
      <Image
        alt=""
        src={imagePath}
        onClick={handleClickOpenModal}
        height={100}
        width={70}
      />
      {isExpanded && (
        <Modal
          open={isExpanded}
          onClose={handleClickCloseModal}
          aria-labelledby="modal-expand-image"
          aria-describedby="modal-expand-clothImage"
        >
          <Box>
            <Box
              sx={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "80vw",
                maxHeight: "80vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image alt="" src={imagePath} height={450} width={350} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickCloseModal}
              sx={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -80%)",
                textAlign: "center",
                mt: 3,
                width: 160,
              }}
            >
              閉じる
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
