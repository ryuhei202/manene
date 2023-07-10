import { useState } from "react";
import ImageAlt from "./image-alt";

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
        <div>
          <div>
            <ImageAlt src={expandedImageSrc} />
            <button onClick={handleClickCloseModal}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}
