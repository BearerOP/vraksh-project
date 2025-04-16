import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLinks } from "@/context/LinkContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  PlusCircle,
  X,
  Link,
  Palette,
  Share,
  Copy,
  Eye,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/Header";
import LinksTabContent from "@/components/Dashboard/LinksTabContent";
import ThemeTabContent from "@/components/Dashboard/ThemeTabContent";
import MobilePreviewButton from "@/components/Dashboard/MobilePreviewButton";
import { getBranches, getMe } from "@/lib/apis";
import { Branch, BranchItem, SocialIcon, User } from "@/utils/types";
import { useAuth } from "@/hooks/use-auth";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { se } from "date-fns/locale";
import { a, nav } from "motion/react-client";

const Dashboard: React.FC = () => {
  const { activePage, addPage, setPages, setActivePage, pages } = useLinks();
  const { user, setUser, setIsAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("links");
  const [pageTitle, setPageTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await getMe();
        if (
          res.status === 200 &&
          res.data &&
          typeof res.data === "object" &&
          "user" in res.data
        ) {
          const userData = res.data.user as User;
          console.log(userData);

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = import.meta.env.VITE_VRAKSH_URL + "/auth/login";
      }
    }
    fetchUserData();
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarToggleRef.current &&
        !sidebarToggleRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    async function fetchUserBranches() {
      const response = await getBranches();
      if (response.status === 200) {
        const data = response.data as { branches: Branch[] };
        const branches = data?.branches;
        if (branches?.length < 1) {
          navigate("/new-branch");
        }
        console.log("branches", branches);

        console.log(branches[0].socialIcons);

        const mappedPages = branches.map((branch: Branch) => ({
          id: branch._id,
          title: branch.name,
          links:
            branch.items?.map((item: BranchItem) => ({
              id: item._id,
              title: item.title,
              url: item.url,
              active: item.active,
            })) || [],
          templateId: branch.templateId,
          imageUrl: branch.imageUrl,
          createdAt: branch.createdAt,
          updatedAt: branch.updatedAt,
          backgroundImageUrl: branch.backgroundImageUrl,
          userId: branch.userId,
          description: branch.description,
          socialIcons: branch.socialIcons as SocialIcon[],
          titleColor: branch.titleColor,
          titleFont: branch.titleFont,
          descriptionColor: branch.descriptionColor,
          descriptionFont: branch.descriptionFont,
          linkTextColor: branch.linkTextColor,
          linkBorderSize: branch.linkBorderSize,
          linkBackgroundColor: branch.linkBackgroundColor,
          buttonTextFont: branch.buttonTextFont,
          avatarRounded: branch.avatarRounded,
        }));

        setPages(mappedPages);
        if (mappedPages.length > 0) {
          if(!activePage) {
            setActivePage(mappedPages[0]);
          }
        }
      }
    }

    fetchUserBranches();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreatePage = () => {
    if (pageTitle.trim()) {
      addPage(pageTitle);
      setPageTitle("");
    } else {
      addPage("New Page");
    }
  };

  const handleCopyLink = () => {
    if (activePage) {
      const url = `${import.meta.env.VITE_VRAKSH_DOMAIN}/preview/${
        activePage.title
      }`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Vraksh Url copied!", {
            description: `Copied: ${url}`,
            duration: 3000,
          });
        })
        .catch(() => {
          toast.error("Failed to copy link.");
        });
    }
    setIsShareDrawerOpen(false);
  };

  const openPreview = () => {
    if (activePage) {
      setIsShareDrawerOpen(false);
      window.open(`/preview/${activePage.id}`, "_blank");
    }
  };

  const ShareDrawerContent = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
        <Copy className="h-5 w-5 text-gray-500" />
        <button onClick={handleCopyLink} className="flex-1 text-left">
          Copy my Vraksh link
        </button>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
        <Eye className="h-5 w-5 text-gray-500" />
        <button onClick={openPreview} className="flex-1 text-left">
          Preview my Vraksh
        </button>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
        <Link className="h-5 w-5 text-gray-500" />
        <span className="flex-1 text-left">Add to your socials</span>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
        <QrCode className="h-5 w-5 text-gray-500" />
        <span className="flex-1 text-left">My Vraksh QR</span>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Share Vraksh to</h3>
        <div className="grid grid-cols-4 gap-4">
          {/* Social media sharing icons */}
          <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">FB</span>
          </div>
          <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">TW</span>
          </div>
          <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">IG</span>
          </div>
          <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">WA</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9]">
      <div className="flex-1 min-w-full mx-auto flex relative pb-16 md:pb-0">
        {/* Mobile sidebar toggle */}
        {sidebarOpen ? (
          <Button
            ref={sidebarToggleRef}
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden fixed top-6 left-44 z-30 bg-white shadow-sm rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            ref={sidebarToggleRef}
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 left-4 z-30 bg-white shadow-sm rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Sidebar - with ref for detecting outside clicks */}
        <div ref={sidebarRef}>
          <DashboardSidebar
            sidebarOpen={sidebarOpen}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Main Content */}
        <section
          className={`flex-1 bg-[#fbfbf9] transition-all duration-300 ${
            sidebarOpen ? "md:ml-0" : ""
          }`}
        >
          {activePage ? (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <DashboardHeader
                className="hidden sm:flex"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <TabsContent value="links" className="animate-fade-in">
                <LinksTabContent />
              </TabsContent>

              <TabsContent value="theme" className="animate-fade-in relative">
                <ThemeTabContent />
                <MobilePreviewButton pageId={activePage.id} />
              </TabsContent>

              <TabsContent value="share" className="animate-fade-in">
                <ShareDrawerContent />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">No Page Selected</h2>
                <p className="text-muted-foreground mb-6">
                  Select an existing page or create a new one to get started
                </p>
                <Button
                  onClick={handleCreatePage}
                  className="bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Page
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      {activePage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-30">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setActiveTab("links")}
              className={`flex flex-col items-center justify-center w-full h-full ${
                activeTab === "links" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Link className="h-5 w-5" />
              <span className="text-xs mt-1">My Vraksh</span>
            </button>

            <button
              onClick={() => setActiveTab("theme")}
              className={`flex flex-col items-center justify-center w-full h-full ${
                activeTab === "theme" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Palette className="h-5 w-5" />
              <span className="text-xs mt-1">Theme</span>
            </button>

            <Drawer
              open={isShareDrawerOpen}
              onOpenChange={setIsShareDrawerOpen}
            >
              <DrawerTrigger asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    setIsShareDrawerOpen(true); // Just open drawer without changing tab
                  }}
                  className="flex flex-col items-center justify-center w-full h-full text-gray-500"
                >
                  <Share className="h-5 w-5" />
                  <span className="text-xs mt-1">Share</span>
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80%]">
                <DrawerHeader>
                  <DrawerTitle>Share Your Vraksh</DrawerTitle>
                  <DrawerDescription>
                    Share your Vraksh link with others or add it to your socials
                  </DrawerDescription>
                </DrawerHeader>
                <ShareDrawerContent />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
