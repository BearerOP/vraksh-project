import React from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import TemplateSelector from "../TemplateSelector";

interface ThemeSettingsProps {
  pageId: string;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ pageId }) => {
  const { activePage, updatePage } = useLinks();

  if (!activePage) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Theme & Layout</h2>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          <Paintbrush className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>

      {/* Template Selector would go here - this is a placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Theme & Layout</h2>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <Paintbrush className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>

        <TemplateSelector pageId={activePage.id} />
      </div>
    </div>
  );
};

export default ThemeSettings;
