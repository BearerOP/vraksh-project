// components/ImageCropper.tsx
import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  image: string | null;
  aspect: number; // use 1 for 1:1
  onCropComplete: (blob: Blob) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  aspect,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        width,
        height
      ),
      width,
      height
    );

    setCrop(initialCrop);
  };

  const generateCroppedImage = async () => {
    if (!crop || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    const pixelRatio = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");

    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    canvas.width = cropWidth * pixelRatio;
    canvas.height = cropHeight * pixelRatio;

    if (ctx) {
      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
    }

    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, "image/jpeg", 0.95);
  };

  useEffect(() => {
    if (crop?.width && crop?.height) {
      generateCroppedImage();
    }
  }, [crop]);

  if (!image) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      <ReactCrop
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        aspect={aspect}
        minWidth={100}
        minHeight={100}
        keepSelection={true}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Crop source"
          onLoad={onImageLoad}
          className="max-w-full"
        />
      </ReactCrop>
    </div>
  );
};

export default ImageCropper;
