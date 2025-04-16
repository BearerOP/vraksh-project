// 4. LinksTabContent Component
import React from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinksList from "@/components/LinksList";
import LinkForm from "@/components/LinkForm";
import MobilePreview from "@/components/MobilePreview";
import { Ellipsis, InstagramIcon, Linkedin, Mail, Twitter } from "lucide-react";

const LinksTabContent: React.FC = () => {
  const { activePage } = useLinks();

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
                  `${
                    import.meta.env.VITE_VRAKSH_DOMAIN == "localhost"
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
        <div className="flex items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="border border-muted-foreground/20 size-14">
              <AvatarImage src={activePage?.imageUrl} />
              <AvatarFallback>
                {(activePage?.title?.[0] || "") +
                  (activePage?.title?.[1] || "")}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 items-start">
              <Button
                variant="link"
                className="text-black underline p-0 h-auto"
              >
                @{activePage?.title || "username"}
              </Button>

              <Button
                variant="link"
                className="text-muted-foreground hover:underline-offset-1 p-0 h-auto"
              >
                {activePage?.description || "Add description"}
              </Button>

              <div className="flex flex-wrap gap-2 mt-1">
                <Button
                  variant="link"
                  className="text-muted-foreground p-0 h-auto"
                  aria-label="instagram"
                >
                  <InstagramIcon />
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground p-0 h-auto"
                  aria-label="snapchat"
                >
                  <Mail />
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground p-0 h-auto"
                  aria-label="twitter"
                >
                  <Twitter />
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground p-0 h-auto"
                  aria-label="linkedin"
                >
                  <Linkedin />
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground p-0 h-auto"
                  aria-label="more"
                >
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 ml-auto sm:ml-0"
            onClick={() => {}}
          >
            <Ellipsis />
          </Button>
        </div>

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

          {activePage?.links?.length > 0 ? (
            <LinksList pageId={activePage.id} links={activePage.links} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No links added yet. Add your first link below.</p>
            </div>
          )}

          <LinkForm pageId={activePage.id} />
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
