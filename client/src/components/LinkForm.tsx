"use client";

import React, { useState } from "react";
import { useLinks } from "@/context/LinkContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";
import { addItemToBranch } from "@/lib/apis";
import { toast } from "sonner";

interface LinkFormProps {
  pageId: string;
}

const LinkForm: React.FC<LinkFormProps> = ({ pageId }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addLink } = useLinks();

  const predefinedApps = [
    {
      name: "Instagram",
      icon: "/icon/instagram.svg",
      url: "https://instagram.com",
    },
    { name: "TikTok", icon: "/icon/tiktok.svg", url: "https://tiktok.com" },
    { name: "YouTube", icon: "/icon/youtube.svg", url: "https://youtube.com" },
    { name: "Spotify", icon: "/icon/spotify.svg", url: "https://spotify.com" },
    {
      name: "Apple Music",
      icon: "/icon/apple-music.svg",
      url: "https://music.apple.com",
    },
    { name: "X", icon: "/icon/x.svg", url: "https://x.com" },
  ];

  const formatUrl = (input: string) => {
    let formattedUrl = input.trim();
    const foundApp = predefinedApps.find(
      (app) => app.name.toLowerCase() === formattedUrl.toLowerCase()
    );

    if (foundApp) {
      return {
        isValid: true,
        url: foundApp.url,
        title: foundApp.name,
        isPredefined: true,
        app: foundApp,
      };
    }

    if (!formattedUrl.match(/^https?:\/\//i)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      const urlObj = new URL(formattedUrl);
      const domain = urlObj.hostname.replace("www.", "");
      const suggestedTitle = domain.charAt(0).toUpperCase() + domain.slice(1);

      return {
        isValid: true,
        url: formattedUrl,
        title: suggestedTitle,
        isPredefined: false,
      };
    } catch (err) {
      return { isValid: false };
    }
  };

  // 🚀 Updated: now hitting your OWN server
  const scrapeWebsiteMetadata = async (urlString: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.VITE_VRAKSH_SERVER_URL}/api/scrape?url=${encodeURIComponent(urlString)}`
      );
      const metadata = await response.json();

      if (metadata.error) {
        throw new Error(metadata.error);
      }

      return {
        title: metadata.title || "",
        description: metadata.description || "",
        logo: metadata.logo || metadata.image || "",
        url: urlString || metadata.url,
        image: metadata.image || "",
        publisher: metadata.publisher || "",

      };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setError("");

    if (value.includes(".")) {
      try {
        const urlData = formatUrl(value);
        if (urlData.isValid && !title) {
          setTitle(urlData.title);
        }
      } catch (err) {
        // ignore
      }
    }
  };

  const handleAppSelection = (app: { name: string; url: string }) => {
    setUrl(app.url);
    setTitle(app.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlData = formatUrl(url);
    if (!urlData.isValid) {
      setError("Please enter a valid URL or app name");
      return;
    }

    if (title.trim() && url.trim()) {
      try {
        setLoading(true);

        let metadata = {
          title: title.trim(),
          url: urlData.url,
          publisher: "",
          description: "",
          logo: "",
          image: "",
        };

        // 🧠 Fetch metadata only if it's NOT predefined
        if (!urlData.isPredefined) {
          metadata = await scrapeWebsiteMetadata(urlData.url);
        }

        const response = await addItemToBranch(
          pageId,
          metadata.title,
          metadata.url,
          metadata.logo,
          metadata.description,
          metadata.image,
          metadata.publisher
        );

        if (response.status !== 201) {
          throw new Error("Failed to add link");
        }

        const link = {
          id: (response as { data: { data: string[] } }).data.data.pop(),
          title: metadata.title,
          url: metadata.url,
          icon: metadata.logo,
          description: metadata.description,
          active: true,
        };

        addLink(pageId, link);

        toast.success("Link added successfully");
        setTitle("");
        setUrl("");
        setExpanded(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add link");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setExpanded(false);
    setTitle("");
    setUrl("");
    setError("");
  };

  if (!expanded) {
    return (
      <Button
        onClick={() => setExpanded(true)}
        className="w-full transition-all duration-300 border border-dashed border-emerald-500 bg-transparent hover:bg-emerald-50 text-muted-foreground"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Link
      </Button>
    );
  }

  return (
    <Card className="p-4 rounded-xl shadow-sm bg-background animate-fade-in space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Enter URL or app name"
              value={url}
              onChange={handleUrlChange}
              className={`pl-9 pr-4 py-2 ${
                error ? "border-red-500 focus:ring-red-200" : ""
              }`}
              autoFocus
              required
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Title Input */}
          <Input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2"
          />
        </div>

        {/* Quick Add Apps */}
        <div className="border rounded-lg p-3 bg-muted/30 space-y-3">
          <h3 className="text-xs text-muted-foreground flex items-center">
            <span className="mr-1">✨</span> Quick add
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {predefinedApps.map((app) => (
              <button
                key={app.name}
                type="button"
                className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-muted hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => handleAppSelection(app)}
              >
                <img src={app.icon} alt={app.name} className="h-6 w-6" />
                <span className="text-xs font-medium">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !url.trim()}
            className="relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </span>
            ) : (
              "Add Link"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LinkForm;
