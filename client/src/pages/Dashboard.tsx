import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import LinksList from "@/components/LinksList";
import LinkForm from "@/components/LinkForm";
import MobilePreview from "@/components/MobilePreview";
import TemplateSelector from "@/components/TemplateSelector";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash2,
  Palette,
  Share2,
  PaintRoller,
  Eye,
  Paintbrush,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { pages, activePage, setActivePage, addPage, updatePage, deletePage } =
    useLinks();

  const [pageTitle, setPageTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleCreatePage = () => {
    if (pageTitle.trim()) {
      addPage(pageTitle);
      setPageTitle("");
    } else {
      addPage("New Page");
    }
  };

  const handleChangeActivePageTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (activePage) {
      updatePage(activePage.id, { title: e.target.value });
    }
  };

  const handleDeleteActivePage = () => {
    if (activePage) {
      deletePage(activePage.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9]">
      {/* <Navbar /> */}

      <main className="flex-1 min-w-full mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#ededeb] p-4 sticky h-screen top-0 border-r">
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {activePage ? activePage.title : "Select a page"}
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </Button>

            {showDropdown && (
              <Card className="absolute w-full mt-1 z-10 p-1 animate-fade-in">
                <div className="max-h-48 overflow-y-auto">
                  {pages.map((page) => (
                    <Button
                      key={page.id}
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 h-auto my-1 text-left"
                      onClick={() => {
                        setActivePage(page);
                        setShowDropdown(false);
                      }}
                    >
                      {page.title}
                    </Button>
                  ))}
                </div>
                <hr className="my-1" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    navigate("/new-branch");
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create new Branch
                </Button>
              </Card>
            )}
          </div>
        </aside>
        {/* Main Content View */}
        <section className="flex-1 bg-[#fbfbf9]  pt-0">
          {activePage ? (
            <Tabs defaultValue="links" className="w-full mt-0 ">
              <div className="flex justify-between  sticky top-0 z-10 p-6 bg-[#fbfbf9] border-b">
                <h2 className="text-xl font-bold text-center align-middle">
                  My Vraksh Branch
                </h2>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate(`/theme/${activePage.id}`);
                    }}
                    className="text-foreground hover:bg-foreground/10 transition-all duration-200"
                  >
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Theme
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                    className="text-foreground hover:bg-foreground/10 transition-all duration-200"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
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
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate("/admin/settings");
                    }}
                    className="text-foreground hover:bg-foreground/10 transition-all duration-200"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-col flex xl:flex-row animate-fade-in px-6 justify-between gap-6 xl:gap-0 min-h-[800px]]">
                <div className="space-y-4 shrink w-full xl:px-10 border-r min-h-screen">
                  <div className="flex items-center justify-between py-6">
                    <h2 className="text-lg font-medium">Links</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {activePage.links.length > 0 ? (
                      <LinksList
                        pageId={activePage.id}
                        links={activePage.links}
                      />
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No links added yet. Add your first link below.</p>
                      </div>
                    )}

                    <LinkForm pageId={activePage.id} />
                  </div>
                </div>
                <div className="min-w-[30rem] lg:block">
                  <div className="sticky top-28">
                    <MobilePreview page={activePage} />
                  </div>
                </div>
              </div>

              <TabsContent value="appearance" className="animate-fade-in">
                <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">Appearance</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>

                    <TemplateSelector pageId={activePage.id} />
                  </div>

                  <div className="hidden lg:block">
                    <div className="sticky top-28">
                      <MobilePreview page={activePage} />
                    </div>
                  </div>
                </div>
              </TabsContent>
              {/* <TabsContent value="preview" className="animate-fade-in p-6">
                <div className="flex justify-center">
                  <MobilePreview page={activePage} />
                </div>
              </TabsContent> */}
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md p-6">
                <h2 className="text-xl font-bold mb-2">No Page Selected</h2>
                <p className="text-muted-foreground mb-4">
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
      </main>
    </div>
  );
};

export default Dashboard;
