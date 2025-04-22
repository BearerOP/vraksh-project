// 5. ThemeTabContent Component
import React from "react";
import { useLinks } from "@/context/LinkContext";

import MobilePreview from "@/components/MobilePreview";
import ProfileSettings from "./ProfileSettings";
import BackgroundSettings from "./BackgroundSettings";
import ColorSettingsSection from "./ColorSettingSection";
import TypographySettings from "./TypographySettings";
import ThemeSettings from "./ThemeSettings";

const ThemeTabContent: React.FC = () => {
  const { activePage } = useLinks();

  return (
    <div className="grid grid-cols-1 p-6 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
          <div className="flex justify-around gap-6 flex-col xl:flex-row">
            <ProfileSettings />
            <BackgroundSettings pageId={activePage.id} />
          </div>
        </div>

        {/* Colors and Typography */}
        <ColorSettingsSection pageId={
          activePage.id
        } />
        <TypographySettings pageId={activePage.id}  />
        <ThemeSettings pageId={activePage.id} />
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <h3 className="text-lg font-medium mb-4 text-center">Preview</h3>
          <MobilePreview page={activePage} />
        </div>
      </div>
    </div>
  );
};

export default ThemeTabContent;