import React from "react";
import { cn } from "@/lib/utils";

const MobilePreviewSkeleton: React.FC = () => {
  return (
    <div className="relative w-[293px] mx-auto">
      {/* Phone Frame */}
      <div
        style={{
          boxShadow:
            "0 121px 49px #00000005,0 68px 41px #00000014,0 30px 30px #00000024,0 8px 17px #00000029",
        }}
        className={cn(
          "absolute inset-0 border-[8px] rounded-[50px] shadow-2xl z-10 pointer-events-none border-[#ebebeb]"
        )}
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

          {/* Footer Skeleton */}
          <div className="absolute bottom-0 pb-4 min-h-16 w-full bg-gradient-to-t from-gray-200 via-gray-200/60 to-transparent">
            <div className="h-4 w-4 mx-auto bg-gray-300 animate-pulse rounded-full mb-1 mt-2"></div>
            <div className="h-3 w-16 mx-auto bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreviewSkeleton; 