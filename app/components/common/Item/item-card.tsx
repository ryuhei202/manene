import ExpandableImage from "../Image/expandable-image";

type TProps = {
  imagePaths: { defaultPath: string; expandedPath: string };
  children: React.ReactNode;
};

export default function ItemCard({ imagePaths, children }: TProps) {
  return (
    <div>
      <ExpandableImage
        defaultImageSrc={imagePaths.defaultPath}
        expandedImageSrc={imagePaths.expandedPath}
      />
      {children}
    </div>
  );
}
