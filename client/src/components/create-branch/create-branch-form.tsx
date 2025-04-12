"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import UsernameStep from "./steps/username-step";
import TemplateStep from "./steps/template-step";
import SocialsStep from "./steps/socials-step";
import ProfileStep from "./steps/profile-step";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(3).max(20),
  templateId: z.string(),
  socialIcons: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    })
  ),
  links: z.array(
    z.object({
      title: z.string().min(1).max(50),
      url: z.string().url(),
    })
  ),
  imageUrl: z.string().url().optional(),
  userId: z.string(),
  description: z.string().max(160).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function CreateBranchForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      templateId: "",
      socialIcons: [],
      links: [],
      imageUrl: "",
      userId: user?._id || "",
      description: "",
    },
  });

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormValues) => {
    if (step < totalSteps) {
      nextStep();
      return;
    }

    try {
      // Here you would submit the data to your API
      console.log("Form submitted:", data);

      // Redirect to the new branch
      navigate(`/${data.title}`);
    } catch (error) {
      console.error("Error creating branch:", error);
    }
  };

  const progress = (step / totalSteps) * 100;
  console.log("Current Step:", step);
  
  console.log("Form Values:", form.getValues());

  return (
    <FormProvider {...form}>

    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
            {step < totalSteps && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setStep(step + 1)}>
                Skip
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
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
            <Button type="submit" onClick={() => {
              onSubmit(form.getValues());
            }} className={step === 1 ? "ml-auto" : ""}>
              {step === totalSteps ? "Create Branch" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>

    </FormProvider>

  );
}