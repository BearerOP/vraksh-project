import React, { useRef, useState, useEffect } from "react";
import { Page, Link as LinkType, TemplateType } from "@/context/LinkContext";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink } from "lucide-react";
import icon from "../../public/icon.svg";

interface MobilePreviewProps {
  page: Page;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ page }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [previewHeight, setPreviewHeight] = useState("100%");

  useEffect(() => {
    const adjustHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const minHeight = 500;
        setPreviewHeight(`${Math.max(contentHeight, minHeight)}px`);
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, [page]);

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

  const getBackground = (template: TemplateType, theme: "light" | "dark") => {
    switch (template) {
      case "gradient":
        return "bg-gradient-to-br from-purple-500 to-pink-500";
      case "dark":
        return "bg-gray-900";
      case "neon":
        return "bg-black text-green-400";
      case "glass":
        return "bg-white/20 backdrop-blur-md";
      case "futuristic":
        return "bg-gradient-to-tr from-blue-600 to-indigo-600";
      case "rounded":
        return "bg-gray-100";
      default:
        return theme === "dark" ? "bg-gray-900" : "bg-white";
    }
  };

  const getLinkStyles = (template: TemplateType, theme: "light" | "dark") => {
    const baseStyles =
      "block w-full p-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between shadow-md";

    switch (template) {
      case "minimal":
        return cn(
          baseStyles,
          theme === "dark"
            ? "bg-transparent border border-gray-700 hover:border-gray-600 text-white"
            : "bg-transparent border border-gray-300 hover:border-gray-400",
          "rounded-md"
        );
      case "gradient":
        return cn(
          baseStyles,
          "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white",
          "rounded-lg"
        );
      case "dark":
        return cn(baseStyles, "bg-gray-800 hover:bg-gray-700 text-white border-gray-700", "rounded-lg");
      case "neon":
        return cn(baseStyles, "bg-black text-green-400 border border-green-400 hover:bg-green-800", "rounded-lg");
      case "glass":
        return cn(baseStyles, "bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30", "rounded-lg");
      case "futuristic":
        return cn(baseStyles, "bg-gradient-to-tr from-blue-500 to-indigo-500 text-white hover:opacity-90", "rounded-lg");
      case "rounded":
        return cn(baseStyles, "bg-gray-100 hover:bg-gray-200", "rounded-full");
      default:
        return cn(baseStyles, "bg-gray-100 hover:bg-gray-200", "rounded-xl");
    }
  };

  const getProfileStyles = (template: TemplateType) => {
    const baseStyles = "mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold";

    switch (template) {
      case "minimal":
        return cn(baseStyles, "w-20 h-20 rounded-md bg-gray-900");
      case "gradient":
        return cn(baseStyles, "w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30");
      case "dark":
        return cn(baseStyles, "w-24 h-24 rounded-full bg-gray-800 border border-gray-700");
      case "neon":
        return cn(baseStyles, "w-24 h-24 rounded-full bg-black border border-green-400 text-green-400");
      case "glass":
        return cn(baseStyles, "w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg border border-white/30");
      case "futuristic":
        return cn(baseStyles, "w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-500");
      case "rounded":
        return cn(baseStyles, "w-28 h-28 rounded-full bg-gray-100");
      default:
        return cn(baseStyles, "w-24 h-24 rounded-full bg-blue-500");
    }
  };

  return (
    <div className="relative min-h-[490px] w-full max-w-[293px] mx-auto">
      <div className={cn("absolute inset-0 border-[8px] rounded-[50px] shadow-2xl z-10 pointer-events-none", page.theme === "dark" ? "border-white" : "border-black/30")} />

      <div
        className={cn(
          "relative z-0 overflow-hidden rounded-[51px] transition-colors duration-300",
          getBackground(page.template, page.theme),
          page.theme === "dark" ? "text-white" : "text-gray-900"
        )}
        style={{ height: previewHeight }}
      >
        <div ref={contentRef} className="py-16 px-6 flex flex-col items-center">
          <div className="mb-8 text-center">
            <div className={getProfileStyles(page.template)}>{page.title.charAt(0)}</div>
            <h1 className={cn("text-xl font-bold mb-1", page.template === "gradient" && "text-white")}>
              {page.title}
            </h1>
            <p className={cn("text-sm opacity-70", page.template === "gradient" && "text-white/70")}>@username</p>
          </div>

          <div className="w-full space-y-3">
            {page.links
              .filter((link) => link.active)
              .map((link: LinkType, index: number) => (
                <a
                  key={link.id}
                  href={normalizeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getLinkStyles(page.template, page.theme)}
                  style={{
                    animationDelay: `${(index * 0.1).toFixed(1)}s`,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="font-medium">{link.title}</span>
                  {page.template === "rounded" ? <ExternalLink className="h-4 w-4 opacity-60" /> : <ArrowRight className="h-4 w-4 opacity-60" />}
                </a>
              ))}

            {page.links.filter((link) => link.active).length === 0 && (
              <div className={cn("text-center py-8", page.template === "gradient" ? "text-white/70" : "opacity-70")}>
                <p>No active links to display</p>
              </div>
            )}
          </div>

          <div className={cn("mt-12 pt-6 border-t w-full text-center text-xs flex justify-center items-center", page.template === "gradient" ? "border-white/10 text-white/60" : "opacity-60")}>
            <p>VRAKSH</p>
            <img src={icon} alt="icon" className="h-4 w-4 mx-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
