import CreateBranchForm from "@/components/create-branch/create-branch-form";
import { useAuth } from "@/hooks/use-auth";
import { Suspense, useEffect } from "react";

function FormSkeleton() {
    return (
      <div className="space-y-8">
        <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-64 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-12 w-32 ml-auto bg-gray-200 animate-pulse rounded"></div>
      </div>
    )
  }
  
  export default function CreateBranch() {
    
    const { user } = useAuth();
    useEffect(() => {
      if (!user) {
        // window.location.href = import.meta.env.VITE_VRAKSH_URL + "/auth/login";
      }
    }, [user]);

    return (
      <div className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-6">Create New Branch</h1>
        <Suspense fallback={<FormSkeleton />}>
          <CreateBranchForm />
        </Suspense>
      </div>
    )
  }