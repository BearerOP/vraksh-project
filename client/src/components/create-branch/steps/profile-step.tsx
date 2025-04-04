import { useEffect, useState, useRef } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"
import { BranchForm } from "@/types/BranchForm"


interface ProfileStepProps {
  form: UseFormReturn<{
    template?: string;
    username?: string;
    socials?: {
      custom?: { title?: string; url?: string }[];
      instagram?: string;
      twitter?: string;
      facebook?: string;
      snapchat?: string;
      tiktok?: string;
      youtube?: string;
      linkedin?: string;
      github?: string;
      website?: string;
    };
    profile?: {
      title?: string;
      bio?: string;
      image?: string;
    };
  }>
}

export default function ProfileStep({ form }: ProfileStepProps) {
  
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const username = form.watch("username")
  const title = form.watch("profile.title")

  // Automatically set profile.title to username if not manually changed
  useEffect(() => {
    if (!title) {
      form.setValue("profile.title", username, { shouldValidate: true })
    }
  }, [username, title, form.setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreviewImage(result)
        form.setValue("profile.image", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPreviewImage(null)
    form.setValue("profile.image", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

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
              <AvatarImage src={previewImage || ""} />
              <AvatarFallback className="bg-muted text-2xl">
                {username?.substring(0, 2).toUpperCase() || "?"}
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
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
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
        </div>

        <div className="md:w-2/3 space-y-4">
          <FormField
            control={form.control}
            name="profile.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Branch" {...field} />
                </FormControl>
                <FormDescription>This will be displayed at the top of your branch.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile.bio"
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
  )
}
