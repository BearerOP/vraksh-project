// 3. DashboardHeader Component
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useLinks } from "@/context/LinkContext";
import { Paintbrush, Share2, Eye, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, setActiveTab, className }) => {
  const navigate = useNavigate();
  const { activePage } = useLinks();

  return (
    <div className={cn( `flex flex-col sm:flex-row justify-between sticky top-0 z-10 p-4 bg-[#fbfbf9] border-b shadow-sm`)}>
      <h2 className="text-xl font-bold text-center relative self-center mb-3 sm:mb-0">
        My Vraksh
      </h2>

      <div className={cn(`flex gap-2 flex-wrap justify-center sm:justify-end`, className)}>
        <TabsList className="mb-3 sm:mb-0 mr-2">
          <TabsTrigger value="links" onClick={() => setActiveTab("links")}>
            Links
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            onClick={() => setActiveTab("appearance")}>
            Appearance
          </TabsTrigger>
        </TabsList>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate(`/theme/${activePage.id}`);
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Paintbrush className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate(`/preview/${activePage.id}`);
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Eye className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Preview</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate("/admin/settings");
          }}
          className="text-foreground hover:bg-foreground/10 transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;