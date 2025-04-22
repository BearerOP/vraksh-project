import React, { useState, useEffect } from 'react';
import Chrome from '@uiw/react-color-chrome';
import {
  HsvaColor,
  hsvaToRgbaString,
  hsvaToHex,
  rgbaToHsva,
} from '@uiw/color-convert';

interface ColorPickerProps {
  color: string; // rgba string like 'rgba(14, 165, 233, 1)'
  onChange: (color: string) => void;
}

const parseHSVA = (rgba: string): HsvaColor => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
  if (match) {
    return rgbaToHsva({
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: parseFloat(match[4]),
    });
  }
  return { h: 195, s: 0.87, v: 0.91, a: 1 };
};

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [hsva, setHsva] = useState<HsvaColor>(parseHSVA(color));

  useEffect(() => {
    setHsva(parseHSVA(color));
  }, [color]);

  const handleChange = (newColor: { hsva: HsvaColor }) => {
    setHsva(newColor.hsva);
    onChange(hsvaToRgbaString(newColor.hsva));
  };

  const presetColors = [
    'rgba(0,0,0,1)',
    'rgba(255,255,255,1)',
    'rgba(14,165,233,1)',
    'rgba(239,68,68,1)',
    'rgba(249,115,22,1)',
    'rgba(234,179,8,1)',
    'rgba(34,197,94,1)',
    'rgba(59,130,246,1)',
    'rgba(139,92,246,1)',
    'rgba(236,72,153,1)',
    'rgba(107,114,128,1)',
    'rgba(30,41,59,1)',
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presetColors.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              color === preset ? 'border-black scale-110' : 'border-gray-200'
            }`}
            style={{ backgroundColor: preset }}
            onClick={() => {
              const match = preset.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
              if (match) {
                const newHsva = rgbaToHsva({
                  r: parseInt(match[1], 10),
                  g: parseInt(match[2], 10),
                  b: parseInt(match[3], 10),
                  a: parseFloat(match[4]),
                });
                setHsva(newHsva);
                onChange(hsvaToRgbaString(newHsva));
              }
            }}
            aria-label={`Select color ${preset}`}
          />
        ))}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Color Picker</label>
        <Chrome
          color={hsva}
          style={{ marginTop: 10 }}
          showAlpha={true}
          onChange={handleChange}
        />
      </div>

      <div style={{ background: hsvaToRgbaString(hsva), marginTop: 30, padding: 10 }}>
        {hsvaToRgbaString(hsva)}
      </div>
    </div>
  );
};

export default ColorPicker;
