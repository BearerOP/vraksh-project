import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  image: string | null;
  aspect: number;
  onCropComplete: (blob: Blob) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, aspect, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect]
  );

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      // This is to demonstrate how to export a crop as a blob
      const offscreen = document.createElement('canvas');
      const ctx = offscreen.getContext('2d');
      
      if (!ctx) {
        throw new Error('No 2d context');
      }

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      
      // Set canvas dimensions to the cropped image dimensions
      offscreen.width = completedCrop.width * scaleX;
      offscreen.height = completedCrop.height * scaleY;

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      // Convert canvas to blob
      offscreen.toBlob(
        (blob) => {
          if (blob) {
            onCropComplete(blob);
          }
        },
        'image/jpeg',
        0.95 // Quality
      );
    }
  }, [completedCrop, onCropComplete]);

  if (!image) return null;

  return (
    <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => setCrop(percentCrop)}
      onComplete={(c) => setCompletedCrop(c)}
      aspect={aspect}
      className="max-h-96"
    >
      <img
        ref={imgRef}
        src={image}
        alt="Crop preview"
        style={{ maxWidth: '100%' }}
        onLoad={onImageLoad}
      />
    </ReactCrop>
  );
};

export default ImageCropper;