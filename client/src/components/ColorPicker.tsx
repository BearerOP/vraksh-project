// components/ColorPicker.tsx
import React from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#eab308", // yellow
    "#84cc16", // lime
    "#22c55e", // green
    "#10b981", // emerald
    "#14b8a6", // teal
    "#06b6d4", // cyan
    "#0ea5e9", // sky
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#8b5cf6", // violet
    "#a855f7", // purple
    "#d946ef", // fuchsia
    "#ec4899", // pink
    "#f43f5e", // rose
    "#0f172a", // slate
  ];

  return (
    <div className="p-2">
      <h3 className="text-sm font-medium mb-3">Select color</h3>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((colorOption) => (
          <button
            key={colorOption}
            className={`w-8 h-8 rounded-full ${
              colorOption === color ? "ring-2 ring-offset-2 ring-black" : ""
            }`}
            style={{ backgroundColor: colorOption }}
            onClick={() => onChange(colorOption)}
            aria-label={`Select color ${colorOption}`}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm mb-1">Custom color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded p-1"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="px-2 py-1 border rounded flex-1"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;