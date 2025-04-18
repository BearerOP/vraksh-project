"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import UsernameStep from "./steps/username-step";
import TemplateStep from "./steps/template-step";
import SocialsStep from "./steps/socials-step";
import ProfileStep from "./steps/profile-step";
import { Form, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { createBranch } from "@/lib/apis";
import { useLinks } from "@/context/LinkContext";
// Define the form schema
const formSchema = z.object({
  name: z.string().min(3).max(20),
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

  const { setActivePage } = useLinks();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Fetch user data if needed
      // You can use the user object directly if it's already available
      console.log("User data:", user);
    }
  }, [user]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
      console.log("Form submitted:", data);
      const response = await createBranch(data);
      console.log("Response from API:", response);
      if (response.status !== 201) {
        throw new Error("Failed to create branch");
      }
      const responseData = response.data.data;
      setActivePage({
        id: responseData._id,
        title: responseData.name,
        links: responseData.items,
        templateId: responseData.templateId,
        imageUrl: responseData.imageUrl,
        backgroundImageUrl: responseData.backgroundImageUrl,
        description: responseData.description,
        socialIcons: responseData.socialIcons,
        titleColor: responseData.titleColor,
        titleFont: responseData.titleFont,
        descriptionColor: responseData.descriptionColor,
        descriptionFont: responseData.descriptionFont,
        linkTextColor: responseData.linkTextColor,
        linkBorderSize: responseData.linkBorderSize,
        linkBackgroundColor: responseData.linkBackgroundColor,
        buttonTextFont: responseData.buttonTextFont,
        avatarRounded: responseData.avatarRounded,
      });
      navigate(`/dashboard`);
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
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(step + 1)}
                >
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
              <Button
                type="submit"
                onClick={() => {
                  onSubmit(form.getValues());
                }}
                className={step === 1 ? "ml-auto" : ""}
              >
                {step === totalSteps ? "Create Branch" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
