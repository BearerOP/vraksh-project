import React, { useRef, useState, useEffect } from "react";
import { Page, Link as LinkType } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { templateConfigs } from "@/utils/types";
export interface MobilePreviewProps {
  page: Page;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ page }) => {
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
          templateConfig.className
        )}
        style={{
          height: 525,
          backgroundImage: page.backgroundImageUrl
            ? `url(${page.backgroundImageUrl})`
            : templateConfig.backgroundImage
            ? `url(${templateConfig.backgroundImage})`
            : undefined,
          backgroundSize:
            page.backgroundImageUrl || templateConfig.backgroundImage
              ? "cover"
              : undefined,
          backgroundPosition:
            page.backgroundImageUrl || templateConfig.backgroundImage
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
                  style={{
                    borderRadius: page?.avatarRounded,
                  }}
                />
              ) : (
                page.title.charAt(0)
              )}
            </div>
            <h1
              className={cn("text-sm font-bold", templateConfig.titleClass)}
              style={{ color: page.titleColor, fontFamily: page.titleFont }}
            >
              {page.title}
            </h1>
            <p className="text-xs opacity-70" style={
              { color: page.descriptionColor, fontFamily: page.descriptionFont }
            }>
              {page.description.length > 50
                ? `${page.description.slice(0, 50)}...`
                : page.description}
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
                    backgroundColor: page.linkBackgroundColor,
                    color: page.linkTextColor,
                    fontFamily: page.buttonTextFont,
                    border: `solid ${page.linkBorderSize}px`,
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