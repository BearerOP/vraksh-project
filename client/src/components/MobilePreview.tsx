import React, { useRef } from "react";
import { Page, Link as LinkType } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, MoreVertical } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { templateConfigs } from "@/utils/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { iconMap } from "./ui/social-icons";

export interface MobilePreviewProps {
  page: Page;
  onDeleteLink?: (id: string) => void;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ page, onDeleteLink }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  console.log("MobilePreview", page);
  

  const templateConfig = templateConfigs.find(
    (template) => template.id === page.templateId
  );

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  // Function to render links based on their style
  const renderLink = (link: LinkType, index: number) => {
    // Check if the link has a style property and if it's "featured"    
    const isFeatured = link.style === "featured";
    
    // If featured style and has image - render featured card
    if (isFeatured && link.imageUrl) {
      return (
        <div 
          key={link.id}
          className={cn(
            "w-full rounded-lg overflow-hidden bg-white shadow-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 animate-slide-up",
            templateConfig?.linkClass
          )}
          style={{
            animationDelay: `${(index * 0.1).toFixed(1)}s`,
            backgroundColor: page.linkBackgroundColor,
            color: page.linkTextColor,
            fontFamily: page.buttonTextFont,
            border: `solid ${page.linkBorderSize}px`,
          }}
        >
          {/* Featured image */}
          <a
            href={normalizeUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className=" relative overflow-hidden">
              <img 
                src={link.imageUrl} 
                alt={link.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </a>
          
          {/* Link details */}
          <div className="p-3">
            <div className="flex items-center max-h-6">
              {/* iconUrl on left */}
              <div className="h-8 w-8 flex-shrink-0 bg-black/5 rounded-md flex items-center justify-center mr-3">
                {link.iconUrl ? (
                  <img src={link.iconUrl} alt={link.title} className="h-5 w-5 object-contain" />
                ) : (
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                )}
              </div>
              
              {/* Text centered */}
              <a 
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-center mx-2"
              >
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-gray-500 opacity-70">
                </p>
              </a>
              
              {/* Vertical ellipsis with dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full flex items-center justify-center" 
                      onClick={() => {
                        navigator.clipboard.writeText(link.url);
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    {onDeleteLink && (
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => onDeleteLink(link.id)}
                      >
                        Delete Link
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Description (only for featured links) */}
            {link.description && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{link.description}</p>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div
        key={link.id}
        className={cn(
          `w-full p-3 transition-all duration-300 transform hover:scale-[1.02] 
          active:scale-[0.98] shadow-md text-xs animate-slide-up rounded-lg`,
          templateConfig?.linkClass
        )}
        style={{
          animationDelay: `${(index * 0.1).toFixed(1)}s`,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          backgroundColor: page.linkBackgroundColor,
          color: page.linkTextColor,
          fontFamily: page.buttonTextFont,
          border: `solid ${page.linkBorderSize}px`,
        }}
      >
        <div className="flex items-center">
          {/* iconUrl on left */}
          <div className="h-8 w-8 flex-shrink-0 bg-black/5 rounded-md flex items-center justify-center mr-3">
            {link.iconUrl ? (
              <img src={link.iconUrl} alt={link.title} className="h-5 w-5 object-contain" />
            ) : (
              <ExternalLink className="h-4 w-4 opacity-60" />
            )}
          </div>
          
          {/* Text centered */}
          <a 
            href={normalizeUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center mx-2"
          >
            <p className="font-medium">{link.title}</p>
          </a>
          
          {/* Vertical ellipsis with dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
              <DialogHeader>
                <DialogTitle>Share Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full flex items-center justify-center" 
                  onClick={() => {
                    navigator.clipboard.writeText(link.url);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                {onDeleteLink && (
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    Delete Link
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-[293px] mx-auto">
      {/* Phone Frame */}
      <div
        style={{
          boxShadow:
            "0 121px 49px #00000005,0 68px 41px #00000014,0 30px 30px #00000024,0 8px 17px #00000029",
        }}
        className={cn(
          "absolute inset-0 border-[8px] rounded-[50px] shadow-2xl z-10 pointer-events-none border-[#ebebeb]"
        )}
      ></div>
      {/* Mobile Preview Content */}
      <div
        className={cn(
          "relative z-0 overflow-hidden rounded-[51px] transition-colors duration-300",
          templateConfig?.className
        )}
        style={{
          height: 525,
          backgroundImage: page.backgroundImageUrl
            ? `url(${page.backgroundImageUrl})`
            : templateConfig?.backgroundImage
            ? `url(${templateConfig.backgroundImage})`
            : undefined,
          backgroundSize:
            page.backgroundImageUrl || templateConfig?.backgroundImage
              ? "cover"
              : undefined,
          backgroundPosition:
            page.backgroundImageUrl || templateConfig?.backgroundImage
              ? "center"
              : undefined,
        }}
      >
        <div
          ref={contentRef}
          className="py-10 px-6 flex flex-col items-center h-full overflow-y-auto"
        >
          {/* Profile Section */}
          <div className="mb-8 text-center">
            <div
              className={cn(
                "mx-auto mb-4 flex items-center justify-center text-2xl font-bold size-16 rounded-full",
                templateConfig?.profileClass
              )}
            >
              {page.imageUrl ? (
                <img
                  src={page?.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover animate-scale-in"
                  style={{
                    borderRadius: page?.avatarRounded,
                  }}
                />
              ) : (
                page.title.charAt(0)
              )}
            </div>
            <h1
              className={cn(
                "text-sm font-bold animate-slide-up",
                templateConfig?.titleClass
              )}
              style={{ color: page.titleColor, fontFamily: page.titleFont }}
            >
              {page.title}
            </h1>
            <p
              className="text-xs opacity-70 animate-slide-up"
              style={{
                color: page.descriptionColor,
                fontFamily: page.descriptionFont,
                animationDelay: "0.1s",
              }}
            >
              {page.description.length > 50
                ? `${page.description.slice(0, 50)}...`
                : page.description}
            </p>
            {page.socialIcons && page.socialIcons.length > 0 && (
              <div
                className="flex justify-center items-center gap-2 mt-1 animate-slide-up bg-transparent"
                style={{ animationDelay: "0.15s" }}
              >
                {page.socialIcons?.map((social, index) => {
                  return (
                    <a
                      key={index}
                      href={normalizeUrl(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity rounded-md p-2 bg-black/10 dark:bg-white/20 backdrop-blur-md shadow-md"
                    >
                      {iconMap[
                        social.name.toLowerCase() as keyof typeof iconMap
                      ] || <ExternalLink size={18} />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links Section - Now using our style-aware rendering */}
          <div className="w-full space-y-3 pb-20">
            {page.links
              .filter((link) => link.active)
              .map((link: LinkType, index: number) => renderLink(link, index))}
          </div>

          {/* Footer */}
          <div className="absolute z-[999] bottom-0 pb-4 min-h-16 bg-gradient-to-t from-black via-black/60 to-transparent pt-2 border-t-[1.25] w-full text-center text-xs flex flex-col justify-center gap-1 items-center backdrop-blur-sm">
            <Link to="/" className="text-xs text-white">
              <img
                src="/icon.svg"
                loading="lazy"
                alt="icon"
                className="h-4 w-4 shadow-md"
              />
            </Link>
            <p className="font-bold text-white">VRAKSH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;