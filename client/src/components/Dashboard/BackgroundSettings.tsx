import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import ImageCropper from "../ImageCropper";
import imageCompression from "browser-image-compression";
import { useAuth } from "@/hooks/use-auth";
import { cloudinarySign } from "@/lib/apis";

interface BackgroundSettingsProps {
  pageId: string;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ pageId }) => {
  const { activePage, updatePage } = useLinks();
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );
  const [backgroundImagePreview, setBackgroundImagePreview] =
    useState<string>("");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const { user } = useAuth();

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackgroundImageFile(file);
      setBackgroundImagePreview(URL.createObjectURL(file));
      setCroppedBlob(null); // reset any previous blob
    }
  };

  const handleBackgroundImageSave = async () => {
    if (!croppedBlob || !user) return;
  
    try {
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
        type: croppedBlob.type,
      });
  
      const compressedFile = await imageCompression(croppedFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });
  
      const publicId = `vraksh/${activePage?.title}-bg`;
  
      const sigRes = await cloudinarySign(publicId, "bg_preset");
      const { signature, timestamp, apiKey, cloudName } = sigRes.data as {
        signature: string;
        timestamp: number;
        apiKey: string;
        cloudName: string;
      };
  
      // 2. Prepare and send upload
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("upload_preset", "bg_preset");
      formData.append("public_id", publicId);
  
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await uploadRes.json();
  
      if (data.secure_url) {
        updatePage(pageId, { backgroundImageUrl: data.secure_url });
        setBackgroundImageFile(null);
        setBackgroundImagePreview("");
        setCroppedBlob(null);
      }
    } catch (error) {
      console.error("Background image upload error:", error);
    }
  };
  

  const handleRemoveBackground = () => {
    updatePage(pageId, { backgroundImageUrl: null });
  };

  if (!activePage) return null;

  return (
    <div>
      <label className="block text-sm font-medium mb-6">Background</label>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-48 w-fit rounded-lg overflow-hidden mb-3 bg-gray-100">
          {activePage.backgroundImageUrl ? (
            <img
              src={activePage.backgroundImageUrl}
              alt="Background preview"
              className="h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <ImageIcon className="h-6 w-6 mr-2" />
              <span>No background set</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Background
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Background Image</DialogTitle>
              <DialogDescription>
                Upload and crop your background image
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {backgroundImageFile ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative aspect-[9/16] max-w-lg mx-auto border rounded-lg overflow-hidden">
                    <ImageCropper
                      image={backgroundImagePreview}
                      aspect={9 / 16}
                      onCropComplete={(blob) => setCroppedBlob(blob)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setBackgroundImageFile(null)}
                    >
                      Choose Different Image
                    </Button>
                    <Button
                      onClick={handleBackgroundImageSave}
                      disabled={!croppedBlob}
                    >
                      Save Background
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="backgroundImageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                    />
                    <label
                      htmlFor="backgroundImageUpload"
                      className="cursor-pointer"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {activePage.backgroundImageUrl && (
          <Button variant="destructive" onClick={handleRemoveBackground}>
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default BackgroundSettings;
