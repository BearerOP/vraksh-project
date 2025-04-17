import React from "react";
import { Copy, Eye, Link, QrCode } from "lucide-react";
import { toast } from "sonner";

const ShareDrawerContent = ({
    activePage
    , setIsShareDrawerOpen
}) => {
    const handleCopyLink = () => {
        if (activePage) {
            const url = `${import.meta.env.VITE_VRAKSH_APP_URL}/${activePage.title}`;
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

    return (
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
};

export default ShareDrawerContent;