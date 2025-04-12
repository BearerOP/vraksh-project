"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Instagram, Twitter, Facebook, Snapchat, Youtube, TiktokIcon as TiktokIconComponent } from "./social-icons";
import { FormValues } from "../create-branch-form";

interface SocialsStepProps {
    form: UseFormReturn<FormValues>;
}

export default function SocialsStep({ form }: SocialsStepProps) {
  // Initialize socialIcons if empty
  const initialSocialIcons = form.getValues("socialIcons") || [];
  const [socialIcons, setSocialIcons] = useState(initialSocialIcons);

  // Initialize links if empty
  const initialLinks = form.getValues("links") || [];
  const [links, setLinks] = useState(initialLinks);

  const addLink = () => {
    const newLinks = [...links, { title: "", url: "" }];
    setLinks(newLinks);
    form.setValue("links", newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    form.setValue("links", newLinks);
  };

  const updateSocialIcon = (name: string, url: string) => {
    const existingIndex = socialIcons.findIndex(icon => icon.name === name);
    let newSocialIcons = [...socialIcons];
    
    if (existingIndex >= 0) {
      if (url) {
        newSocialIcons[existingIndex].url = url;
      } else {
        // Remove if URL is empty
        newSocialIcons = newSocialIcons.filter((_, i) => i !== existingIndex);
      }
    } else if (url) {
      // Only add if URL is not empty
      newSocialIcons.push({ name, url });
    }
    
    setSocialIcons(newSocialIcons);
    form.setValue("socialIcons", newSocialIcons);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add your social links</h2>
        <p className="text-muted-foreground">Connect your social media accounts and other links.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel className="flex items-center">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://instagram.com/username" 
                value={socialIcons.find(i => i.name === "instagram")?.url || ""}
                onChange={(e) => updateSocialIcon("instagram", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              <Twitter className="h-4 w-4 mr-2" />X (Twitter)
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://x.com/username" 
                value={socialIcons.find(i => i.name === "twitter")?.url || ""}
                onChange={(e) => updateSocialIcon("twitter", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://facebook.com/username" 
                value={socialIcons.find(i => i.name === "facebook")?.url || ""}
                onChange={(e) => updateSocialIcon("facebook", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              <Snapchat className="h-4 w-4 mr-2" />
              Snapchat
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://snapchat.com/add/username" 
                value={socialIcons.find(i => i.name === "snapchat")?.url || ""}
                onChange={(e) => updateSocialIcon("snapchat", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              <TiktokIconComponent />
              <span className="ml-2">TikTok</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://tiktok.com/@username" 
                value={socialIcons.find(i => i.name === "tiktok")?.url || ""}
                onChange={(e) => updateSocialIcon("tiktok", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="https://youtube.com/c/channel" 
                value={socialIcons.find(i => i.name === "youtube")?.url || ""}
                onChange={(e) => updateSocialIcon("youtube", e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Custom Links</h3>
          <Button type="button" variant="outline" size="sm" onClick={addLink} className="flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Link
          </Button>
        </div>

        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <Input
                placeholder="Link Title"
                value={link.title}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index].title = e.target.value;
                  setLinks(newLinks);
                  form.setValue("links", newLinks);
                }}
                className="mb-2"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="URL (https://...)"
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index].url = e.target.value;
                  setLinks(newLinks);
                  form.setValue("links", newLinks);
                }}
              />
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(index)} className="mt-1">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}