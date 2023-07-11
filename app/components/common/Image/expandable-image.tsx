import { useState } from "react";
import ImageAlt from "./image-alt";
import { Box, Button, Modal } from "@mui/material";

type TProps = {
  imagePath: string;
  className?: string;
};

export default function ExpandableImage({ imagePath, className }: TProps) {
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
      <ImageAlt
        src={imagePath}
        onClick={handleClickOpenModal}
        style={{ height: 90, width: 70 }}
      />
      {isExpanded && (
        <Modal
          open={isExpanded}
          onClose={handleClickCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            {/* <Box sx={style}>
              <ImageAlt src={expandedImageSrc} />
            </Box> */}
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "80vw",
                maxHeight: "80vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ImageAlt src={imagePath} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickCloseModal}
              sx={{
                position: "absolute" as "absolute",
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
    </div>
  );
}
