import { SocialIcon } from "@/utils/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { updateBranch } from "@/lib/apis";
import { toast } from "sonner";

export interface Link {
  id: string;
  title: string;
  url: string;
  active: boolean;
  index?: number;
  style?: string; // Optional, for future use
  iconUrl?: string; // Optional, for future use
  imageUrl?: string;
  description?: string; // Optional, for future use
  publisher?: string; // Optional, for future use
}

export type TemplateType =
  | "default"
  | "minimal"
  | "gradient"
  | "dark"
  | "rounded"
  | "glass"
  | "neon"
  | "futuristic"
  | "pastel"
  | "cyberpunk"
  | "vintage"
  | "aesthetic"
  | "wood"
  | "ocean"
  | "retro"
  | "holographic"
  | "monochrome"
  | "lava"
  | "matrix"
  | "winter"
  | "golden"
  | "metallic"
  | "comic"
  | "gothic"
  | "sunset"
  | "forest"
  | "vaporwave"
  | "royal";

export interface Page {
  id: string;
  title: string;
  links: Link[];
  imageUrl: string;
  description?: string; // Optional, for future use
  socialIcons?: SocialIcon[]; // Optional, for future use
  titleColor: string;
  descriptionColor: string;
  linkTextColor: string;
  linkBorderSize: string;
  linkBackgroundColor: string;
  titleFont: string;
  descriptionFont: string;
  buttonTextFont: string;
  avatarRounded: string;
  templateId?: string; // Optional, for future use
  backgroundImageUrl?: string; // Optional, for future use
}

// Type for API responses
interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
}

interface LinkContextType {
  pages: Page[];
  activePage: Page | null;
  setActivePage: (page: Page) => void;
  setPages: (pages: Page[]) => void;
  addPage: (title: string) => void;
  updatePage: (pageId: string, updates: Partial<Omit<Page, "id">>) => void;
  deletePage: (pageId: string) => void;
  addLink: (pageId: string, link: Link) => void;
  updateLink: (
    pageId: string,
    linkId: string,
    updates: Partial<Omit<Link, "id">>
  ) => void;
  deleteLink: (pageId: string, linkId: string) => void;
  reorderLinks: (pageId: string, startIndex: number, endIndex: number) => void;
  isUpdating: boolean;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state without localStorage
  const [pages, setPages] = useState<Page[]>([]);
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Refs for debouncing
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdatesRef = useRef<{
    [key: string]: Partial<Omit<Page, "id">>;
  }>({});

  // No longer set the first page as active by default - handled by Dashboard

  // No longer saving to localStorage

  // Add a new page
  const addPage = (title: string) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title,
      links: [],
      templateId: "default",
      imageUrl: "",
      titleColor: "#000000",
      descriptionColor: "#000000",
      linkTextColor: "#000000",
      linkBorderSize: "2px",
      linkBackgroundColor: "#ffffff",
      titleFont: "Arial",
      descriptionFont: "Arial",
      buttonTextFont: "Arial",
      avatarRounded: "50%",
      socialIcons: [],
      description: "",
      backgroundImageUrl: "",
    };

    setPages([...pages, newPage]);
    setActivePage(newPage);
  };

  // Update an existing page
  const updatePage = (pageId: string, updates: Partial<Omit<Page, "id">>) => {
    // Immediately update UI for better user experience
    const updatedPages = pages.map((page) =>
      page.id === pageId ? { ...page, ...updates } : page
    );
    setPages(updatedPages);

    // If active page was updated, update that reference too
    if (activePage && activePage.id === pageId) {
      const updatedActivePage =
        updatedPages.find((p) => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }

    // Store the latest updates for this page
    pendingUpdatesRef.current[pageId] = {
      ...(pendingUpdatesRef.current[pageId] || {}),
      ...updates,
    };

    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Set updating state to true
    setIsUpdating(true);

    // Debounce API call - wait 500ms after last change
    updateTimeoutRef.current = setTimeout(() => {
      // Get the latest updates for this page
      const latestUpdates = pendingUpdatesRef.current[pageId];

      if (!latestUpdates) {
        setIsUpdating(false);
        return;
      }

      // Clear pending updates for this page
      delete pendingUpdatesRef.current[pageId];

      // Make API call with latest updates
      try {
        updateBranch(pageId, latestUpdates)
          .then((response) => {
            const data = response.data as ApiResponse;
            if (!data.success) {
              throw new Error(data.message || "Failed to update settings");
            }
          })
          .catch((error) => {
            console.error("API error:", error);
            toast.error("Failed to save changes to the server");
          })
          .finally(() => {
            // Only set updating to false if no more pending updates
            if (Object.keys(pendingUpdatesRef.current).length === 0) {
              setIsUpdating(false);
            }
          });
      } catch (error) {
        console.error("Error updating page:", error);
        toast.error("Failed to save changes");
        setIsUpdating(false);
      }
    }, 500); // 500ms debounce time
  };

  // Delete a page
  const deletePage = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    setPages(updatedPages);

    // If active page was deleted, set the first available page as active or null
    if (activePage && activePage.id === pageId) {
      setActivePage(updatedPages.length > 0 ? updatedPages[0] : null);
    }
  };

  // Add a link to a page
  const addLink = (pageId: string, link: Link) => {
    const newLink: Link = {
      id: link.id,
      title: link.title,
      url: link.url,
      active: true,
    };

    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        return {
          ...page,
          links: [...page.links, newLink],
        };
      }
      return page;
    });

    setPages(updatedPages);

    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage =
        updatedPages.find((p) => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Update a link
  const updateLink = (
    pageId: string,
    linkId: string,
    updates: Partial<Omit<Link, "id">>
  ) => {
    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        console.log(page.links, "page links");
        return {
          ...page,
          links: page.links.map((link) =>
            link.id === linkId ? { ...link, ...updates } : link
          ),
        };
      }
      return page;
    });

    setPages(updatedPages);

    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage =
        updatedPages.find((p) => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Delete a link
  const deleteLink = (pageId: string, linkId: string) => {
    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        return {
          ...page,
          links: page.links.filter((link) => link.id !== linkId),
        };
      }
      return page;
    });

    setPages(updatedPages);

    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage =
        updatedPages.find((p) => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Reorder links (for drag and drop)
  const reorderLinks = (
    pageId: string,
    startIndex: number,
    endIndex: number
  ) => {
    const pageToUpdate = pages.find((page) => page.id === pageId);

    if (!pageToUpdate) return;

    const newLinks = [...pageToUpdate.links];
    const [removed] = newLinks.splice(startIndex, 1);
    newLinks.splice(endIndex, 0, removed);

    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        return { ...page, links: newLinks };
      }
      return page;
    });

    setPages(updatedPages);

    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage =
        updatedPages.find((p) => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  const value = {
    pages,
    activePage,
    setActivePage,
    setPages,
    addPage,
    updatePage,
    deletePage,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    isUpdating,
  };

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
};

export const useLinks = (): LinkContextType => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
};
