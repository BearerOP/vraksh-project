
import React from 'react';
import { useLinks, TemplateType } from '@/context/LinkContext';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TemplateSelectorProps {
  pageId: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ pageId }) => {
  const { updatePage, pages } = useLinks();
  const page = pages.find(p => p.id === pageId);
  
  if (!page) return null;
  
  const handleTemplateChange = (value: string) => {
    updatePage(pageId, { template: value as TemplateType });
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Template Style</h3>
      <Select
        value={page.template}
        onValueChange={handleTemplateChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="minimal">Minimal</SelectItem>
          <SelectItem value="gradient">Gradient</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="rounded">Rounded</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="grid grid-cols-5 gap-2 mt-4">
        {['default', 'minimal', 'gradient', 'dark', 'rounded'].map((template) => (
          <div 
            key={template}
            className={`
              h-16 rounded-md cursor-pointer transition-all duration-200 border-2
              ${page.template === template ? 'border-blue-500 shadow-sm' : 'border-transparent'}
            `}
            onClick={() => handleTemplateChange(template)}
          >
            <div 
              className={`
                w-full h-full rounded-[3px] flex items-center justify-center text-xs font-medium
                ${template === 'default' ? 'bg-gray-100' : ''}
                ${template === 'minimal' ? 'bg-white border border-gray-200' : ''}
                ${template === 'gradient' ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white' : ''}
                ${template === 'dark' ? 'bg-gray-800 text-white' : ''}
                ${template === 'rounded' ? 'bg-gray-100 rounded-xl' : ''}
              `}
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;
