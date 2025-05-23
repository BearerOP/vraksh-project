import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BranchItem, SocialIcon, templateConfigs } from "@/utils/types";
import { getBranch } from "@/lib/apis";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Page } from "@/context/LinkContext";
import MobilePreview from "@/components/MobilePreview";

const MobilePreviewPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        interface BranchResponse {
          status: number;
          data: {
            data: {
              _id: string;
              name: string;
              items?: BranchItem[];
              templateId: string;
              imageUrl: string;
              createdAt: string;
              updatedAt: string;
              backgroundImageUrl?: string;
              userId: string;
              description: string;
              socialIcons: SocialIcon[];
              titleColor: string;
              titleFont: string;
              descriptionColor: string;
              descriptionFont: string;
              linkTextColor: string;
              linkBorderSize: string;
              linkBackgroundColor: string;
              buttonTextFont: string;
              avatarRounded: string;
            };
          };
        }

        const response = await getBranch(username) as BranchResponse;
        if (response.status === 200) {
          const data = response.data.data;

          const branch = {
            id: data._id,
            title: data.name,
            links:
              data.items?.map((item: BranchItem) => ({
                id: item._id,
                title: item.title,
                url: item.url,
                active: item.active,
              })) || [],
            templateId: data.templateId,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            backgroundImageUrl: data.backgroundImageUrl,
            userId: data.userId,
            description: data.description,
            socialIcons: data.socialIcons as SocialIcon[],
            titleColor: data.titleColor,
            titleFont: data.titleFont,
            descriptionColor: data.descriptionColor,
            descriptionFont: data.descriptionFont,
            linkTextColor: data.linkTextColor,
            linkBorderSize: data.linkBorderSize,
            linkBackgroundColor: data.linkBackgroundColor,
            buttonTextFont: data.buttonTextFont,
            avatarRounded: data.avatarRounded,
          };

          setPage(branch);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Page not found</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            The link you are trying to preview does not exist.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  console.log("Page data:", page);

  const templateConfig = templateConfigs.find(
    (template) => template.id === page.templateId
  );

  console.log(templateConfig?.className)
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6 ",
        page.backgroundImageUrl ? "bg-cover bg-center" : "bg-neutral-700",
        templateConfig?.className,
        page.backgroundImageUrl && {
          backgroundImage: `url(${templateConfig.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      )}
    // style={{
    //   backgroundImage: page.backgroundImageUrl
    //     ? templateConfig.backgroundImage
    //     : `url(${page.backgroundImageUrl})`,
    //   backgroundSize: page.backgroundImageUrl ? undefined : "cover",
    //   backgroundPosition: page.backgroundImageUrl ? undefined : "center",
    // }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/dashboard")}
        className={cn(
          "absolute top-4 left-4 shadow-lg",
          templateConfig?.linkClass
        )}

      >
        <ChevronLeftIcon className="h-4 w-4 mr" />
        Back to Dashboard
      </Button>

      {/* Phone Container */}
      <div className="scale-105">
        <MobilePreview page={page} />
      </div>

      <div className="mt-8 text-center">
        <div className="flex space-x-4 justify-center">
          {/* <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard/edit/" + page.id)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Edit Page
          </Button> */}
          {/* <Button 
            onClick={() => navigate("/dashboard")}
            className="bg-white text-purple-500 hover:bg-white/90"
          >
            Back to Dashboard
          </Button> */}
          {/* <Button
            variant="outline"
            onClick={() => navigate("/preview/" + page.id)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Preview on Web
          </Button> */}
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-white/60">
        <p>Made with Vraksh</p>
        <p>© {new Date().getFullYear()} Vraksh. All rights reserved.</p>
      </div>
    </div>
  );
};

export default MobilePreviewPage;
