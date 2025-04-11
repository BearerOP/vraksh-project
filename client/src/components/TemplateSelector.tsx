import React from "react";
import { useLinks } from "@/context/LinkContext";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templateConfigs } from "@/types/types";

interface TemplateSelectorProps {
  pageId: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ pageId }) => {
  const { updatePage, pages } = useLinks();
  const page = pages.find((p) => p.id === pageId);

  if (!page) return null;

  const handleTemplateChange = (value: string) => {
    updatePage(pageId, { templateId: value });
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Template Style</h3>

      {/* Dropdown Selection */}
      <Select value={page.templateId} onValueChange={handleTemplateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templateConfigs.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Visual Template Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {templateConfigs.map((template) => (
          <div
            key={template.id}
            className={`
              h-20 w-full rounded-md cursor-pointer transition-all duration-200 border-2 
              flex items-center justify-center text-xs font-medium
              ${
                page.templateId === template.id
                  ? "border-blue-500 shadow-md scale-105"
                  : "border-gray-300"
              }
              hover:border-blue-400 hover:shadow-lg transform hover:scale-105
              ${template.className}
            `}
            onClick={() => handleTemplateChange(template.id)}
          >
            <span className={`text-sm ${template.textClass}`}>
              {template.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;
