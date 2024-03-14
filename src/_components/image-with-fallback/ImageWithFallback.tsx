"use client";

import React, { FC } from "react";
import { useState } from "react";
import Image from "next/image";

interface IImageWithFallback {
  fallback?: string;
  alt: string;
  src: string;
}

const fallbackImage =
  "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA";

const ImageWithFallback: FC<IImageWithFallback> = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      alt={alt}
      onError={handleError}
      src={error ? fallbackImage : src}
      layout={"fill"}
      {...props}
    />
  );
};

export default ImageWithFallback;
