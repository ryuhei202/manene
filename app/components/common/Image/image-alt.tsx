type TProps = {
  src: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export default function ImageAlt({ src, onClick, style }: TProps) {
  return <img src={src} onClick={onClick} style={style} />;
}
