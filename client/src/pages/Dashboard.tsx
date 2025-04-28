import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLinks } from "@/context/LinkContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Menu,
  PlusCircle,
  X,
  Link,
  Palette,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/Header";
import LinksTabContent from "@/components/Dashboard/LinksTabContent";
import ThemeTabContent from "@/components/Dashboard/ThemeTabContent";
import MobilePreviewButton from "@/components/Dashboard/MobilePreviewButton";
import { getBranches, getMe, refreshToken } from "@/lib/apis";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import ShareDrawerContent from "@/components/ShareContentDrawer";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { image, style } from "motion/react-client";

const Dashboard: React.FC = () => {
  const { activePage, addPage, setPages, setActivePage, pages } = useLinks();
  const { user, setUser, setIsAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("links");
  const [pageTitle, setPageTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('access_token');
    
    if (token) {
      localStorage.setItem('access_token', token);
      document.cookie = `access_token=${token}; path=/; secure; samesite=default`;
      // Clean the URL by removing the access_token from query params
      navigate('/dashboard', { replace: true });

    }
  }, [location, navigate]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await refreshToken();

        // const token = response.data?.access_token;
        // if (token) {
        //   localStorage.setItem('access_token', token);
        //   document.cookie = `access_token=${token}; path=/; secure; samesite=relaxed`;
        // }
        if (response.status !== 200) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
  
    refreshAccessToken();
  }, []);
  

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

  // Handle activePage changes - update URL when active page changes
  useEffect(() => {
    if (activePage) {
      const currentPageId = searchParams.get('page');
      // Only update URL if the page ID has changed
      if (currentPageId !== activePage.id) {
        setSearchParams({ page: activePage.id });
      }
    }
  }, [activePage, setSearchParams, searchParams]);

  useEffect(() => {
    async function fetchUserBranches() {
      setIsLoading(true);
      try {
        const response = await getBranches();
        if (response.status === 200) {
          const data = response.data as { branches: Branch[] };
          const branches = data?.branches;
          if (branches?.length < 1) {
            navigate("/new-branch");
            return;
          }

          const mappedPages = branches.map((branch: Branch) => ({

            id: branch._id,
            title: branch.name,
            links:
              branch.items?.map((item: BranchItem) => (
                {
                id: item._id,
                title: item.title,
                url: item.url,
                active: item.active,
                iconUrl: item.iconUrl,
                publisher: item.publisher,
                imageUrl: item.imageUrl,
                style: item.style,
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
          console.log("Mapped Pages:", mappedPages);
          

          setPages(mappedPages);
          
          // Check if we have a page ID in the URL
          const pageIdFromUrl = searchParams.get('page');
          
          if (mappedPages.length > 0) {
            if (pageIdFromUrl) {
              // Try to find the page with the ID from the URL
              const pageFromUrl = mappedPages.find(page => page.id === pageIdFromUrl);
              if (pageFromUrl) {
                setActivePage(pageFromUrl);
              } else {
                // If page not found, default to first page
                setActivePage(mappedPages[0]);
                // Update URL with the first page ID
                setSearchParams({ page: mappedPages[0].id });
              }
            } else {
              // No page ID in URL, set first page as active
              setActivePage(mappedPages[0]);
              // Update URL with the first page ID
              setSearchParams({ page: mappedPages[0].id });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return <DashboardSkeleton />;
  }

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
          className={`flex-1 bg-[#fbfbf9] transition-all duration-300 ${sidebarOpen ? "md:ml-0" : ""
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
                setIsShareDrawerOpen={setIsShareDrawerOpen}
              />

              <TabsContent value="links" className="animate-fade-in">
                <LinksTabContent />
              </TabsContent>

              <TabsContent value="theme" className="animate-fade-in relative">
                <ThemeTabContent />
                <MobilePreviewButton pageId={activePage.id} />
              </TabsContent>

              {/* For desktop, we'll show the share content as a sidebar */}
              {isDesktop && (
                <>
                  {/* Backdrop */}
                  <AnimatePresence>
                    {isShareDrawerOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsShareDrawerOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-30 z-30"
                      />
                    )}
                  </AnimatePresence>

                  {/* Sidebar */}
                  <AnimatePresence>
                    {isShareDrawerOpen && (
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-40 border-l border-gray-200 overflow-y-auto"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-6">
                            <motion.h2
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-xl font-bold"
                            >
                              Share Your Vraksh
                            </motion.h2>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setIsShareDrawerOpen(false)}
                              className="p-2 rounded-full hover:bg-gray-100"
                            >
                              <X className="h-5 w-5" />
                            </motion.button>
                          </div>
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >

                            <ShareDrawerContent activePage={activePage} setIsShareDrawerOpen={setIsShareDrawerOpen} />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
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
              className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "links" ? "text-blue-600" : "text-gray-500"
                }`}
            >
              <Link className="h-5 w-5" />
              <span className="text-xs mt-1">My Vraksh</span>
            </button>

            <button
              onClick={() => setActiveTab("theme")}
              className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "theme" ? "text-blue-600" : "text-gray-500"
                }`}
            >
              <Palette className="h-5 w-5" />
              <span className="text-xs mt-1">Theme</span>
            </button>
            <Drawer
              open={isShareDrawerOpen && !isDesktop}
              onOpenChange={setIsShareDrawerOpen}
            >
              <DrawerTrigger asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShareDrawerOpen(true);
                  }}
                  className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "share" ? "text-blue-600" : "text-gray-500"
                    }`}
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
                <ShareDrawerContent activePage={activePage} setIsShareDrawerOpen={setIsShareDrawerOpen} />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;