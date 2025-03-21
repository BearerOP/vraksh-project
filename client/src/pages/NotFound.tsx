
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-25"></div>
            <div className="relative rounded-full bg-blue-100 text-blue-600 flex items-center justify-center w-24 h-24 text-3xl font-bold">
              404
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Page not found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or it never existed.
          </p>
          
          <Button asChild className="bg-blue-500 hover:bg-blue-600 transition-all duration-300">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
          <p>
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
