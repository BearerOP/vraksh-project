// import MobilePreview from "@/components/MobilePreview";
// import TemplateSelector from "@/components/TemplateSelector";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { TemplateType, useLinks } from "@/context/LinkContext";
// import { checkUsername } from "@/lib/apis";
// import { Palette } from "lucide-react";
// import React, { useState } from "react";

import CreateBranchForm from "@/components/create-branch/create-branch-form";
import { Suspense } from "react";

// export default function CreateBranch() {
//   const [username, setUsername] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [exists, setExists] = useState<boolean>(true);
//   //   const { pages, activePage, setActivePage, addPage, updatePage, deletePage } = useLinks();

//   useState(() => {
//     async function checkUsernameExistence() {
//       try {
//         const res = await checkUsername(username);
//         if (res.status === 200) {
//           const data = (await res.data) as {
//             exists: boolean;
//             success: boolean;
//             message: string;
//           };
//           console.log("Username checked successfully:", data);
//           console.log(data);
//           setExists(data.exists);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     }
//     checkUsernameExistence();
//   });
//   const activePage = {
//     id: "1",
//     title: "myPersonalLinks",
//     links: [
//       {
//         id: "1",
//         title: "Portfolio",
//         url: "https://example.com/portfolio",
//         active: true,
//       },
//       { id: "2", title: "LinkedIn", url: "https://linkedin.com", active: true },
//       { id: "3", title: "Twitter", url: "https://twitter.com", active: true },
//       { id: "1743515869079", title: "dscdhdj", url: "jghjhjds", active: true },
//       { id: "1743516019785", title: "sggf", url: "fdgddfgd", active: true },
//       { id: "1743516027337", title: "dfgdfgf", url: "fgfdg", active: true },
//     ],
//     theme: "light" as "light" | "dark",
//     accentColor: "#0ea5e9",
//     template: "default" as TemplateType,
//     image: "https://images.unsplash.com/photo-1630480003494-4b3b3b3b3b3b",
//   };

//   return (
//     <>
//       {exists ? (
//         <div className="text-green-500">Username is available</div>
//       ) : (
//         <div className="text-red-500">Username is not available</div>
//       )}
//       <Input
//         placeholder="Enter your username"
//         className="w-full"
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       {isLoading && <p>Loading...</p>}
//       {exists && <p>Username is available</p>}
//       {!exists && <p>Username is not available</p>}
//       <button onClick={() => setUsername("")}>Clear</button>
//       <button onClick={() => setIsLoading(true)}>Check</button>
//       <button onClick={() => setExists(true)}>Reset</button>

//       <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-medium">Appearance</h2>
//             <Button variant="ghost" size="sm" className="text-muted-foreground">
//               <Palette className="h-4 w-4 mr-2" />
//               Customize
//             </Button>
//           </div>

//           <TemplateSelector pageId={"1"} />
//         </div>

//         <div className="hidden lg:block">
//           <div className="sticky top-28">
//             <MobilePreview page={activePage} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


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
    return (
      <div className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-6">Create New Branch</h1>
        <Suspense fallback={<FormSkeleton />}>
          <CreateBranchForm />
        </Suspense>
      </div>
    )
  }