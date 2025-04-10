import React, { useState, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [selectedColor, setSelectedColor] = useState(color || '#0ea5e9');
  const [customColor, setCustomColor] = useState(color || '#0ea5e9');

  useEffect(() => {
    setSelectedColor(color);
    setCustomColor(color);
  }, [color]);

  const presetColors = [
    '#000000', // Black
    '#ffffff', // White
    '#0ea5e9', // Sky Blue (Default)
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#6b7280', // Gray
    '#1e293b', // Slate
  ];

  const handleColorClick = (newColor: string) => {
    setSelectedColor(newColor);
    onChange(newColor);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setSelectedColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === presetColor ? 'border-black scale-110' : 'border-gray-200'
            }`}
            style={{ backgroundColor: presetColor }}
            onClick={() => handleColorClick(presetColor)}
            aria-label={`Select color ${presetColor}`}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Custom Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="h-8 w-12 p-0 border rounded cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                setCustomColor(e.target.value);
              }
            }}
            onBlur={() => {
              if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
                onChange(customColor);
              } else {
                // Reset to a valid color if input is invalid
                setCustomColor(selectedColor);
              }
            }}
            className="flex-1 p-2 text-sm border rounded"
            placeholder="#0ea5e9"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;