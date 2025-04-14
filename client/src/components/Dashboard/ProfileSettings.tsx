import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ImageCropper from "@/components/ImageCropper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cloudinarySign } from "@/lib/apis";
import imageCompression from "browser-image-compression";

const ProfileSettings: React.FC = () => {
  const { activePage, updatePage } = useLinks();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [croppedProfileImage, setCroppedProfileImage] = useState<Blob | null>(
    null
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileCropComplete = (blob: Blob) => {
    setCroppedProfileImage(blob);
  };


const handleProfileImageSave = async () => {
  if (!croppedProfileImage || !activePage?.id || !activePage?.title) return;

  try {
    // Convert Blob to File
    const croppedFile = new File([croppedProfileImage], "cropped-profile.jpg", {
      type: croppedProfileImage.type || "image/jpeg",
    });

    // Compress the file
    const compressedFile = await imageCompression(croppedFile, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    });

    // Generate Cloudinary publicId
    const publicId = `vraksh/${activePage.title}-profile`;

    // Get signature for secure upload
    const sigRes = await cloudinarySign(publicId, "bg_preset");
    const { signature, timestamp, apiKey, cloudName } = sigRes.data as {
      signature: string;
      timestamp: number;
      apiKey: string;
      cloudName: string;
    };

    // Prepare formData for Cloudinary
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("upload_preset", "bg_preset");
    formData.append("public_id", publicId);

    // Upload to Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await uploadRes.json();

    if (data.secure_url) {
      updatePage(activePage.id, { imageUrl: data.secure_url });
      toast.success("Profile image updated successfully!");
      setProfileImageFile(null);
      setProfileImagePreview(null);
      setCroppedProfileImage(null);
    } else {
      throw new Error("No secure_url returned from Cloudinary.");
    }
  } catch (error) {
    toast.error("Failed to upload profile image");
    console.error("Profile image upload error:", error);
  }
};


  const handleRemoveProfileImage = () => {
    if (activePage?.id) {
      updatePage(activePage.id, { imageUrl: "" });
      toast.success("Profile image removed successfully");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-6">Profile Image</label>
      <div className="flex flex-col items-center gap-4">
        <Avatar
          className="size-48 border border-muted-foreground/20"
          style={{ borderRadius: activePage?.avatarRounded }}
        >
          <AvatarImage src={activePage?.imageUrl} />
          <AvatarFallback>
            {(activePage?.title?.[0] || "") + (activePage?.title?.[1] || "")}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Profile Image</DialogTitle>
                <DialogDescription>
                  Upload and crop your profile picture
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {profileImageFile ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative flex justify-center w-full aspect-square max-w-sm mx-auto border rounded-lg overflow-hidden">
                      <ImageCropper
                        image={profileImagePreview}
                        aspect={1}
                        onCropComplete={handleProfileCropComplete}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setProfileImageFile(null)}
                    >
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="profileImageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                      />
                      <label
                        htmlFor="profileImageUpload"
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
                  disabled={!profileImageFile}
                  onClick={handleProfileImageSave}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {activePage?.imageUrl && (
            <Button variant="outline" onClick={handleRemoveProfileImage}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Recommended size: 400x400px. Max file size: 2MB
      </p>

      {/* Avatar Shape */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Avatar Shape</label>
        <Select
          value={activePage?.avatarRounded}
          onValueChange={(value) =>
            updatePage(activePage.id, {
              avatarRounded: value,
            })
          }
          defaultValue="9999px"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select the avatar shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Square</SelectItem>
            <SelectItem value="4px">Small Curved</SelectItem>
            <SelectItem value="8px">Default</SelectItem>
            <SelectItem value="12px">Curved</SelectItem>
            <SelectItem value="16px">Large Curved</SelectItem>
            <SelectItem value="24px">2XL Curved</SelectItem>
            <SelectItem value="9999px">Circle</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileSettings;
