"use client";

import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Loader2, Upload, X } from "lucide-react";
import { FormValues } from "../create-branch-form";
import { useDebounce } from "@/hooks/use-debounce";
import { checkUsername, cloudinarySign } from "@/lib/apis";
import { reservedUsernames } from "@/utils/constant";
import { toast } from "sonner";

import imageCompression from "browser-image-compression";

// 👇 Lazy load the cropper (if it's a separate component)
import ImageCropper from "@/components/ImageCropper";

interface ProfileStepProps {
  form: UseFormReturn<FormValues>;
}

export default function ProfileStep({ form }: ProfileStepProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(form.getValues("imageUrl") || null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const username = form.watch("name");
  const debouncedUsername = useDebounce(username, 500);
  const initials = username ? username.slice(0, 2).toUpperCase() : "?";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (blob: Blob) => {
    setCroppedImage(blob);
  };

  const handleImageUpload = async () => {
    if (!croppedImage || !username) return;
    setUploading(true);

    try {
      const file = new File([croppedImage], `${username}-profile.jpg`, {
        type: croppedImage.type || "image/jpeg",
      });

      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });

      const publicId = `vraksh/${username}-profile`;
      const sigRes = await cloudinarySign(publicId, "bg_preset");

      const { signature, timestamp, apiKey, cloudName } = sigRes.data as {
        signature: string;
        timestamp: number;
        apiKey: string;
        cloudName: string;
      };

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("upload_preset", "bg_preset");
      formData.append("public_id", publicId);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();

      if (data.secure_url) {
        form.setValue("imageUrl", data.secure_url);
        setImagePreview(data.secure_url);
        setImageFile(null);
        setCroppedImage(null);
        toast.success("Profile image uploaded!");
      } else throw new Error("Cloudinary did not return a secure URL.");
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("imageUrl", "");
    setImageFile(null);
    setCroppedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!form.getValues("description")) {
      form.setValue("description", "this is my bio branch");
    }
  }, [form]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (reservedUsernames.includes(debouncedUsername)) {
        setIsAvailable(false);
        return;
      }

      if (!debouncedUsername || debouncedUsername.length < 3) {
        setIsAvailable(null);
        return;
      }

      setIsChecking(true);
      try {
        const res = await checkUsername(debouncedUsername);
        setIsAvailable(!(res.data as { exists: boolean }).exists);
      } catch (e) {
        console.error("Username check failed:", e);
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkAvailability();
  }, [debouncedUsername]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complete your profile</h2>
        <p className="text-muted-foreground">Add your profile details and image.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <FormLabel className="mb-2">Profile Image</FormLabel>
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={imagePreview || ""} />
              <AvatarFallback className="bg-muted text-2xl">{initials}</AvatarFallback>
            </Avatar>
            {imagePreview && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {imagePreview ? "Change" : "Upload"} Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload & Crop</DialogTitle>
              </DialogHeader>
              {imageFile ? (
                <ImageCropper
                  image={imagePreview}
                  aspect={1}
                  onCropComplete={handleCropComplete}
                />
              ) : (
                <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="upload-input"
                  />
                  <label htmlFor="upload-input" className="cursor-pointer text-muted-foreground">
                    <Upload className="mx-auto mb-2" />
                    Click to upload an image
                  </label>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button
                  disabled={!croppedImage || uploading}
                  onClick={handleImageUpload}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Save Image"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="md:w-2/3 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Branch" {...field} />
                </FormControl>
                <FormDescription>This will be displayed at the top of your branch.</FormDescription>
                {!isChecking && isAvailable === false && username.length >= 3 && (
                  <p className="text-sm text-red-500 mt-1">
                    This branch name is already taken.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell people a bit about yourself or your brand..."
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maximum 160 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
