import { useState } from "react";
import ImageAlt from "./image-alt";
import { Box, Modal } from "@mui/material";

type TProps = {
  defaultImageSrc: string;
  expandedImageSrc: string;
  className?: string;
};

export default function ExpandableImage({
  defaultImageSrc,
  expandedImageSrc,
  className,
}: TProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleClickOpenModal = () => {
    setIsExpanded(true);
  };
  const handleClickCloseModal = () => {
    setIsExpanded(false);
  };
  return (
    <div>
      {!isExpanded ? (
        <ImageAlt src={defaultImageSrc} onClick={handleClickOpenModal} />
      ) : (
        <Modal
          open={isExpanded}
          onClose={handleClickCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageAlt src={expandedImageSrc} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
