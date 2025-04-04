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

// Expanded template configuration interface
export interface TemplateConfig {
  id: TemplateType;
  name: string;
  className: string;
  textClass: string;
  linkClass: string;
  profileClass: string;
  titleClass: string;
  subtitleClass: string;
}

export const templateConfigs: TemplateConfig[] = [
  { 
    id: 'default', 
    name: 'Default', 
    className: 'bg-gray-100 border-gray-300', 
    textClass: 'text-gray-800',
    linkClass: 'bg-white hover:bg-gray-100 border border-gray-200 rounded-xl',
    profileClass: 'bg-blue-500 text-white',
    titleClass: 'text-gray-900 font-semibold',
    subtitleClass: 'text-gray-600'
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    className: 'bg-white border border-gray-200 shadow-sm', 
    textClass: 'text-gray-700',
    linkClass: 'bg-transparent border border-gray-300 hover:bg-gray-50 rounded-md',
    profileClass: 'bg-gray-200 text-gray-800',
    titleClass: 'text-gray-900 font-light',
    subtitleClass: 'text-gray-500'
  },
  { 
    id: 'gradient', 
    name: 'Gradient', 
    className: 'bg-gradient-to-br from-blue-400 to-purple-500 text-white', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-medium',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'dark', 
    name: 'Dark', 
    className: 'bg-gray-900 text-white border-gray-700', 
    textClass: 'text-white',
    linkClass: 'bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg',
    profileClass: 'bg-gray-800 border border-gray-700 text-white',
    titleClass: 'text-white font-bold',
    subtitleClass: 'text-gray-400'
  },
  { 
    id: 'rounded', 
    name: 'Rounded', 
    className: 'bg-gray-200 rounded-2xl border-gray-400', 
    textClass: 'text-gray-900',
    linkClass: 'bg-white hover:bg-gray-100 rounded-full',
    profileClass: 'bg-gray-300 text-gray-800',
    titleClass: 'text-gray-900 font-semibold',
    subtitleClass: 'text-gray-600'
  },
  { 
    id: 'glass', 
    name: 'Glassmorphism', 
    className: 'bg-white/10 backdrop-blur-lg border border-black/20', 
    textClass: 'text-gray-900',
    linkClass: 'bg-white/30 hover:bg-white/40 backdrop-blur-md rounded-xl',
    profileClass: 'bg-white/30 backdrop-blur-md border border-white/40 text-gray-900',
    titleClass: 'text-gray-900 font-medium',
    subtitleClass: 'text-gray-700'
  },
  { 
    id: 'neon', 
    name: 'Neon', 
    className: 'bg-black border border-neon-pink', 
    textClass: 'text-neon-pink',
    linkClass: 'bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink rounded-lg',
    profileClass: 'bg-neon-pink/20 border border-neon-pink text-neon-pink',
    titleClass: 'text-neon-pink font-bold tracking-wide',
    subtitleClass: 'text-neon-pink/70'
  },
  { 
    id: 'futuristic', 
    name: 'Futuristic', 
    className: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-extrabold uppercase tracking-widest',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'pastel', 
    name: 'Pastel', 
    className: 'bg-pink-100 border-pink-300', 
    textClass: 'text-pink-800',
    linkClass: 'bg-white hover:bg-pink-50 border border-pink-200 rounded-xl',
    profileClass: 'bg-pink-200 text-pink-900',
    titleClass: 'text-pink-900 font-medium',
    subtitleClass: 'text-pink-700'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    className: 'bg-black text-neon-green border-neon-green', 
    textClass: 'text-neon-green',
    linkClass: 'bg-neon-green/10 hover:bg-neon-green/20 border border-neon-green rounded-lg',
    profileClass: 'bg-neon-green/20 border border-neon-green text-neon-green',
    titleClass: 'text-neon-green font-extrabold uppercase',
    subtitleClass: 'text-neon-green/70'
  },
  { 
    id: 'vintage', 
    name: 'Vintage', 
    className: 'bg-yellow-100 border-yellow-400', 
    textClass: 'text-yellow-800',
    linkClass: 'bg-white hover:bg-yellow-50 border border-yellow-200 rounded-xl',
    profileClass: 'bg-yellow-200 text-yellow-900',
    titleClass: 'text-yellow-900 font-serif italic',
    subtitleClass: 'text-yellow-700'
  },
  { 
    id: 'aesthetic', 
    name: 'Aesthetic', 
    className: 'bg-gradient-to-br from-pink-300 to-purple-400 border-pink-400', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-semibold',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'wood', 
    name: 'Wood', 
    className: 'bg-wood-pattern border-brown-700', 
    textClass: 'text-brown-900',
    linkClass: 'bg-white hover:bg-brown-50 border border-brown-200 rounded-xl',
    profileClass: 'bg-brown-200 text-brown-900',
    titleClass: 'text-brown-900 font-bold',
    subtitleClass: 'text-brown-700'
  },
  { 
    id: 'ocean', 
    name: 'Ocean', 
    className: 'bg-gradient-to-b from-blue-500 to-teal-400 border-teal-500', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-medium',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'retro', 
    name: 'Retro', 
    className: 'bg-orange-300 border-orange-500 shadow-md', 
    textClass: 'text-orange-900',
    linkClass: 'bg-white hover:bg-orange-50 border border-orange-200 rounded-xl',
    profileClass: 'bg-orange-200 text-orange-900',
    titleClass: 'text-orange-900 font-bold',
    subtitleClass: 'text-orange-700'
  },
  { 
    id: 'holographic', 
    name: 'Holographic', 
    className: 'bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white shadow-xl', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-extrabold',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'monochrome', 
    name: 'Monochrome', 
    className: 'bg-gray-50 border-gray-500 text-gray-900', 
    textClass: 'text-gray-700',
    linkClass: 'bg-white hover:bg-gray-100 border border-gray-200 rounded-xl',
    profileClass: 'bg-gray-200 text-gray-800',
    titleClass: 'text-gray-900 font-semibold',
    subtitleClass: 'text-gray-600'
  },
  { 
    id: 'lava', 
    name: 'Lava', 
    className: 'bg-gradient-to-br from-red-600 to-orange-500 text-white', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-bold uppercase',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'matrix', 
    name: 'Matrix', 
    className: 'bg-black border border-green-500 text-green-400', 
    textClass: 'text-green-400',
    linkClass: 'bg-green-400/10 hover:bg-green-400/20 border border-green-400 rounded-lg',
    profileClass: 'bg-green-400/20 border border-green-400 text-green-400',
    titleClass: 'text-green-400 font-mono uppercase',
    subtitleClass: 'text-green-400/70'
  },
  { 
    id: 'winter', 
    name: 'Winter', 
    className: 'bg-blue-100 border-blue-300', 
    textClass: 'text-blue-800',
    linkClass: 'bg-white hover:bg-blue-50 border border-blue-200 rounded-xl',
    profileClass: 'bg-blue-200 text-blue-900',
    titleClass: 'text-blue-900 font-medium',
    subtitleClass: 'text-blue-700'
  },
  { 
    id: 'golden', 
    name: 'Golden', 
    className: 'bg-yellow-500 border-yellow-700 text-yellow-900 shadow-lg', 
    textClass: 'text-yellow-900',
    linkClass: 'bg-white hover:bg-yellow-50 border border-yellow-200 rounded-xl',
    profileClass: 'bg-yellow-600 text-white',
    titleClass: 'text-yellow-900 font-bold uppercase',
    subtitleClass: 'text-yellow-800'
  },
  { 
    id: 'metallic', 
    name: 'Metallic', 
    className: 'bg-gradient-to-br from-gray-400 to-gray-600 text-white', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-semibold',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'comic', 
    name: 'Comic', 
    className: 'bg-yellow-200 border-black shadow-lg text-black', 
    textClass: 'text-black',
    linkClass: 'bg-white hover:bg-yellow-100 border border-black rounded-xl',
    profileClass: 'bg-yellow-300 text-black',
    titleClass: 'text-black font-comic',
    subtitleClass: 'text-gray-700'
  },
  { 
    id: 'gothic', 
    name: 'Gothic', 
    className: 'bg-black text-red-500 border-red-700', 
    textClass: 'text-red-500',
    linkClass: 'bg-red-500/10 hover:bg-red-500/20 border border-red-500 rounded-lg',
    profileClass: 'bg-red-500/20 border border-red-500 text-red-500',
    titleClass: 'text-red-500 font-blackletter',
    subtitleClass: 'text-red-500/70'
  },
  { 
    id: 'sunset', 
    name: 'Sunset', 
    className: 'bg-gradient-to-r from-pink-500 via-red-500 to-orange-500', 
    textClass: 'text-white',
    linkClass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg',
    profileClass: 'bg-white/30 border border-white/40 text-white',
    titleClass: 'text-white font-semibold',
    subtitleClass: 'text-white/80'
  },
  { 
    id: 'forest', 
    name: 'Forest', 
    className: 'bg-green-900 border-green-700 text-green-300', 
    textClass: 'text-green-300',
    linkClass: 'bg-green-300/10 hover:bg-green-300/20 border border-green-300 rounded-lg',
    profileClass: 'bg-green-300/20 border border-green-300 text-green-300',
    titleClass: 'text-green-300 font-semibold uppercase',
    subtitleClass: 'text-green-300/70'
  },
  { 
    id: 'vaporwave', 
    name: 'Vaporwave', 
    className: 'bg-gradient-to-r from-purple-600 to-pink-500 text-pink-200', 
    textClass: 'text-pink-200',
    linkClass: 'bg-pink-200/10 hover:bg-pink-200/20 border border-pink-200 rounded-lg',
    profileClass: 'bg-pink-200/20 border border-pink-200 text-pink-200',
    titleClass: 'text-pink-200 font-mono uppercase',
    subtitleClass: 'text-pink-200/70'
  },
  { 
    id: 'royal', 
    name: 'Royal', 
    className: 'bg-purple-800 border-gold text-gold-500 shadow-xl', 
    textClass: 'text-gold-500',
    linkClass: 'bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500 rounded-lg',
    profileClass: 'bg-gold-500/20 border border-gold-500 text-gold-500',
    titleClass: 'text-gold-500 font-serif font-bold uppercase',
    subtitleClass: 'text-gold-500/70'
  },
];

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

      {/* Dropdown Selection */}
      <Select value={page.template} onValueChange={handleTemplateChange}>
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