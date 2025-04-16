// 3. DashboardHeader Component
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLinks } from "@/context/LinkContext";
import { Paintbrush, Share2, Eye, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  setIsShareDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  setActiveTab,
  className,
  setIsShareDrawerOpen
}) => {
  const navigate = useNavigate();
  const { activePage } = useLinks();


  return (
    <div
      className={cn(
        `flex flex-col  sm:flex-row justify-center md:justify-between sticky top-0 z-10 p-4 bg-[#fbfbf9] border-b shadow-sm`
      )}
    >
      <h2 className="text-xl font-bold text-center relative self-center mb-3 sm:mb-0">
        My Vraksh Branch
      </h2>

      <div
        className={cn(
          `hidden md:flex gap-2 flex-wrap justify-center sm:justify-end `,
        )}
      >
        <Button
          variant="outline"
          size="sm"
          value="links"
          onClick={() => setActiveTab("links")}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Paintbrush className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Links</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          value="theme"
          onClick={() => setActiveTab("theme")}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Paintbrush className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Theme</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsShareDrawerOpen(true);
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Share</span>
        </Button>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate(`/preview/${activePage.id}`);
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Eye className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Preview</span>
        </Button> */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate("/admin/settings");
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
