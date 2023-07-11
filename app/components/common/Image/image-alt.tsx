import Image from "next/image";
import React from "react";

type TProps = {
  src: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  width: number;
  height: number;
};

export default function ImageAlt({
  src,
  onClick,
  style,
  height,
  width,
}: TProps) {
  return (
    <>
      <Image
        alt=""
        src={src}
        onClick={onClick}
        style={style}
        height={height}
        width={width}
      />
    </>
  );
}
