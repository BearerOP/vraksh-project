import { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Ellipsis, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { iconMap } from "../ui/social-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateBranch } from "@/lib/apis";
import { SocialIcon } from "@/utils/types";


export const ProfileSection = () => {
  const { activePage, updatePage } = useLinks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [title, setTitle] = useState(activePage?.title || "");
  const [description, setDescription] = useState(activePage?.description || "");
  const [loading, setLoading] = useState(false);
  const [selectedSocialIcon, setSelectedSocialIcon] = useState<{ index: number, name: string, url: string, icon: string } | null>(null);


  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const handleSaveDetails = async () => {
    if (!activePage.id) return;

    setLoading(true);
    try {
      const updates: {
        title?: string;
        name?: string,
        description?: string,
        socialIcons?: SocialIcon[],
        templateId?: string,
        imageUrl?: string,
        backgroundImageUrl?: string,
        titleColor?: string,
        descriptionColor?: string,
        linkTextColor?: string,
        linkBorderSize?: string,
        linkBackgroundColor?: string,
        titleFont?: string,
        descriptionFont?: string,
        buttonTextFont?: string,
        avatarRounded?: string,
      } = {};

      // Only add fields that have changed
      if (title !== activePage.title) {
        updates.title = title;
      }

      if (description !== activePage.description) {
        updates.description = description;
      }

      // Only make the API call if there are changes
      if (Object.keys(updates).length > 0) {
        const response = await updateBranch(activePage.id, updates);

        if (response.status !== 200) {
          throw new Error("Failed to update branch profile");
        }

        updatePage(activePage.id, updates);

        toast.success("Branch details updated successfully");
      } else {
        toast.info("No changes to save");
      }

      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update branch details");
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

      // Check if social icons have actually changed
      let socialIconsChanged = false;

      if (!activePage.socialIcons || activePage.socialIcons.length !== updatedSocialIcons.length) {
        socialIconsChanged = true;
      } else {
        // Compare each icon to see if there are changes
        for (let i = 0; i < updatedSocialIcons.length; i++) {
          const original = activePage.socialIcons[i];
          const updated = updatedSocialIcons[i];

          if (original.name !== updated.name ||
            original.url !== updated.url ||
            original.icon !== updated.icon) {
            socialIconsChanged = true;
            break;
          }
        }
      }

      if (socialIconsChanged) {
        const response = await updateBranch(activePage.id, {
          socialIcons: updatedSocialIcons
        });

        if (response.status !== 200) {
          throw new Error("Failed to update social icons");
        }

        updatePage(activePage.id, {
          socialIcons: updatedSocialIcons
        });

        toast.success("Social icons updated successfully");
      } else {
        toast.info("No changes to save");
      }

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

      const response = await updateBranch(activePage.id, {
        socialIcons: updatedSocialIcons
      });

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
    <>
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
    </>
  )
}