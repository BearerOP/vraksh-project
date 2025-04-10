"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Twitter, Facebook, MapPin } from "lucide-react";
import { templateConfigs } from "@/components/TemplateSelector";
import {
  InstagramIcon,
  SnapchatIcon,
  XIcon,
} from "@/components/ui/social-icons";

interface TemplateStepProps {
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
  }>;
}

const templates = templateConfigs;

export default function TemplateStep({ form }: TemplateStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose a template</h2>
        <p className="text-muted-foreground">Select a style for your branch.</p>
      </div>

      <FormField
        control={form.control}
        name="template"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {templates.map((template) => (
                  <FormItem key={template.id}>
                    <FormControl>
                      <RadioGroupItem
                        value={template.id}
                        id={template.id}
                        className="sr-only"
                      />
                    </FormControl>
                    <FormLabel htmlFor={template.id} className="cursor-pointer">
                      <Card
                        className={` 
                          ${template.className}
                          aspect-[261/441]
                          border-8 overflow-hidden  transition-all duration-300 ease-in-out rounded-[36px] shadow-[0_6px_16px_rgba(0,0,0,0.08),_0_4px_6px_rgba(0,0,0,0.06)] 
                            ${
                              field.value === template.id
                                ? "shadow-[0px_10px_20px_10px_#868686] scale-105 border-blue-200"
                                : "hover:shadow-[0px_10px_15px_10px_rgba(0,0,0,0.2)]"
                            }
                            `}
                      >
                        <CardContent className={`p-0`}>
                          <div
                            className={`${template.className}  p-6 flex flex-col items-center text-center h-screen`}
                            style={{
                              backgroundImage: `url(${template.backgroundImage})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="relative size-8  md:size-16 rounded-full overflow-hidden mb-3">
                              <img
                                src={"placeholder-profile.jpg"}
                                alt={template.name}
                                className="object-cover"
                              />
                            </div>
                            <h3 className={`${template.titleClass}`}>
                              {template.name}
                            </h3>
                            <p
                              className={`${template.subtitleClass} mt-1 mb-4`}
                            >
                              Your description{" "}
                            </p>
                            <div className="flex space-x-2 mb-4">
                              <InstagramIcon />
                              <XIcon />
                              <SnapchatIcon />
                            </div>
                            <div
                              className={`${template.linkClass} py-2 px-4 w-full mb-2 text-xs text-center`}
                            >
                              My services & rates
                            </div>
                            {template.id === "template4" && (
                              <div
                                className={`${template.profileClass} p-2 w-full mt-2 flex items-center justify-center`}
                              >
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="text-xs">Find us</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
