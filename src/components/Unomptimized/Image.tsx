import Image from "next/image";
import { FC, ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  // Add any additional props specific to your Image component
}

export const UnoptimizedImage: FC<ImageProps> = ({ src, alt, className }) => {
  return <></>;
  //   return <Image className={className} unoptimized />;
};
