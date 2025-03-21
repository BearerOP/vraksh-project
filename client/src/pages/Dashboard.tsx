import React, { useState } from 'react';
import { useLinks } from '@/context/LinkContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import LinksList from '@/components/LinksList';
import LinkForm from '@/components/LinkForm';
import MobilePreview from '@/components/MobilePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { ChevronDown, PlusCircle, Settings, Trash2, Palette } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    pages, 
    activePage, 
    setActivePage, 
    addPage, 
    updatePage, 
    deletePage 
  } = useLinks();
  
  const [pageTitle, setPageTitle] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleCreatePage = () => {
    if (pageTitle.trim()) {
      addPage(pageTitle);
      setPageTitle('');
    } else {
      addPage('New Page');
    }
  };
  
  const handleChangeActivePageTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 container px-4 py-6 md:py-8 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {activePage ? activePage.title : 'Select a page'}
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </Button>
              
              {showDropdown && (
                <Card className="absolute w-full mt-1 z-10 p-1 animate-fade-in">
                  <div className="max-h-48 overflow-y-auto">
                    {pages.map(page => (
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
                    onClick={handleCreatePage}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create new page
                  </Button>
                </Card>
              )}
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50 space-y-4">
              <h3 className="font-medium">Create New Page</h3>
              <div className="flex gap-2">
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Page Title"
                  className="transition-all duration-200"
                />
                <Button 
                  onClick={handleCreatePage}
                  className="bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                >
                  Create
                </Button>
              </div>
            </div>
            
            {pages.length > 0 && (
              <div className="rounded-lg border p-4 bg-card shadow-sm">
                <h3 className="font-medium mb-3">Your Pages</h3>
                <div className="space-y-2">
                  {pages.map(page => (
                    <div 
                      key={page.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        activePage?.id === page.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                      onClick={() => setActivePage(page)}
                    >
                      <span className="truncate">{page.title}</span>
                      {activePage?.id === page.id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {activePage ? (
            <div className="flex-1">
              <Tabs defaultValue="links" className="w-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Input 
                      value={activePage.title}
                      onChange={handleChangeActivePageTitle}
                      className="text-xl font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 mb-1 bg-transparent"
                    />
                    <p className="text-sm text-muted-foreground">
                      Manage your page links and settings
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteActivePage}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <TabsList>
                      <TabsTrigger value="links">Links</TabsTrigger>
                      <TabsTrigger value="appearance">Appearance</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="links" className="animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
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
                    
                    <div className="hidden lg:block">
                      <div className="sticky top-24">
                        <MobilePreview page={activePage} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      
                      <Card className="p-4">
                        <h3 className="text-sm font-medium mb-3">Theme</h3>
                        <div className="flex gap-3">
                          <div 
                            className={`
                              w-full h-12 rounded-md cursor-pointer transition-all duration-200 border-2 bg-white
                              ${activePage.theme === 'light' ? 'border-blue-500 shadow-sm' : 'border-transparent'}
                            `}
                            onClick={() => updatePage(activePage.id, { theme: 'light' })}
                          >
                            <div className="w-full h-full rounded-[3px] flex items-center justify-center text-xs font-medium">
                              Light
                            </div>
                          </div>
                          <div 
                            className={`
                              w-full h-12 rounded-md cursor-pointer transition-all duration-200 border-2 bg-gray-900
                              ${activePage.theme === 'dark' ? 'border-blue-500 shadow-sm' : 'border-transparent'}
                            `}
                            onClick={() => updatePage(activePage.id, { theme: 'dark' })}
                          >
                            <div className="w-full h-full rounded-[3px] flex items-center justify-center text-xs font-medium text-white">
                              Dark
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="hidden lg:block">
                      <div className="sticky top-24">
                        <MobilePreview page={activePage} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="animate-fade-in">
                  <div className="flex justify-center">
                    <MobilePreview page={activePage} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

