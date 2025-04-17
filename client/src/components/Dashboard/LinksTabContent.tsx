// 4. LinksTabContent Component
import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinksList from "@/components/LinksList";
import LinkForm from "@/components/LinkForm";
import MobilePreview from "@/components/MobilePreview";
import { Ellipsis, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { iconMap } from "../ui/social-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { SocialIcon } from "@/utils/types";
import { updateBranchProfile } from "@/lib/apis";

const LinksTabContent: React.FC = () => {
  const { activePage, updatePage } = useLinks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [title, setTitle] = useState(activePage?.title || "");
  const [description, setDescription] = useState(activePage?.description || "");
  const [loading, setLoading] = useState(false);
  const [selectedSocialIcon, setSelectedSocialIcon] = useState<{ index: number, name: string, url: string, icon: string } | null>(null);

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

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const handleSaveDetails = async () => {
    if (!activePage.id) return;

    setLoading(true);
    try {
      const response = await updateBranchProfile(
        activePage.id,
        title,
        description,
        activePage.socialIcons
      );
      if (response.status !== 200) {
        throw new Error("Failed to update branch profile");
      }

      updatePage(activePage.id, {
        title,
        description
      });

      toast.success("Branch details updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update branch details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSocialIcon = async () => {
    if (!activePage.id || !selectedSocialIcon) return;

    setLoading(true);
    try {
      const updatedSocialIcons = [...(activePage.socialIcons || [])];

      if (selectedSocialIcon.index !== -1) {
        // Edit existing icon
        updatedSocialIcons[selectedSocialIcon.index] = {
          name: selectedSocialIcon.name,
          url: selectedSocialIcon.url,
          icon: selectedSocialIcon.icon
        };
      } else {
        // Add new icon
        updatedSocialIcons.push({
          name: selectedSocialIcon.name,
          url: selectedSocialIcon.url,
          icon: selectedSocialIcon.icon
        });
      }

      const response = await updateBranchProfile(
        activePage.id,
        activePage.title,
        activePage.description,
        updatedSocialIcons
      );

      if (response.status !== 200) {
        throw new Error("Failed to update social icons");
      }

      updatePage(activePage.id, {
        socialIcons: updatedSocialIcons
      });

      toast.success("Social icons updated successfully");
      setIsSocialDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update social icons");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSocialIcon = async () => {
    if (!activePage.id || selectedSocialIcon === null || selectedSocialIcon.index === -1) return;

    setLoading(true);
    try {
      const updatedSocialIcons = [...(activePage.socialIcons || [])];
      updatedSocialIcons.splice(selectedSocialIcon.index, 1);

      const response = await updateBranchProfile(
        activePage.id,
        activePage.title,
        activePage.description,
        updatedSocialIcons
      );

      if (response.status !== 200) {
        throw new Error("Failed to remove social icon");
      }

      updatePage(activePage.id, {
        socialIcons: updatedSocialIcons
      });

      toast.success("Social icon removed successfully");
      setIsSocialDialogOpen(false);
    } catch (error) {
      toast.error("Failed to remove social icon");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = () => {
    setTitle(activePage?.title || "");
    setDescription(activePage?.description || "");
    setIsEditDialogOpen(true);
  };

  const openSocialDialog = (index = -1) => {
    if (index === -1) {
      setSelectedSocialIcon({ index: -1, name: "", url: "", icon: "" });
    } else {
      const social = activePage.socialIcons[index];
      console.log(index,
        social.name,
        social.url,
        social.icon);

      setSelectedSocialIcon({
        index,
        name: social.name,
        url: social.url,
        icon: social.icon
      });
    }
    setIsSocialDialogOpen(true);
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
        <div className="flex items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="border border-muted-foreground/20 size-[80px]">
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
                onClick={openEditDialog}
              >
                @{activePage?.title || "username"}
              </Button>

              <Button
                variant="link"
                className="text-muted-foreground hover:underline-offset-1 p-0 h-auto"
                onClick={openEditDialog}
              >
                {activePage?.description || "Add description"}
              </Button>

              {activePage.socialIcons && activePage.socialIcons.length > 0 && (
                <div
                  className="flex justify-center items-center gap-2 mt-1 bg-transparent"
                  style={{ animationDelay: "0.15s" }}
                >
                  {activePage.socialIcons?.map((social, index) => {
                    return (
                      <a
                        key={index}
                        href={normalizeUrl(social.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity rounded-md p-2 bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-md"
                        onClick={(e) => {
                          e.preventDefault();
                          openSocialDialog(index);
                        }}
                      >
                        {iconMap[
                          social.name.toLowerCase() as keyof typeof iconMap
                        ] || <ExternalLink size={14} />}
                      </a>
                    );
                  })}
                    <a
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity rounded-md p-2 bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-md"
                        onClick={(e) => {
                          e.preventDefault();
                          openSocialDialog();
                        }}
                      >
                        <Ellipsis size={14} />
                      </a>
                </div>
                
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 ml-auto sm:ml-0"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={openEditDialog}>
                <Pencil className="mr-2 size-4" />
                Edit name & bio
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openSocialDialog()}>
                <Pencil className="mr-2 size-4" />
                Add social icon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

      {/* Edit Title/Description Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your branch name and description
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Username</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDetails} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Social Icons Dialog */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSocialIcon?.index === -1 ? "Add Social Icon" : "Edit Social Icon"}
            </DialogTitle>
            <DialogDescription>
              {selectedSocialIcon?.index === -1
                ? "Add a new social media link"
                : "Update your social media link"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="social-name" className="text-sm font-medium">Platform</label>
              <Input
                id="social-name"
                value={selectedSocialIcon?.name || ""}
                onChange={(e) => setSelectedSocialIcon({
                  ...selectedSocialIcon!,
                  name: e.target.value
                })}
                placeholder="e.g. instagram, twitter, linkedin"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-url" className="text-sm font-medium">URL</label>
              <Input
                id="social-url"
                value={selectedSocialIcon?.url || ""}
                onChange={(e) => setSelectedSocialIcon({
                  ...selectedSocialIcon!,
                  url: e.target.value
                })}
                placeholder="Enter URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="social-icon" className="text-sm font-medium">Icon (optional)</label>
              <Input
                id="social-icon"
                value={selectedSocialIcon?.icon || ""}
                onChange={(e) => setSelectedSocialIcon({
                  ...selectedSocialIcon!,
                  icon: e.target.value
                })}
                placeholder="Icon identifier (leave blank to use default)"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {selectedSocialIcon?.index !== -1 && (
              <Button
                variant="destructive"
                onClick={handleRemoveSocialIcon}
                disabled={loading}
                className="mr-auto"
              >
                <Trash2 className="mr-2 size-4" />
                Remove
              </Button>
            )}
            <div>
              <Button
                variant="outline"
                onClick={() => setIsSocialDialogOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSocialIcon}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinksTabContent;
