// 3. DashboardHeader Component
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLinks } from "@/context/LinkContext";
import { Paintbrush, Settings, Share2, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteBranchButton from "./DeleteBranchButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        `flex flex-col sm:flex-row justify-center md:justify-between sticky top-0 z-10 p-4 bg-[#fbfbf9] border-b shadow-sm`,
        className
      )}
    >
      <h2 className="text-xl font-bold text-center relative self-center mb-3 sm:mb-0">
        My Vraksh Branch
      </h2>

      <div
        className={cn(
          `hidden md:flex gap-2 flex-wrap justify-center sm:justify-end`,
        )}
      >
        <Button
          variant="outline"
          size="sm"
          value="links"
          onClick={() => setActiveTab("links")}
          className={cn(
            "text-foreground hover:bg-foreground/10 transition-all duration-200",
            activeTab === "links" ? "bg-secondary text-secondary-foreground" : ""
          )}
        >
          <User className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">My Vraksh</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          value="theme"
          onClick={() => setActiveTab("theme")}
          className={cn(
            "text-foreground hover:bg-foreground/10 transition-all duration-200",
            activeTab === "theme" ? "bg-secondary text-secondary-foreground" : ""
          )}
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

        {activePage && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-foreground hover:bg-foreground/10 transition-all duration-200"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate(`/preview/${activePage.id}`)}
                  className="cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Branch
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer p-0"
                >
                  <DeleteBranchButton
                    branchId={activePage.id}
                    branchName={activePage.title}
                    className="w-full text-left"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
