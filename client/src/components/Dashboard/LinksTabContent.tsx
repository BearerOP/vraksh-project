import React from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import LinksList from "@/components/LinksList";
import LinkForm from "@/components/LinkForm";
import MobilePreview from "@/components/MobilePreview";
import { ProfileSection } from "@/components/LinksTabContent/ProfileSection";

const LinksTabContent: React.FC = () => {
  const { activePage, updatePage } = useLinks();

  const handleCopyLink = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Vraksh Url copied!", {
          description: `Copied: ${url}`,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  console.log("activePage", activePage);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Links Management Section */}
      <div className="lg:col-span-2 space-y-4 px-4 md:px-8 py-6 order-2 lg:order-1">
        {/* Notification Card */}
        <Card className="mb-6 border-none shadow-lg rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-100">
          <CardHeader className="pb-0 sm:pb-6">
            <CardTitle className="text-sm font-medium">
              Your Vraksh is live:{" "}
              <Link
                className="underline text-muted-foreground"
                to={`/${activePage.title}`}
              >
                {import.meta.env.VITE_VRAKSH_DOMAIN}/{activePage.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 sm:pt-6">
            <Button
              onClick={() => {
                handleCopyLink(
                  `${import.meta.env.VITE_VRAKSH_DOMAIN == "localhost"
                    ? import.meta.env.VITE_VRAKSH_APP_URL
                    : import.meta.env.VITE_VRAKSH_DOMAIN
                  }/${activePage.title}`
                );
              }}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto rounded-2xl text-base hover:bg-emerald-50 transition-all duration-300"
            >
              Claim your Vraksh URL
            </Button>
          </CardContent>
        </Card>

        {/* Profile Section */}
       <ProfileSection/>

        {/* Links Section */}
        <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Links</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              Reorder
            </Button>
          </div>
          
          <LinkForm pageId={activePage.id} />

          {activePage?.links?.length > 0 ? (
            <LinksList pageId={activePage.id} links={activePage.links} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No links added yet. Add your first link below.</p>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Preview */}
      <div className=" lg:block order-1 lg:order-2 lg:mr-6">
        <div className="sticky top-24">
          <h3 className="text-lg font-medium mb-4 text-center">Preview</h3>
          <MobilePreview page={activePage} />
        </div>
      </div>
    </div>
  );
};

export default LinksTabContent;
