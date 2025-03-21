
import React from 'react';
import { Link } from 'react-router-dom';
import { useLinks } from '@/context/LinkContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, Home, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { addPage } = useLinks();
  
  const handleAddPage = () => {
    addPage('New Page');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 transition-all-300 hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">L</span>
          </div>
          <span className="font-medium tracking-tight">LinkTree</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="w-9 h-9">
            <Link to="/" aria-label="Home">
              <Home className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="icon" className="w-9 h-9">
            <Link to="/dashboard" aria-label="Dashboard">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          
          <Button 
            onClick={handleAddPage} 
            size="sm"
            className="transition-all-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-md hover:scale-[1.02] hover:from-blue-600 hover:to-blue-700 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
