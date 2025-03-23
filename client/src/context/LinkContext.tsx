
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Link {
  id: string;
  title: string;
  url: string;
  active: boolean;
}

export type TemplateType = 'default' | 'minimal' | 'gradient' | 'dark' | 'rounded' | 'glass' | 'neon' | 'futuristic';

export interface Page {
  id: string;
  title: string;
  links: Link[];
  theme: 'light' | 'dark';
  accentColor: string;
  template: TemplateType;
}

interface LinkContextType {
  pages: Page[];
  activePage: Page | null;
  setActivePage: (page: Page) => void;
  addPage: (title: string) => void;
  updatePage: (pageId: string, updates: Partial<Omit<Page, 'id'>>) => void;
  deletePage: (pageId: string) => void;
  addLink: (pageId: string, title: string, url: string) => void;
  updateLink: (pageId: string, linkId: string, updates: Partial<Omit<Link, 'id'>>) => void;
  deleteLink: (pageId: string, linkId: string) => void;
  reorderLinks: (pageId: string, startIndex: number, endIndex: number) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

// Sample initial data
const initialPages: Page[] = [
  {
    id: '1',
    title: 'My Personal Links',
    links: [
      { id: '1', title: 'Portfolio', url: 'https://example.com/portfolio', active: true },
      { id: '2', title: 'LinkedIn', url: 'https://linkedin.com', active: true },
      { id: '3', title: 'Twitter', url: 'https://twitter.com', active: true },
    ],
    theme: 'light',
    accentColor: '#0ea5e9',
    template: 'default',
  },
];

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or use default data
  const [pages, setPages] = useState<Page[]>(() => {
    const savedPages = localStorage.getItem('pages');
    return savedPages ? JSON.parse(savedPages) : initialPages;
  });
  
  const [activePage, setActivePage] = useState<Page | null>(null);

  // Set the first page as active by default
  useEffect(() => {
    if (pages.length > 0 && !activePage) {
      setActivePage(pages[0]);
    }
  }, [pages, activePage]);

  // Save to localStorage whenever pages change
  useEffect(() => {
    localStorage.setItem('pages', JSON.stringify(pages));
  }, [pages]);

  // Add a new page
  const addPage = (title: string) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title,
      links: [],
      theme: 'light',
      accentColor: '#0ea5e9',
      template: 'default',
    };
    
    setPages([...pages, newPage]);
    setActivePage(newPage);
  };

  // Update an existing page
  const updatePage = (pageId: string, updates: Partial<Omit<Page, 'id'>>) => {
    const updatedPages = pages.map(page => 
      page.id === pageId ? { ...page, ...updates } : page
    );
    
    setPages(updatedPages);
    
    // If active page was updated, update that reference too
    if (activePage && activePage.id === pageId) {
      const updatedActivePage = updatedPages.find(p => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Delete a page
  const deletePage = (pageId: string) => {
    const updatedPages = pages.filter(page => page.id !== pageId);
    setPages(updatedPages);
    
    // If active page was deleted, set the first available page as active or null
    if (activePage && activePage.id === pageId) {
      setActivePage(updatedPages.length > 0 ? updatedPages[0] : null);
    }
  };

  // Add a link to a page
  const addLink = (pageId: string, title: string, url: string) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title,
      url,
      active: true,
    };
    
    const updatedPages = pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          links: [...page.links, newLink]
        };
      }
      return page;
    });
    
    setPages(updatedPages);
    
    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage = updatedPages.find(p => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Update a link
  const updateLink = (pageId: string, linkId: string, updates: Partial<Omit<Link, 'id'>>) => {
    const updatedPages = pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          links: page.links.map(link => 
            link.id === linkId ? { ...link, ...updates } : link
          )
        };
      }
      return page;
    });
    
    setPages(updatedPages);
    
    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage = updatedPages.find(p => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Delete a link
  const deleteLink = (pageId: string, linkId: string) => {
    const updatedPages = pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          links: page.links.filter(link => link.id !== linkId)
        };
      }
      return page;
    });
    
    setPages(updatedPages);
    
    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage = updatedPages.find(p => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  // Reorder links (for drag and drop)
  const reorderLinks = (pageId: string, startIndex: number, endIndex: number) => {
    const pageToUpdate = pages.find(page => page.id === pageId);
    
    if (!pageToUpdate) return;
    
    const newLinks = [...pageToUpdate.links];
    const [removed] = newLinks.splice(startIndex, 1);
    newLinks.splice(endIndex, 0, removed);
    
    const updatedPages = pages.map(page => {
      if (page.id === pageId) {
        return { ...page, links: newLinks };
      }
      return page;
    });
    
    setPages(updatedPages);
    
    // Update active page if needed
    if (activePage && activePage.id === pageId) {
      const updatedActivePage = updatedPages.find(p => p.id === pageId) || null;
      setActivePage(updatedActivePage);
    }
  };

  const value = {
    pages,
    activePage,
    setActivePage,
    addPage,
    updatePage,
    deletePage,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks
  };

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
};

export const useLinks = (): LinkContextType => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useLinks must be used within a LinkProvider');
  }
  return context;
};
