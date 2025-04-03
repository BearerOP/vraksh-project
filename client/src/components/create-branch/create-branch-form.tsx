"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import UsernameStep from "./steps/username-step"
import TemplateStep from "./steps/template-step"
import SocialsStep from "./steps/socials-step"
import ProfileStep from "./steps/profile-step"
import { useNavigate } from "react-router-dom"

// Define the form schema
const formSchema = z.object({
  username: z.string().min(3).max(20),
  template: z.string(),
  socials: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    snapchat: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    custom: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
  }),
  profile: z.object({
    title: z.string().min(1).max(50),
    bio: z.string().max(160).optional(),
    image: z.string().optional(),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateBranchForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1)
  const totalSteps = 4

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      template: "",
      socials: {
        instagram: "",
        twitter: "",
        facebook: "",
        snapchat: "",
        custom: [],
      },
      profile: {
        title: "",
        bio: "",
        image: "",
      },
    },
  })

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: FormValues) => {
    if (step < totalSteps) {
      nextStep()
      return
    }

    try {
      // Here you would submit the data to your API
      console.log("Form submitted:", data)

      // Redirect to the new branch
      navigate(`/${data.username}`)
    } catch (error) {
      console.error("Error creating branch:", error)
    }
  }

  const progress = (step / totalSteps) * 100
  // console.log("Progress:", progress)
  // console.log("Step:", step)
  // console.log("Total Steps:", totalSteps);
  console.log("Form Values:", form.getValues())
  // console.log("Form State:", form.formState);
  // console.log("Form Errors:", form.formState.errors);
  // console.log("Form is Valid:", form.formState.isValid);
  // console.log("Form is Dirty:", form.formState.isDirty);
  // console.log("Form is Submitted:", form.formState.isSubmitted);
  // console.log("Form is Submit Successful:", form.formState.isSubmitSuccessful);
  

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Progress value={progress} className="w-full max-w-md" />
        {step < totalSteps && (
          <Button variant="ghost" onClick={() => setStep(step + 1)}>
            Skip
          </Button>
        )}
      </div>

      <FormProvider {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    {step === 1 && <UsernameStep form={form} />}
    {step === 2 && <TemplateStep form={form} />}
    {step === 3 && <SocialsStep form={form} />}
    {step === 4 && <ProfileStep form={form} />}

    <div className="flex justify-between pt-4">
      {step > 1 && (
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
      )}
      <Button type="submit" className="ml-auto" onClick={nextStep}>
        {step === totalSteps ? "Create Branch" : "Next"}
      </Button>
    </div>
  </form>
</FormProvider>
    </div>
  )
}


