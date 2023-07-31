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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
          disableAutoFocus={true}
          aria-labelledby="modal-expand-image"
          aria-describedby="modal-expand-clothImage"
        >
          <Box sx={style}>
            <Image alt="" src={imagePath} height={500} width={350} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickCloseModal}
              sx={{
                position: "absolute",
                top: "110%",
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
