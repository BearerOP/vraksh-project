import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface MobilePreviewButtonProps {
  pageId: string;
}

const MobilePreviewButton: React.FC<MobilePreviewButtonProps> = ({ pageId }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-30">
      <Button
        onClick={() => navigate(`/preview/${pageId}`)}
        className="rounded-full shadow-lg h-14 w-14 bg-blue-500 hover:bg-blue-600"
      >
        <Eye className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobilePreviewButton;