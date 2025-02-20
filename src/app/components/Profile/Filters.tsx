'use clinte'

import { useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

export default function FilterDropdown({
    selectedValues,
    setSelectedValues,
    options,
    label
  }: {
    selectedValues: string[], 
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>, 
    options: string[], 
    label: string
  }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleChange = (value: string) => {
      setSelectedValues((prev) => 
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
      };
  
    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 pl-4 pr-6 rounded-full w-full text-white flex justify-between items-center gap-2 bg-gradient-to-r from-[#0056A6] to-[#0587FF]"
            >
                <FaChevronDown className="text-white" />
                {selectedValues.includes("All") ? label : `${label}: ${selectedValues.join(", ")}`}
            </button>
  
            {isDropdownOpen && (
                <div className="fixed p-6 inset-0 z-10 bg-white p-4 shadow-lg mt-0 md:absolute md:mt-10 md:p-0">
                    <div className="mt-4 shadow-none border-none md:absolute md:shadow-lg z-10 bg-white w-full md:border rounded mt-2 md:p-2 ">
                        <div className="flex justify-between items-center mb-10 md:hidden">
                            <h3 className="font-semibold text-2xl">{label} </h3>
                            <FaTimes
                                onClick={closeDropdown}
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                            />
                        </div>
                            {options.map((option) => (
                                <label key={option} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={selectedValues.includes(option)}
                                        onChange={() => handleChange(option)}
                                        className="text-blue-500"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                    </div>
                </div>
            )}
      </div>
    );
  }