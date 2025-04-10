import React, { useEffect, useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksList from "@/components/LinksList";
import LinkForm from "@/components/LinkForm";
import MobilePreview from "@/components/MobilePreview";
import TemplateSelector from "@/components/TemplateSelector";
import { motion } from "motion/react";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Palette,
  Share2,
  Eye,
  Paintbrush,
  LayoutGridIcon,
  LucideLayoutDashboard,
  Ellipsis,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getBranches, getMe } from "@/lib/apis";
import { useAuth } from "@/hooks/use-auth";
import { Branch, BranchItem, SocialIcon, User } from "@/types/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  InstagramIcon,
  LinkedinIcon,
  SnapchatIcon,
  XIcon,
} from "@/components/ui/social-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import ImageCropper from "@/components/ImageCropper";
import ColorPicker from "@/components/ColorPicker";
import { link } from "fs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard: React.FC = () => {
  // Add these state variables to your component
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [croppedProfileImage, setCroppedProfileImage] = useState<Blob | null>(
    null
  );

  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<
    string | null
  >(null);
  const [croppedBackgroundImage, setCroppedBackgroundImage] =
    useState<Blob | null>(null);

    const fonts = [
      "Inter",
      "Roboto",
      "Roboto Flex",
      "Roboto Serif",
      "Roboto Mono",
      "Poppins",
      "Open Sans",
      "Lato",
      "Playfair Display",
      "Pacifico",
      "Electrolize",
      "Comic Neue",
      "Bebas Neue",
    ];
    

  // Add these handler functions
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileCropComplete = (blob: Blob) => {
    setCroppedProfileImage(blob);
  };

  const handleProfileImageSave = async () => {
    if (!croppedProfileImage) return;

    try {
      // Create a FormData instance for the API call
      const formData = new FormData();
      formData.append("image", croppedProfileImage);
      formData.append("pageId", activePage.id);

      // API call would go here
      // const response = await uploadProfileImage(formData);

      // For demo, we'll just update the local state
      const imageUrl = URL.createObjectURL(croppedProfileImage);
      updatePage(activePage.id, { imageUrl });

      toast.success("Profile image updated successfully!");

      // Clean up
      setProfileImageFile(null);
      setProfileImagePreview(null);
      setCroppedProfileImage(null);
    } catch (error) {
      toast.error("Failed to update profile image");
      console.error(error);
    }
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackgroundImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundCropComplete = (blob: Blob) => {
    setCroppedBackgroundImage(blob);
  };

  const handleBackgroundImageSave = async () => {
    if (!croppedBackgroundImage) return;

    try {
      // Create a FormData instance for the API call
      const formData = new FormData();
      formData.append("image", croppedBackgroundImage);
      formData.append("pageId", activePage.id);

      // API call would go here
      // const response = await uploadBackgroundImage(formData);

      // For demo, we'll just update the local state
      const backgroundImageUrl = URL.createObjectURL(croppedBackgroundImage);
      updatePage(activePage.id, { backgroundImageUrl });

      toast.success("Background image updated successfully!");

      // Clean up
      setBackgroundImageFile(null);
      setBackgroundImagePreview(null);
      setCroppedBackgroundImage(null);
    } catch (error) {
      toast.error("Failed to update background image");
      console.error(error);
    }
  };

  const handleRemoveBackground = () => {
    if (activePage) {
      updatePage(activePage.id, { backgroundImageUrl: "" });
      toast.success("Background removed successfully");
    }
  };

  const handleRemoveProfileImage = () => {
    if (activePage) {
      updatePage(activePage.id, { imageUrl: "" });
      toast.success("Profile image removed successfully");
    }
  };

  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();
  const {
    pages,
    activePage,
    setActivePage,
    addPage,
    updatePage,
    deletePage,
    setPages,
  } = useLinks();

  const [pageTitle, setPageTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("links");
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

  const handleChangeDescription = (description: string) => {
    if (activePage) {
      toast.success("Page description updated!", {
        description: `Updated: ${description}`,
        duration: 3000,
      });
      updatePage(activePage.id, { description });
    }
  };

  const handleCopyLink = (url: string) => {
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
  };

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

  useEffect(() => {
    async function fetchUserBranches() {
      const response = await getBranches();
      if (response.status === 200) {
        const data = response.data as { branches: Branch[] };
        const branches = data.branches;
        console.log("branches", branches);

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
          templateId: branch.templateId || "default", // default or from branch if available
          imageUrl: branch.imageUrl || "", // default or from branch if available
          createdAt: branch.createdAt,
          updatedAt: branch.updatedAt,
          backgroundImageUrl: branch.backgroundImageUrl || "", // default or from branch if available
          userId: branch.userId,
          description: branch.description || "",
          socialIcons: branch.socialIcons as SocialIcon[],
          // Add new style fields with defaults
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
          setActivePage(mappedPages[0]);
        }
      }
    }

    fetchUserBranches();
  }, []);

  // Handle responsive sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9]">
      {/* Main Content Area */}
      <div className="flex-1 min-w-full mx-auto flex relative">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-30 bg-white shadow-sm rounded-full"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 w-64 bg-[#ededeb] py-6 fixed md:sticky h-screen top-0 border-r flex flex-col z-20`}
        >
          <div className="relative px-4 mb-4">
            {/* Dropdown Button */}
            <button
              className="w-full flex justify-between items-center p-3 text-sm bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
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
                        activePage?.id === page.id
                          ? "bg-gray-100 font-medium"
                          : ""
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
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <LayoutGridIcon className="h-4 w-4 mr-2" />
                My Vraksh
              </Button>
            </Link>

            <h3 className="px-4 text-xs uppercase text-muted-foreground font-semibold tracking-wider mt-6 mb-2">
              Tools
            </h3>
            <Link to="/bento">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <LucideLayoutDashboard className="h-4 w-4 mr-2" />
                My Bento
              </Button>
            </Link>

            <Link to="/analytics">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
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
                  <p className="text-sm font-medium truncate">
                    {user.username}
                  </p>
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
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between sticky top-0 z-10 p-4 bg-[#fbfbf9] border-b shadow-sm">
                <h2 className="text-xl font-bold text-center relative self-center mb-3 sm:mb-0">
                  My Vraksh
                </h2>

                <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                  <TabsList className="mb-3 sm:mb-0 mr-2">
                    <TabsTrigger
                      value="links"
                      onClick={() => setActiveTab("links")}
                    >
                      Links
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      onClick={() => setActiveTab("appearance")}
                    >
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

              {/* Content Area */}
              <TabsContent value="links" className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Links Management Section */}
                  <div className="lg:col-span-2 space-y-4 px-4 md:px-8 py-6">
                    {/* Notification Card */}
                    <Card className="mb-6 border-none shadow-lg rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-100">
                      <CardHeader className="pb-0 sm:pb-6">
                        <CardTitle className="text-sm font-medium">
                          Your Vraksh is live:{" "}
                          <Link
                            className="underline text-muted-foreground"
                            to={`/${activePage.title}`}
                          >
                            {import.meta.env.VITE_VRAKSH_DOMAIN}/
                            {activePage.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 sm:pt-6">
                        <Button
                          onClick={() => {
                            handleCopyLink(
                              `${import.meta.env.VITE_VRAKSH_APP_URL}/${
                                activePage.title
                              }`
                            );
                          }}
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto rounded-2xl text-base hover:bg-emerald-50 transition-all duration-300"
                        >
                          Claim your Vraksh URL
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Profile Section */}
                    <div className="flex items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center gap-4">
                        <Avatar className="border border-muted-foreground/20 size-14">
                          <AvatarImage src={activePage?.imageUrl} />
                          <AvatarFallback>
                            {(activePage?.title?.[0] || "") +
                              (activePage?.title?.[1] || "")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-1 items-start">
                          <Button
                            variant="link"
                            className="text-black underline p-0 h-auto"
                          >
                            @{activePage?.title || "username"}
                          </Button>

                          <Button
                            variant="link"
                            className="text-muted-foreground hover:underline-offset-1 p-0 h-auto"
                          >
                            {activePage?.description || "Add description"}
                          </Button>

                          <div className="flex flex-wrap gap-2 mt-1">
                            <Button
                              variant="link"
                              className="text-muted-foreground p-0 h-auto"
                              aria-label="instagram"
                            >
                              <InstagramIcon />
                            </Button>
                            <Button
                              variant="link"
                              className="text-muted-foreground p-0 h-auto"
                              aria-label="snapchat"
                            >
                              <SnapchatIcon />
                            </Button>
                            <Button
                              variant="link"
                              className="text-muted-foreground p-0 h-auto"
                              aria-label="twitter"
                            >
                              <XIcon />
                            </Button>
                            <Button
                              variant="link"
                              className="text-muted-foreground p-0 h-auto"
                              aria-label="linkedin"
                            >
                              <LinkedinIcon />
                            </Button>
                            <Button
                              variant="link"
                              className="text-muted-foreground p-0 h-auto"
                              aria-label="more"
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 ml-auto sm:ml-0"
                        onClick={() => {}}
                      >
                        <Ellipsis />
                      </Button>
                    </div>

                    {/* Links Section */}
                    <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Your Links</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          Reorder
                        </Button>
                      </div>

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

                  {/* Mobile Preview */}
                  <div className="hidden lg:block">
                    <div className="sticky top-24">
                      <h3 className="text-lg font-medium mb-4 text-center">
                        Preview
                      </h3>
                      <MobilePreview page={activePage} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="animate-fade-in">
                <div className="grid grid-cols-1 p-6 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h2 className="text-lg font-medium mb-4">
                        Profile Settings
                      </h2>
                      <div className="flex justify-between ">
                        {/* Profile Image Section */}
                        <div>
                          <label className="block text-sm font-medium mb-6">
                            Profile Image
                          </label>
                          <div className="flex flex-col items-center gap-4">
                            <Avatar
                              className="size-48 border border-muted-foreground/20"
                              style={{
                                borderRadius: activePage?.avatarRounded,
                              }}
                            >
                              <AvatarImage src={activePage?.imageUrl} />
                              <AvatarFallback>
                                {(activePage?.title?.[0] || "") +
                                  (activePage?.title?.[1] || "")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Image
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Upload Profile Image
                                    </DialogTitle>
                                    <DialogDescription>
                                      Upload and crop your profile picture
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {profileImageFile ? (
                                      <div className="flex flex-col items-center gap-4">
                                        <div className="relative flex justify-center w-full aspect-square max-w-sm mx-auto border rounded-lg overflow-hidden">
                                          <ImageCropper
                                            image={profileImagePreview}
                                            aspect={1}
                                            onCropComplete={
                                              handleProfileCropComplete
                                            }
                                          />
                                        </div>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setProfileImageFile(null)
                                          }
                                        >
                                          Choose Different Image
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center gap-4">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
                                          <input
                                            type="file"
                                            id="profileImageUpload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleProfileImageChange}
                                          />
                                          <label
                                            htmlFor="profileImageUpload"
                                            className="cursor-pointer"
                                          >
                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                              Drag & drop or click to upload
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              Supports JPG, PNG, WEBP
                                            </p>
                                          </label>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <DialogFooter className="sm:justify-between">
                                    <DialogClose asChild>
                                      <Button variant="secondary">
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      disabled={!profileImageFile}
                                      onClick={handleProfileImageSave}
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              {activePage?.imageUrl && (
                                <Button
                                  variant="outline"
                                  onClick={handleRemoveProfileImage}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended size: 400x400px. Max file size: 2MB
                          </p>

                          {/* Avatar Shape Toggle */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">
                              Avatar Shape
                            </label>

                            <Select
                              value={activePage?.avatarRounded} // "8px" is Default
                              onValueChange={(value) =>
                                updatePage(activePage.id, {
                                  avatarRounded: value,
                                })
                              }
                              defaultValue="9999px"
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select the avatar shape" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Square</SelectItem>
                                <SelectItem value="4px">
                                  Small Curved
                                </SelectItem>
                                <SelectItem value="8px">Default</SelectItem>
                                <SelectItem value="12px">Curved</SelectItem>
                                <SelectItem value="16px">
                                  Large Curved
                                </SelectItem>
                                <SelectItem value="24px">2XL Curved</SelectItem>
                                <SelectItem value="9999px">
                                  Circle
                                </SelectItem>{" "}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Background Image Section */}
                        <div>
                          <label className="block text-sm font-medium mb-6">
                            Background
                          </label>
                          <div className="flex flex-col items-center gap-4">
                            <div className="relative h-48 w-fit rounded-lg overflow-hidden mb-3 bg-gray-100">
                              {activePage?.backgroundImageUrl ? (
                                <img
                                  src={activePage?.backgroundImageUrl}
                                  alt="Background preview"
                                  className="h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                  <ImageIcon className="h-6 w-6 mr-2" />
                                  <span>No background set</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Background
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>
                                    Upload Background Image
                                  </DialogTitle>
                                  <DialogDescription>
                                    Upload and crop your background image
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {backgroundImageFile ? (
                                    <div className="flex flex-col items-center gap-4">
                                      <div className="relative aspect-[9/16] max-w-lg mx-auto border rounded-lg overflow-hidden">
                                        <ImageCropper
                                          image={backgroundImagePreview}
                                          aspect={9 / 16}
                                          onCropComplete={
                                            handleBackgroundCropComplete
                                          }
                                        />
                                      </div>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setBackgroundImageFile(null)
                                        }
                                      >
                                        Choose Different Image
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center gap-4">
                                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
                                        <input
                                          type="file"
                                          id="backgroundImageUpload"
                                          className="hidden"
                                          accept="image/*"
                                          onChange={handleBackgroundImageChange}
                                        />
                                        <label
                                          htmlFor="backgroundImageUpload"
                                          className="cursor-pointer"
                                        >
                                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                          <p className="text-sm text-muted-foreground">
                                            Drag & drop or click to upload
                                          </p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            Supports JPG, PNG, WEBP
                                          </p>
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter className="sm:justify-between">
                                  <DialogClose asChild>
                                    <Button variant="secondary">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    disabled={!backgroundImageFile}
                                    onClick={handleBackgroundImageSave}
                                  >
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {activePage?.backgroundImageUrl && (
                              <Button
                                variant="outline"
                                onClick={handleRemoveBackground}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended size: 1080x608px. Max file size: 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Text & Color Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h2 className="text-lg font-medium mb-4">
                        Text & Colors
                      </h2>

                      {/* Bio Text */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Bio Text
                        </label>
                        <Textarea
                          placeholder="Add a short bio"
                          className="resize-none"
                          value={activePage?.description || ""}
                          onChange={(e) =>
                            handleChangeDescription(e.target.value)
                          }
                        />
                      </div>

                      {/* Color Settings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Title Color */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Title Color
                          </label>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full border shadow-sm"
                              style={{
                                backgroundColor:
                                  activePage?.titleColor || "#000000",
                              }}
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Change Color
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <ColorPicker
                                  color={activePage?.titleColor || "#000000]"}
                                  onChange={(color) =>
                                    updatePage(activePage.id, {
                                      titleColor: color,
                                    })
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Description Color */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Description Color
                          </label>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full border shadow-sm"
                              style={{
                                backgroundColor:
                                  activePage?.descriptionColor || "#6b7280",
                              }}
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Change Color
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <ColorPicker
                                  color={
                                    activePage?.descriptionColor || "#6b7280"
                                  }
                                  onChange={(color) =>
                                    updatePage(activePage.id, {
                                      descriptionColor: color,
                                    })
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Link Text Color */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Link Text Color
                          </label>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full border shadow-sm"
                              style={{
                                backgroundColor:
                                  activePage?.linkTextColor || "#ffffff",
                              }}
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Change Color
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <ColorPicker
                                  color={activePage?.linkTextColor || "#ffffff"}
                                  onChange={(color) =>
                                    updatePage(activePage.id, {
                                      linkTextColor: color,
                                    })
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Link Background Color */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Link Background Color
                          </label>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full border shadow-sm"
                              style={{
                                backgroundColor:
                                  activePage?.linkBackgroundColor || "#0ea5e9",
                              }}
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Change Color
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <ColorPicker
                                  color={
                                    activePage?.linkBackgroundColor || "#0ea5e9"
                                  }
                                  onChange={(color) =>
                                    updatePage(activePage.id, {
                                      linkBackgroundColor: color,
                                    })
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>

                      {/* Link Border Size */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Link Border Size
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="8"
                            step="1"
                            value={
                              (activePage?.linkBorderSize &&
                                parseInt(activePage.linkBorderSize)) ||
                              "0"
                            }
                            onChange={(e) =>
                              updatePage(activePage.id, {
                                linkBorderSize: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                          <span className="min-w-8 text-center">
                            {(activePage?.linkBorderSize &&
                              parseInt(activePage.linkBorderSize)) ||
                              "0"}
                            px
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Typography Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h2 className="text-lg font-medium mb-4">Typography</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Title Font */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Title Font
                          </label>
                          <select
  value={activePage?.titleFont || "Inter"}
  onChange={(e) =>
    updatePage(activePage.id, {
      titleFont: e.target.value,
    })
  }
  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
>
  {fonts.map((font) => (
    <option key={font} value={font}>
      {font}
    </option>
  ))}
</select>

                        </div>

                        {/* Description Font */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Description Font
                          </label>
                          <select
  value={activePage?.descriptionFont || "Inter"}
  onChange={(e) =>
    updatePage(activePage.id, {
      descriptionFont: e.target.value,
    })
  }
  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
>
  {fonts.map((font) => (
    <option key={font} value={font}>
      {font}
    </option>
  ))}
</select>

                        </div>

                        {/* Button Text Font */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Button Text Font
                          </label>
                          <select
  value={activePage?.buttonTextFont || "Inter"}
  onChange={(e) =>
    updatePage(activePage.id, {
      buttonTextFont: e.target.value,
    })
  }
  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
>
  {fonts.map((font) => (
    <option key={font} value={font}>
      {font}
    </option>
  ))}
</select>

                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium">Theme & Layout</h2>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <Paintbrush className="h-4 w-4 mr-2" />
                          Customize
                        </Button>
                      </div>

                      <TemplateSelector pageId={activePage.id} />
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="sticky top-24">
                      <h3 className="text-lg font-medium mb-4 text-center">
                        Preview
                      </h3>
                      <MobilePreview page={activePage} />
                    </div>
                  </div>
                </div>
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

      {/* Mobile Preview Floating Button (only on small screens) */}
      {activePage && (
        <div className="lg:hidden fixed bottom-6 right-6 z-30">
          <Button
            onClick={() => navigate(`/preview/${activePage.id}`)}
            className="rounded-full shadow-lg h-14 w-14 bg-blue-500 hover:bg-blue-600"
          >
            <Eye className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
