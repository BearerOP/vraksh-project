import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import ImageCropper from "../ImageCropper";
;

interface BackgroundSettingsProps {
  pageId: string;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ pageId }) => {
  const { activePage, updatePage } = useLinks();
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string>("");
  const [backgroundCroppedArea, setBackgroundCroppedArea] = useState(null);

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackgroundImageFile(file);
      setBackgroundImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBackgroundCropComplete = (croppedArea: any) => {
    setBackgroundCroppedArea(croppedArea);
  };

  const handleBackgroundImageSave = async () => {
    // In a real implementation, this would process the cropped image
    // and upload it to storage service
    if (backgroundImageFile && backgroundCroppedArea) {
      // Mock implementation - in a real app, you would:
      // 1. Create a canvas and draw the cropped image
      // 2. Convert to Blob/File
      // 3. Upload to your storage service
      // 4. Get the URL and update the page

      const mockUrl = `https://example.com/background-${Date.now()}.jpg`;
      updatePage(pageId, { backgroundImageUrl: mockUrl });
      setBackgroundImageFile(null);
    }
  };

  const handleRemoveBackground = () => {
    updatePage(pageId, { backgroundImageUrl: null });
  };

  if (!activePage) return null;

  return (
    <div>
      <label className="block text-sm font-medium mb-6">
        Background
      </label>
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
              <DialogTitle>
                Upload Background Image
              </DialogTitle>
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
                      onCropComplete={handleBackgroundCropComplete}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setBackgroundImageFile(null)}
                  >
                    Choose Different Image
                  </Button>
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
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports JPG, PNG, WEBP
                      </p>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                disabled={!backgroundImageFile}
                onClick={handleBackgroundImageSave}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {activePage.backgroundImageUrl && (
          <Button
            variant="outline"
            onClick={handleRemoveBackground}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Recommended size: 1080x608px. Max file size: 5MB
      </p>
    </div>
  );
};

export default BackgroundSettings;