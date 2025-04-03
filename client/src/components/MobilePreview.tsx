import React, { useRef, useState, useEffect } from "react";
import { Page, Link as LinkType, TemplateType } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink } from "lucide-react";

// Import the template configurations from TemplateSelector
import { templateConfigs } from "./TemplateSelector";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";

interface MobilePreviewProps {
  page: Page;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ page }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [previewHeight, setPreviewHeight] = useState("100%");
  const { user } = useAuth();

  useEffect(() => {
    const adjustHeight = () => {
      if (contentRef.current) {
        const minHeight = 500;
        setPreviewHeight(
          `${Math.max(contentRef.current.scrollHeight, minHeight)}px`
        );
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, [page]);

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const currentTemplate = templateConfigs.find((t) => t.id === page.template);
  const templateConfig =
    currentTemplate || templateConfigs.find((t) => t.id === "default")!;

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
        style={{ height: "500px" }} // Fixed height to ensure scrolling works properly
      >
        <div
          ref={contentRef}
          className="py-10 px-6 flex flex-col items-center h-full overflow-y-auto"
        >
          {/* Profile Section */}
          <div className="mb-8 text-center">
            <div
              className={`
              mx-auto mb-4 flex items-center justify-center text-2xl font-bold 
              size-16 rounded-full bg-blue-500
              ${templateConfig.profileClass || ""}
            `}
            >
              {page.image ? (
                <img
                  src={page?.image}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                page.title.charAt(0)
              )}
            </div>
            <h1 className={`text-sm font-bold ${templateConfig.textClass}`}>
              {page.title}
            </h1>
            <p className="text-xs opacity-70">@{user?.username}</p>
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
                  className={`
                     w-full p-3 transition-all duration-300 transform hover:scale-[1.02] 
                    active:scale-[0.98] flex items-center justify-between shadow-md text-xs text-center
                    ${
                      templateConfig.linkClass ||
                      "bg-gray-100 hover:bg-gray-200 rounded-xl"
                    }
                  `}
                  style={{
                    animationDelay: `${(index * 0.1).toFixed(1)}s`,
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="font-normal">{link.title}</span>
                  {page.template === "rounded" ? (
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  )}
                </a>
              ))}
          </div>
          {/* Footer */}
          <div className="absolute z-[999] bottom-0 pb-4 min-h-16 bg-gradient-to-t from-black via-black/60 to-transparent pt-2 border-t w-full text-center text-xs flex flex-col justify-center gap-1 items-center backdrop-blur-md">
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
