import React, { useState, useEffect } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette, Loader2, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "../ColorPicker";

interface ColorSettingsSectionProps {
  pageId: string;
}

const ColorSettingsSection: React.FC<ColorSettingsSectionProps> = ({ pageId }) => {
  const { activePage, updatePage, isUpdating } = useLinks();
  const [localDescription, setLocalDescription] = useState<string>("");
  
  // Initialize local state from activePage
  useEffect(() => {
    if (activePage?.description !== undefined) {
      setLocalDescription(activePage.description || "");
    }
  }, [activePage?.description]);

  const handleChangeDescription = (value: string) => {
    setLocalDescription(value);
    updatePage(pageId, { description: value });
  };

  if (!activePage) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-medium mb-4">
        Text & Colors
      </h2>

      {/* Bio Text */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">
            Bio Text
          </label>
          {isUpdating && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Saving...</span>
            </div>
          )}
        </div>
        <Textarea
          placeholder="Add a short bio"
          className="resize-none"
          value={localDescription}
          onChange={(e) => handleChangeDescription(e.target.value)}
        />
      </div>

      {/* Color Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Title Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Title Color
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border shadow-sm"
              style={{
                backgroundColor: activePage.titleColor || "#000000",
              }}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Change Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <ColorPicker
                  color={activePage.titleColor || "#000000"}
                  onChange={(color) => updatePage(pageId, { titleColor: color })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Description Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Description Color
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border shadow-sm"
              style={{
                backgroundColor: activePage.descriptionColor || "#6b7280",
              }}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Change Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <ColorPicker
                  color={activePage.descriptionColor || "#6b7280"}
                  onChange={(color) => updatePage(pageId, { descriptionColor: color })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Link Text Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Link Text Color
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border shadow-sm"
              style={{
                backgroundColor: activePage.linkTextColor || "#ffffff",
              }}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Change Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <ColorPicker
                  color={activePage.linkTextColor || "#ffffff"}
                  onChange={(color) => updatePage(pageId, { linkTextColor: color })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Link Background Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Link Background Color
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border shadow-sm"
              style={{
                backgroundColor: activePage.linkBackgroundColor || "#0ea5e9",
              }}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Change Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <ColorPicker
                  color={activePage.linkBackgroundColor || "#0ea5e9"}
                  onChange={(color) => updatePage(pageId, { linkBackgroundColor: color })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Link Border Size */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">
            Link Border Size
          </label>
          {isUpdating && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Saving...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={(activePage.linkBorderSize && parseInt(activePage.linkBorderSize)) || "0"}
            onChange={(e) => updatePage(pageId, { linkBorderSize: e.target.value })}
            className="w-full"
          />
          <span className="min-w-8 text-center">
            {(activePage.linkBorderSize && parseInt(activePage.linkBorderSize)) || "0"}px
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorSettingsSection;