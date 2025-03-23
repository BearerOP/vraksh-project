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
  
  const templates: { id: TemplateType; name: string; className: string; textClass: string }[] = [
    { id: 'default', name: 'Default', className: 'bg-gray-100 border-gray-300', textClass: 'text-gray-800' },
    { id: 'minimal', name: 'Minimal', className: 'bg-white border border-gray-200 shadow-sm', textClass: 'text-gray-700 font-light' },
    { id: 'gradient', name: 'Gradient', className: 'bg-gradient-to-br from-blue-400 to-purple-500 text-white', textClass: 'text-white font-medium' },
    { id: 'dark', name: 'Dark', className: 'bg-gray-900 text-white border-gray-700', textClass: 'text-white font-bold' },
    { id: 'rounded', name: 'Rounded', className: 'bg-gray-200 rounded-2xl border-gray-400', textClass: 'text-gray-900 font-semibold' },
    { id: 'glass', name: 'Glassmorphism', className: 'bg-opacity-20 backdrop-blur-lg border border-gray-200', textClass: 'text-gray-800 font-light' },
    { id: 'neon', name: 'Neon', className: 'bg-black border border-neon-pink shadow-neon', textClass: 'text-neon-pink font-bold tracking-wide' },
    { id: 'futuristic', name: 'Futuristic', className: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border-gray-700 shadow-lg', textClass: 'text-white font-extrabold uppercase tracking-widest' },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Template Style</h3>

      {/* Dropdown Selection */}
      <Select value={page.template} onValueChange={handleTemplateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Visual Template Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`
              h-20 w-full rounded-md cursor-pointer transition-all duration-200 border-2 
              flex items-center justify-center text-xs font-medium
              ${page.template === template.id ? 'border-blue-500 shadow-md scale-105' : 'border-gray-300'}
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
