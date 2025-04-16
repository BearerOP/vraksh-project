import { useEffect, useState, useRef } from "react";
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
import { Loader2, Upload, X } from "lucide-react";
import { FormValues } from "../create-branch-form";
import { useDebounce } from "@/hooks/use-debounce";
import { checkUsername } from "@/lib/apis";
import { reservedUsernames } from "@/utils/constant";

interface ProfileStepProps {
  form: UseFormReturn<FormValues>;
}

export default function ProfileStep({ form }: ProfileStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    form.getValues("imageUrl") || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const username = form.watch("name");
  const debouncedUsername = useDebounce(username, 500);
  const initials = username ? username.slice(0, 2).toUpperCase() : "?";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        form.setValue("imageUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    form.setValue("imageUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const checkUsernameAvailability = async () => {
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
        const available = (res.data as { exists: boolean }).exists === false;
        setIsAvailable(available);
      } catch (error) {
        console.error("Error checking username:", error);
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complete your profile</h2>
        <p className="text-muted-foreground">
          Add your profile details and image.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image Section */}
        <div className="md:w-1/3 flex flex-col items-center">
          <FormLabel className="mb-2">Profile Image</FormLabel>
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewImage || ""} />
              <AvatarFallback className="bg-muted text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            {previewImage && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {!previewImage && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          )}
        </div>

        {/* Form Inputs */}
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
                <FormDescription>
                  This will be displayed at the top of your branch.
                </FormDescription>
                {!isChecking &&
                  isAvailable === false &&
                  username.length >= 3 && (
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
