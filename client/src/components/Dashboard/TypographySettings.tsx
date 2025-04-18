import React from "react";
import { useLinks } from "@/context/LinkContext";
import { Loader2 } from "lucide-react";

interface TypographySettingsProps {
  pageId: string;
}

const TypographySettings: React.FC<TypographySettingsProps> = ({ pageId }) => {
  const { activePage, updatePage, isUpdating } = useLinks();
  
  // Array of font options
  const fonts = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Poppins",
    "Playfair Display",
    "Merriweather",
    "Lato"
  ];

  if (!activePage) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-medium mb-4">Typography</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title Font */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Title Font
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <select
            value={activePage.titleFont || "Inter"}
            onChange={(e) => updatePage(pageId, { titleFont: e.target.value })}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Description Font */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Description Font
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <select
            value={activePage.descriptionFont || "Inter"}
            onChange={(e) => updatePage(pageId, { descriptionFont: e.target.value })}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Button Text Font */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Button Text Font
            </label>
            {isUpdating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
          <select
            value={activePage.buttonTextFont || "Inter"}
            onChange={(e) => updatePage(pageId, { buttonTextFont: e.target.value })}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TypographySettings;