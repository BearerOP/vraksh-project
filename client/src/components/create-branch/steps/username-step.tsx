"use client";

import { useState, useEffect } from "react";
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
import { useDebounce } from "@/hooks/use-debounce";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { checkUsername } from "@/lib/apis";
import { reservedUsernames } from "@/utils/constant";
import { FormValues } from "../create-branch-form";

interface UsernameStepProps {
  form: UseFormReturn<FormValues>;
}

export default function UsernameStep({ form }: UsernameStepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const username = form.watch("title");
  const debouncedUsername = useDebounce(username, 500);

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
        console.log("Username checked successfully:", res);
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
        <h2 className="text-2xl font-bold">Choose your username</h2>
        <p className="text-muted-foreground">
          This will be your unique branch URL.
        </p>
      </div>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <div className="relative">
              <FormControl>
                <Input placeholder="yourname" {...field} className="pr-10" />
              </FormControl>
              {isChecking && (
                <div className="absolute right-3 top-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
              {!isChecking && isAvailable === true && (
                <div className="absolute right-3 top-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
              {!isChecking && isAvailable === false && (
                <div className="absolute right-3 top-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            <FormDescription>
              vraksh.com/{field.value || "yourname"}
            </FormDescription>
            {!isChecking && isAvailable === false && (
              <p className="text-sm text-red-500 mt-1">
                This username is already taken
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
