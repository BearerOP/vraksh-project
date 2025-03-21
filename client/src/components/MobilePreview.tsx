
import React, { useRef, useState, useEffect } from 'react';
import { Page, Link as LinkType, TemplateType } from '@/context/LinkContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface MobilePreviewProps {
  page: Page;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ page }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [previewHeight, setPreviewHeight] = useState('100%');
  
  useEffect(() => {
    // Dynamically adjust the height based on content with a minimum height
    const adjustHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const minHeight = 500; // Minimum height in pixels
        setPreviewHeight(`${Math.max(contentHeight, minHeight)}px`);
      }
    };
    
    adjustHeight();
    
    // Add window resize listener
    window.addEventListener('resize', adjustHeight);
    
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [page]);
  
  // Ensure URL has protocol
  const normalizeUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  // Get background based on template
  const getBackground = (template: TemplateType, theme: 'light' | 'dark') => {
    switch (template) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-400 to-purple-500';
      case 'dark':
        return 'bg-gray-900';
      case 'minimal':
      case 'rounded':
      case 'default':
      default:
        return theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    }
  };

  // Get link styles based on template
  const getLinkStyles = (template: TemplateType, theme: 'light' | 'dark') => {
    const baseStyles = "block w-full p-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between";
    
    switch (template) {
      case 'minimal':
        return cn(
          baseStyles,
          theme === 'dark' 
            ? 'bg-transparent border border-gray-700 hover:border-gray-600 text-white' 
            : 'bg-transparent border border-gray-300 hover:border-gray-400',
          'rounded-md'
        );
      case 'gradient':
        return cn(
          baseStyles,
          'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white',
          'rounded-lg'
        );
      case 'dark':
        return cn(
          baseStyles,
          'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700',
          'rounded-lg'
        );
      case 'rounded':
        return cn(
          baseStyles,
          theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-gray-100 hover:bg-gray-200',
          'rounded-full'
        );
      case 'default':
      default:
        return cn(
          baseStyles,
          theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-gray-100 hover:bg-gray-200',
          'rounded-xl'
        );
    }
  };

  // Profile image styles based on template
  const getProfileStyles = (template: TemplateType) => {
    const baseStyles = "mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold";
    
    switch (template) {
      case 'minimal':
        return cn(baseStyles, 'w-20 h-20 rounded-md bg-gradient-to-br from-gray-700 to-gray-900');
      case 'gradient':
        return cn(baseStyles, 'w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30');
      case 'dark':
        return cn(baseStyles, 'w-24 h-24 rounded-full bg-gray-800 border border-gray-700');
      case 'rounded':
        return cn(baseStyles, 'w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600');
      case 'default':
      default:
        return cn(baseStyles, 'w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600');
    }
  };

  return (
    <div className="relative min-h-[600px] w-full max-w-[360px] mx-auto">
      {/* Phone frame */}
      <div 
        className="absolute inset-0 border-[14px] border-black rounded-[40px] shadow-xl z-10 pointer-events-none"
        style={{ 
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.12), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
          <div className="w-40 h-6 bg-black rounded-b-xl"></div>
        </div>
      </div>
      
      {/* Screen content */}
      <div 
        className={cn(
          "relative z-0 overflow-hidden rounded-[30px] transition-colors duration-300",
          getBackground(page.template, page.theme),
          page.theme === 'dark' ? 'text-white' : 'text-gray-900'
        )}
        style={{ height: previewHeight }}
      >
        <div ref={contentRef} className="py-16 px-6 flex flex-col items-center">
          {/* Profile header */}
          <div className="mb-8 text-center">
            <div className={getProfileStyles(page.template)}>
              {page.title.charAt(0)}
            </div>
            <h1 className={cn(
              "text-xl font-bold mb-1",
              page.template === 'gradient' && "text-white"
            )}>
              {page.title}
            </h1>
            <p className={cn(
              "text-sm opacity-70",
              page.template === 'gradient' && "text-white/70"
            )}>
              @username
            </p>
          </div>
          
          {/* Links list */}
          <div className="w-full space-y-3">
            {page.links.filter(link => link.active).map((link: LinkType, index: number) => (
              <a
                key={link.id}
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={getLinkStyles(page.template, page.theme)}
                style={{ 
                  animationDelay: `${(index * 0.1).toFixed(1)}s`,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span className="font-medium">{link.title}</span>
                {page.template === 'rounded' ? (
                  <ExternalLink className="h-4 w-4 opacity-60" />
                ) : (
                  <ArrowRight className="h-4 w-4 opacity-60" />
                )}
              </a>
            ))}
            
            {page.links.filter(link => link.active).length === 0 && (
              <div className={cn(
                "text-center py-8",
                page.template === 'gradient' ? "text-white/70" : "opacity-70"
              )}>
                <p>No active links to display</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className={cn(
            "mt-12 pt-6 border-t w-full text-center text-xs",
            page.template === 'gradient' ? "border-white/10 text-white/60" : "opacity-60"
          )}>
            <p>Made with LinkTree Clone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
