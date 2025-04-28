import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { updateLink as updateLinkApi, deleteLink as deleteLinkApi } from "@/lib/apis";
import { toast } from "sonner";
import {
  Edit,
  Trash2,
  X,
  Check,
  ExternalLink,
  GripVertical,
} from "lucide-react";
import { Link as LinkType } from "@/context/LinkContext";

interface LinkCardProps {
  link: LinkType;
  pageId: string;
  isDragging?: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  pageId,
  isDragging = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(link.title || "");
  const [url, setUrl] = useState(link.url || "");
  const [style, setstyle] = useState(link.style); // 'classic' | 'featured'
  const [isLoading, setIsLoading] = useState(false);

  const { updateLink, deleteLink } = useLinks();

  const handleSave = async () => {
    if (title.trim() && url.trim()) {
      try {
        setIsLoading(true);
        const updatedLink = {
          ...link,
          title,
          url,
          style,
        };

        const response = await updateLinkApi(updatedLink);
        if (response.status !== 200) {
          throw new Error("Failed to update link");
        }

        updateLink(pageId, link.id, { title, url, style });
        setIsEditing(false);
        toast.success("Link updated successfully 🚀");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update link 😞");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setTitle(link.title || "");
    setUrl(link.url || "");
    setstyle(link.style || "classic");
    setIsEditing(false);
  };

  const handleToggleActive = async () => {
    try {
      setIsLoading(true);
      const updatedLink = {
        ...link,
        active: !link.active,
      };

      const response = await updateLinkApi(updatedLink);
      if (response.status !== 200) {
        throw new Error("Failed to toggle link status");
      }

      updateLink(pageId, link.id, { active: !link.active });
      toast.success(`Link ${!link.active ? 'activated' : 'deactivated'} 🎯`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to toggle link status 😢");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const response = await deleteLinkApi(pageId, link.id);
      if (response.status !== 200) {
        throw new Error("Failed to delete link");
      }

      deleteLink(pageId, link.id);
      toast.success("Link deleted successfully 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete link 😬");
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeUrl = (url: string | undefined | null): string => {
    if (!url) return "#";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <Card
      className={cn(
        "overflow-hidden relative transition-all duration-300 group",
        "border border-border hover:shadow-md",
        "transform hover:-translate-y-1",
        !link.active && "opacity-60",
        isDragging && "shadow-lg"
      )}
    >
      {isEditing ? (
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <label htmlFor={`title-${link.id}`} className="text-sm font-medium">
              Title
            </label>
            <Input
              id={`title-${link.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Link title"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`url-${link.id}`} className="text-sm font-medium">
              URL
            </label>
            <Input
              id={`url-${link.id}`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isLoading}
            />
          </div>

          {/* Style Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Style</label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={style === "classic" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setstyle("classic")}
                disabled={isLoading}
              >
                Classic
              </Button>
              <Button
                type="button"
                variant={style === "featured" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setstyle("featured")}
                disabled={isLoading}
              >
                Featured
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              <Check className="h-4 w-4 mr-1" /> {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 cursor-grab">
              <GripVertical className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium line-clamp-1">
                {link.title || "Untitled"}
              </h3>
              <a
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-blue-500 flex items-center gap-1"
              >
                <span className="truncate max-w-[180px]">
                  {link.url || "No URL"}
                </span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <div className="text-xs mt-1 text-muted-foreground italic">
                Style: {link.style || "classic"}
              </div>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity items-center">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Switch
              checked={!!link.active}
              onCheckedChange={handleToggleActive}
              className="scale-75"
              disabled={isLoading}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              className="text-destructive hover:bg-destructive/10"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LinkCard;
