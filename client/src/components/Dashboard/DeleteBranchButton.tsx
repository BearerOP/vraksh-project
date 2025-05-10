import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteBranch } from "@/lib/apis";
import { useLinks } from "@/context/LinkContext";
import { toast } from "sonner";

interface DeleteBranchButtonProps {
  branchId: string;
  branchName: string;
  className?: string;
}

export default function DeleteBranchButton({ branchId, branchName, className }: DeleteBranchButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pages, setPages, setActivePage } = useLinks();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsDeleting(true);
      const response = await deleteBranch(branchId);
      
      if (response.status === 200) {
        // Update local state
        const updatedPages = pages.filter(page => page.id !== branchId);
        setPages(updatedPages);
        
        // If there are other pages, set the first one as active
        if (updatedPages.length > 0) {
          setActivePage(updatedPages[0]);
          navigate(`/dashboard?page=${updatedPages[0].id}`);
        } else {
          // If no pages left, redirect to create new branch
          navigate("/new-branch");
        }
        
        toast.success("Branch deleted successfully");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
      toast.error("Failed to delete branch");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 ${className}`}
          onClick={handleTriggerClick}
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete Branch</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the branch
            "{branchName}" and all its associated items.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 