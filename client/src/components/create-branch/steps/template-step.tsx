"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Twitter, Facebook, MapPin } from "lucide-react"

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
  }>
}

const templates = [
  {
    id: "template1",
    name: "Emmy Chen",
    description: "Pet sitter & dog walker",
    color: "bg-[#f8d0c9]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template2",
    name: "Lexie Candis",
    description: "Pastel artist from Melbourne",
    color: "bg-[#e8edf1]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template3",
    name: "Holly Clyde",
    description: "✧ Healers never went out of style ✧",
    color: "bg-[#8b5a3c]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template4",
    name: "Newlove Store",
    description: "Vintage fashion store",
    color: "bg-[#fff2cc]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template5",
    name: "Tranquil",
    description: "Wellness in the desert",
    color: "bg-[#d2c0a0]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template6",
    name: "Tea it Up",
    description: "Bubble tea for all",
    color: "bg-[#e6d7f2]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template7",
    name: "Tatiana Reine",
    description: "Indie pop and indoor plants",
    color: "bg-[#c5d5db]",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "template8",
    name: "Saika Ruslan",
    description: "Reading my way through Brooklyn",
    color: "bg-[#f5f5f5]",
    image: "/placeholder.svg?height=80&width=80",
  },
]

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
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {templates.map((template) => (
                  <FormItem key={template.id}>
                    <FormControl>
                      <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                    </FormControl>
                    <FormLabel htmlFor={template.id} className="cursor-pointer">
                      <Card
                        className={`overflow-hidden border-2 transition-all ${
                          field.value === template.id ? "border-primary" : "border-transparent hover:border-muted"
                        }`}
                      >
                        <CardContent className={`p-0`}>
                          <div className={`${template.color} p-6 flex flex-col items-center text-center h-[300px]`}>
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                              <img
                                src={template.image || "/placeholder.svg"}
                                alt={template.name}
                                className="object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <p className="text-xs mt-1 mb-4">{template.description}</p>
                            <div className="flex space-x-2 mb-4">
                              <Instagram className="h-4 w-4" />
                              <Twitter className="h-4 w-4" />
                              <Facebook className="h-4 w-4" />
                            </div>
                            <div className="bg-white/80 rounded-md py-2 px-4 w-full mb-2 text-xs text-center">
                              My services & rates
                            </div>
                            {template.id === "template4" && (
                              <div className="bg-gray-100 rounded-md p-2 w-full mt-2 flex items-center justify-center">
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
  )
}

