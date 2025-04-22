import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  RiArrowDownSLine, 
  RiLogoutBoxLine, 
  RiSettings3Line, 
  RiUser3Line, 
  RiPaletteLine 
} from "@remixicon/react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
}

export function TeamSwitcher() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2 w-full">
          <Avatar className="h-6 w-6">
            <AvatarImage 
              src={user?.imageUrl || ""} 
              alt={user?.username || "User"} 
            />
            <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user?.username || "User"}</span>
          <RiArrowDownSLine className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <RiUser3Line className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <RiSettings3Line className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          localStorage.removeItem("token");
          window.location.href = import.meta.env.VITE_VRAKSH_URL + "/auth/login";
        }}>
          <RiLogoutBoxLine className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface AppSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AppSidebar({ 
  sidebarOpen, 
  setSidebarOpen,
  activeTab,
  setActiveTab
}: AppSidebarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    {
      name: "My Vraksh",
      href: "#",
      icon: RiUser3Line,
      active: activeTab === "links",
      onClick: () => setActiveTab("links")
    },
    {
      name: "Theme",
      href: "#",
      icon: RiPaletteLine,
      active: activeTab === "theme",
      onClick: () => setActiveTab("theme")
    }
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 border-b">
        <TeamSwitcher />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <nav className="grid gap-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium",
                item.active ? "bg-secondary" : "text-muted-foreground"
              )}
              onClick={item.onClick}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3 text-sm">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user?.imageUrl || ""} 
              alt={user?.username || "User"} 
            />
            <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.username || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppSidebar; 