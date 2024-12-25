import { useState, useRef, useEffect } from "react";
import arrowIcon from "../assets/down arrow.svg";

export interface IDropdownOption {
  label: string;
  value: string;
}

interface IDropdownButtonProps {
  options: IDropdownOption[];
  onSelect: (value: string) => void;
  initialValue?: string;
}

const DropdownButton = ({
  options,
  onSelect,
  initialValue,
}: IDropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue || options[0]?.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-1 rounded-2xl items-center justify-center flex bg-gray-300 hover:bg-gray-300/80 transition-colors duration-300"
      >
        <span className="text-sm">{selectedLabel}</span>
        <img
          src={arrowIcon}
          alt=""
          className={`transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute bottom-full mb-1 bg-white rounded-lg shadow-lg min-w-[100px] max-h-[300px] overflow-y-auto transition-all duration-300 ${
          isOpen ? "opacity-100 max-h-[300px] h-auto" : "opacity-0 max-h-0 h-0"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownButton;
