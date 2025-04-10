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
    <div className="space-y-6 flex flex-col items-center md:items-start">
      <div>
        <h2 className="text-2xl font-bold">Choose a template</h2>
        <p className="text-muted-foreground">Select a style for your branch.</p>
      </div>

      <FormField
        control={form.control}
        name="template"
        render={({ field }) => (
          <FormItem className="space-y-3 mx-auto w-full">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 gap-y-12 "
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
                          border-[10px] overflow-hidden  transition-all duration-300 ease-in-out rounded-[36px] shadow-[0_6px_16px_rgba(0,0,0,0.08),_0_4px_6px_rgba(0,0,0,0.06)] 
                          max-h-[425px]
                          mx-auto
                            ${
                              field.value === template.id
                                ? "shadow-[0px_10px_20px_10px_#868686] scale-105 border-blue-200"
                                : "hover:shadow-[0px_10px_15px_10px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
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
                            <div className="relative size-16 rounded-full overflow-hidden mb-1 md:mb-2">
                              <img
                                src={
                                  "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/vraksh%2Fplaceholder-profile.jpg?alt=media&token=6da1c298-4481-4596-bd7b-95c20b26fd31"
                                }
                                alt={template.name}
                                className="object-cover"
                                loading="lazy"
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
                            <div className="flex space-x-2 mb-4 ">
                            <div className="transform scale-75 sm:scale-90 md:scale-100">
                                <InstagramIcon />
                              </div>
                              <div className="transform scale-75 sm:scale-90 md:scale-100">
                                <XIcon />
                              </div>
                              <div className="transform scale-75 sm:scale-90 md:scale-100">
                                <SnapchatIcon />
                              </div>
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
