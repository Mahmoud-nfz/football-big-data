"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "~/assets/icons";

interface DropDownSelectorProps {
  icon: React.ReactNode;
  current: string;
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
  dropDirection?: 'up' | 'down'; // Optional prop to control the dropdown direction
}

export const DropDownSelector: React.FC<DropDownSelectorProps> = ({
  icon,
  current,
  options,
  onSelect,
  className,
  dropDirection = 'down', // Default to 'down' if not specified
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownClass = dropDirection === 'up' ? 'bottom-full mb-1' : 'mt-1';

  return (
    <div ref={dropdownRef} className={className ?? "relative mx-1 w-1/2"}>
      <div
        className="flex cursor-pointer flex-row items-center rounded-lg bg-white px-5 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <div className="ml-3 text-sm font-bold">{current}</div>
        <ChevronDownIcon className="ml-auto h-5 w-5" />
      </div>
      {isOpen && (
        <div className={`absolute z-10 w-full rounded-md bg-white shadow-lg ${dropdownClass}`}>
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
