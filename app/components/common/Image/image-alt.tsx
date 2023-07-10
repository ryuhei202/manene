type TProps = {
  src: string;
  onClick?: () => void;
  className?: string;
};

export default function ImageAlt({ src, onClick, className }: TProps) {
  return <img src={src} onClick={onClick} className={className} />;
}
