import React, { useState } from 'react';
import { useLinks } from '@/context/LinkContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { addItemToBranch } from '@/lib/apis';
import { toast } from 'sonner';

interface LinkFormProps {
  pageId: string;
}

const LinkForm: React.FC<LinkFormProps> = ({ pageId }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addLink } = useLinks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && url.trim()) {
      try {
        setLoading(true);
        const response = await addItemToBranch(pageId, title, url);
        
        if (response.status !== 201) {
          throw new Error('Failed to add link');
        }
        
        // Still use addLink to update local state
        addLink(pageId, title, url);
        
        toast.success('Link added successfully');
        setTitle('');
        setUrl('');
        setExpanded(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to add link');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!expanded) {
    return (
      <Button
        onClick={() => setExpanded(true)}
        className="w-full transition-all duration-300 border border-dashed border-border bg-transparent hover:bg-muted/50 hover:border-primary/30 text-muted-foreground"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Link
      </Button>
    );
  }

  return (
    <Card className="p-4 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Link Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. My Portfolio"
            className="transition-all duration-200"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            URL
          </label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="transition-all duration-200"
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setExpanded(false)}
            className="transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="transition-all duration-200 bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Link'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LinkForm;
