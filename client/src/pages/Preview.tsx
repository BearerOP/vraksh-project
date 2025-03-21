
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLinks, Link, TemplateType } from '@/context/LinkContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const Preview: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { pages } = useLinks();
  const navigate = useNavigate();
  
  // Find the page based on the ID from the URL
  const page = pages.find(p => p.id === pageId);
  
  // Redirect to dashboard if page not found
  useEffect(() => {
    if (!page && pages.length > 0) {
      navigate('/dashboard');
    }
  }, [page, pages, navigate]);
  
  // If the page is still loading or not found, show a loading state
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
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
    const baseStyles = "block w-full p-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between";
    
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
    <div 
      className={cn(
        "min-h-screen flex flex-col items-center",
        getBackground(page.template, page.theme)
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/dashboard')}
        className={cn(
          "absolute top-4 left-4 transition-all duration-200",
          page.template === 'gradient' && "text-white hover:bg-white/10"
        )}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      
      <div className="w-full max-w-md px-6 py-16">
        {/* Profile header */}
        <div className="mb-8 text-center">
          <div 
            className={cn(
              getProfileStyles(page.template),
              "animate-fade-in"
            )}
            style={{ 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' 
            }}
          >
            {page.title.charAt(0)}
          </div>
          <h1 className={cn(
            "text-2xl font-bold mb-1 animate-slide-up",
            page.template === 'gradient' && "text-white"
          )}>
            {page.title}
          </h1>
          <p className={cn(
            "text-sm opacity-70 animate-slide-up",
            page.template === 'gradient' && "text-white/70"
          )} 
            style={{ animationDelay: '0.1s' }}
          >
            @username
          </p>
        </div>
        
        {/* Links list */}
        <div className="w-full space-y-3">
          {page.links.filter(link => link.active).map((link: Link, index: number) => (
            <a
              key={link.id}
              href={normalizeUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                getLinkStyles(page.template, page.theme),
                "animate-slide-up"
              )}
              style={{ 
                animationDelay: `${(index * 0.1 + 0.2).toFixed(1)}s`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="font-medium">{link.title}</span>
              {page.template === 'rounded' ? (
                <ExternalLink className="h-4 w-4 opacity-60" />
              ) : (
                <ExternalLink className="h-4 w-4 opacity-60" />
              )}
            </a>
          ))}
          
          {page.links.filter(link => link.active).length === 0 && (
            <div className={cn(
              "text-center py-12 animate-fade-in",
              page.template === 'gradient' ? "text-white/70" : "opacity-70"
            )}>
              <p>No active links to display</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className={cn(
                  "mt-4",
                  page.template === 'gradient' && "bg-white/10 hover:bg-white/20 text-white border-white/20"
                )}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Add links in dashboard
              </Button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className={cn(
          "mt-12 pt-6 border-t w-full text-center text-xs animate-fade-in",
          page.template === 'gradient' ? "border-white/10 text-white/60" : "opacity-60"
        )} style={{ animationDelay: '0.5s' }}>
          <p>Made with LinkTree Clone</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
