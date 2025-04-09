import React, { useRef, useState, useEffect } from "react";
import { Page, Link as LinkType } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { templateConfigs } from "./TemplateSelector";

// Sample template config
const sampleTemplate = {
  id: "gothic",
  backgroundImage: "/template-bg/bg-07.png",
  className: "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500",
  textClass: "text-white",
  linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg",
  profileClass: "bg-white/30 border border-white/40 text-white",
  titleClass: "text-white font-semibold",
};

export interface MobilePreviewProps {
  page: Page;
  templateConfig?: {
    id: string;
    className: string;
    textClass: string;
    profileClass: string;
    linkClass: string;
    backgroundImage?: string;
    titleClass: string;
  };
}



const MobilePreview: React.FC<MobilePreviewProps> = ({
  page,
  // templateConfig,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  console.log(page, "page in mobile preview");
  
  const templateConfig = templateConfigs.find(
    (template) => template.id === page.templateId
  );

  console.log(templateConfig, "templateConfig in mobile preview");
  

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  // templateConfig = templateConfig || sampleTemplate; // use sample for now

  return (
    <div className="relative w-full max-w-[293px] mx-auto">
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
          templateConfig.className
        )}
        style={{
          height: 525,
          backgroundImage: templateConfig.backgroundImage
            ? `url(${templateConfig.backgroundImage})`
            : undefined,
          backgroundSize: templateConfig.backgroundImage ? "cover" : undefined,
          backgroundPosition: templateConfig.backgroundImage
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
                templateConfig.profileClass
              )}
            >
              {page.imageUrl ? (
                <img
                  src={page?.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                page.title.charAt(0)
              )}
            </div>
            <h1 className={cn("text-sm font-bold", templateConfig.titleClass)}>
              {page.title}
            </h1>
            <p className="text-xs opacity-70">
              @{user?.username || "username"}
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full space-y-3 pb-20">
            {page.links
              .filter((link) => link.active)
              .map((link: LinkType, index: number) => (
                <a
                  key={link.id}
                  href={normalizeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    `w-full p-3 transition-all duration-300 transform hover:scale-[1.02] 
                    active:scale-[0.98] flex items-center justify-between shadow-md text-xs text-center`,
                    templateConfig.linkClass
                  )}
                  style={{
                    animationDelay: `${(index * 0.1).toFixed(1)}s`,
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="font-normal">{link.title}</span>
                  {page.templateId === "rounded" ? (
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  )}
                </a>
              ))}
          </div>

          {/* Footer */}
          <div className="absolute z-[999] bottom-0 pb-4 min-h-16 bg-gradient-to-t from-black via-black/60 to-transparent pt-2 border-t-[1.25] w-full text-center text-xs flex flex-col justify-center gap-1 items-center backdrop-blur-md">
            <Link to="/" className="text-xs text-white">
              <img src="/icon.svg" alt="icon" className="h-4 w-4 shadow-md" />
            </Link>
            <p className="font-bold text-white">VRAKSH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
