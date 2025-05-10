'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageCropper from './ImageCropper';

export default function ImageCropperDialog() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUrl(URL.createObjectURL(file));
    setOpen(true);
  };

  const handleCropComplete = async (blob: Blob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log('Uploaded image URL:', data.secure_url);

    setIsUploading(false);
    setOpen(false);
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <Dialog.Root   open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content asChild>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="fixed left-1/2 top-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg space-y-4"
            >
              <Dialog.Title className="text-lg font-semibold">Crop Your Image</Dialog.Title>
              <Dialog.Close className="absolute right-4 top-4 text-gray-500 hover:text-black">&times;</Dialog.Close>

              <div className="max-h-96 overflow-auto">
                <ImageCropper image={fileUrl} aspect={1} onCropComplete={handleCropComplete} />
              </div>

              {isUploading && <p className="text-center text-sm text-blue-600">Uploading...</p>}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
