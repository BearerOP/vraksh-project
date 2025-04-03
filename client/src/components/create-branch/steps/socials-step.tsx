"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { Instagram, Twitter, Facebook, Snapchat, Youtube, TiktokIcon as TiktokIconComponent } from "./social-icons"

interface SocialsStepProps {
  form: UseFormReturn<any>
}

// Custom TikTok icon since it's not in Lucide
// function TiktokIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
//     </svg>
//   );
// }

export default function SocialsStep({ form }: SocialsStepProps) {
  const [customLinks, setCustomLinks] = useState<{ title: string; url: string }[]>(
    form.getValues("socials.custom") || [],
  )

  const addCustomLink = () => {
    const newCustomLinks = [...customLinks, { title: "", url: "" }]
    setCustomLinks(newCustomLinks)
    form.setValue("socials.custom", newCustomLinks)
  }

  const removeCustomLink = (index: number) => {
    const newCustomLinks = customLinks.filter((_, i) => i !== index)
    setCustomLinks(newCustomLinks)
    form.setValue("socials.custom", newCustomLinks)
  }

  const updateCustomLink = (index: number, field: "title" | "url", value: string) => {
    const newCustomLinks = [...customLinks]
    newCustomLinks[index][field] = value
    setCustomLinks(newCustomLinks)
    form.setValue("socials.custom", newCustomLinks)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add your social links</h2>
        <p className="text-muted-foreground">Connect your social media accounts and other links.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="socials.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Twitter className="h-4 w-4 mr-2" />X (Twitter)
                </FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </FormLabel>
                <FormControl>
                  <Input placeholder="username or page" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials.snapchat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Snapchat className="h-4 w-4 mr-2" />
                  Snapchat
                </FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials.tiktok"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <TiktokIconComponent />
                  <span className="ml-2">TikTok</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials.youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube
                </FormLabel>
                <FormControl>
                  <Input placeholder="channel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Custom Links</h3>
          <Button type="button" variant="outline" size="sm" onClick={addCustomLink} className="flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Link
          </Button>
        </div>

        {customLinks.map((link, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <Input
                placeholder="Link Title"
                value={link.title}
                onChange={(e) => updateCustomLink(index, "title", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="URL (https://...)"
                value={link.url}
                onChange={(e) => updateCustomLink(index, "url", e.target.value)}
              />
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => removeCustomLink(index)} className="mt-1">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

