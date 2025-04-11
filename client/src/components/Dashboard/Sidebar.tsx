// 2. DashboardSidebar Component
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useLinks } from "@/context/LinkContext";
import {
  PlusCircle,
  Settings,
  LayoutGridIcon,
  LucideLayoutDashboard,
  Eye,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { se } from "date-fns/locale";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen,
  showDropdown, 
  setShowDropdown ,
  setActiveTab
}) => {
  const { user } = useAuth();
  const { pages, activePage, setActivePage } = useLinks();
  const navigate = useNavigate();

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 w-64  backdrop-blur-lg py-6 fixed md:sticky h-screen top-0 border-r flex flex-col z-20`}
    >
      <div className="relative px-4 mb-4">
        {/* Dropdown Button */}
        <button
          className="w-fit mt-10 flex justify-between items-center p-3 text-sm bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="truncate font-medium">
            {activePage ? activePage.title : "Select a page"}
          </span>
          <ChevronDown
            className={`h-4 w-4 ml-2 transition-transform flex-shrink-0 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute w-full mt-2 z-10 bg-white shadow-md rounded-lg border"
          >
            <div className="max-h-48 overflow-y-auto p-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant="ghost"
                  className={`w-full justify-start px-3 py-2 mb-1 h-auto text-left rounded-md hover:bg-gray-100 ${
                    activePage?.id === page.id ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setActivePage(page);
                    setShowDropdown(false);
                  }}
                >
                  <span className="truncate">{page.title}</span>
                </Button>
              ))}
            </div>
            <hr className="my-1" />
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md"
              onClick={() => {
                navigate("/new-branch");
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              Create new Branch
            </Button>
          </motion.div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="space-y-1 px-3">
        <h3 className="px-4 text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2">
          Main
        </h3>
          <Button onClick={()=>{
            setActiveTab("links")
            setSidebarOpen(false)
            navigate("/dashboard")
          }} variant="ghost" className="w-full justify-start rounded-lg">
            <LayoutGridIcon className="h-4 w-4 mr-2" />
            My Vraksh
          </Button>

        <h3 className="px-4 text-xs uppercase text-muted-foreground font-semibold tracking-wider mt-6 mb-2">
          Tools
        </h3>
        <Link to="/bento">
          <Button variant="ghost" className="w-full justify-start rounded-lg">
            <LucideLayoutDashboard className="h-4 w-4 mr-2" />
            My Bento
          </Button>
        </Link>

        <Link to="/analytics">
          <Button variant="ghost" className="w-full justify-start rounded-lg">
            <Eye className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </Link>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="mt-auto border-t pt-4 px-4">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <Avatar className="size-8">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.username?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;