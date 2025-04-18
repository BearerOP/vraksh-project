import React from "react";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9]">
      <div className="flex-1 min-w-full mx-auto flex relative">
        {/* Sidebar Skeleton */}
        <div className="hidden md:block w-64 bg-white border-r">
          <div className="p-6 space-y-6">
            {/* Logo/Brand Skeleton */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            {/* Dropdown Skeleton */}
            <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-lg"></div>
            
            {/* Nav Items Skeleton */}
            <div className="space-y-3">
              <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-9 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-3 w-14 bg-gray-200 animate-pulse rounded mt-6"></div>
              <div className="h-9 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-9 w-full bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
          
          {/* User Profile Skeleton */}
          <div className="absolute bottom-0 w-64 border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1 p-6">
          {/* Header Skeleton */}
          <div className="hidden sm:flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Forms and settings area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="space-y-4 w-1/2">
                    <div className="h-48 w-48 bg-gray-200 animate-pulse rounded-full mx-auto"></div>
                    <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mx-auto"></div>
                  </div>
                  <div className="space-y-4 w-1/2">
                    <div className="h-48 w-[90%] bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-9 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Color settings skeleton */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-24 w-full bg-gray-200 animate-pulse rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Typography skeleton */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Preview area */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded mx-auto mb-4"></div>
                {/* Use the existing MobilePreviewSkeleton */}
                <div className="relative w-[293px] mx-auto">
                  {/* Phone Frame */}
                  <div
                    className="absolute inset-0 border-[8px] rounded-[50px] shadow-2xl z-10 pointer-events-none border-[#ebebeb]"
                  ></div>
                  
                  {/* Mobile Preview Content - Skeleton */}
                  <div
                    className="relative z-0 overflow-hidden rounded-[51px] transition-colors duration-300 bg-gray-100"
                    style={{
                      height: 525,
                    }}
                  >
                    <div className="py-10 px-6 flex flex-col items-center h-full overflow-y-auto">
                      {/* Profile Section Skeleton */}
                      <div className="mb-8 text-center w-full">
                        <div className="mx-auto mb-4 size-16 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-20 mx-auto bg-gray-200 animate-pulse rounded-md mb-2"></div>
                        <div className="h-3 w-32 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
                        
                        {/* Social icons skeleton */}
                        <div className="flex justify-center items-center gap-2 mt-3">
                          {[...Array(3)].map((_, index) => (
                            <div 
                              key={index} 
                              className="h-7 w-7 rounded-md bg-gray-200 animate-pulse"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Links Section Skeleton */}
                      <div className="w-full space-y-3 pb-20">
                        {[...Array(5)].map((_, index) => (
                          <div 
                            key={index}
                            className="w-full h-10 bg-gray-200 animate-pulse rounded-md"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Skeleton */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-30">
        <div className="flex justify-around items-center h-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center w-full h-full">
              <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-3 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton; 