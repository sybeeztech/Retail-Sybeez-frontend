import React, { useState, useRef, useEffect } from 'react';
import { useEmployeeStore } from '../../store/employeeStore';
import { Plus, ChevronDown, Check } from 'lucide-react';

const DepartmentDropdown = ({ 
  value, 
  onChange, 
  onAddDepartment, 
  disabled, 
  className, 
  theme 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { departments, fetchDepartments } = useEmployeeStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsCreating(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (departmentName) => {
    onChange(departmentName);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleCreateNew = async () => {
    if (searchTerm.trim() && onAddDepartment) {
      await onAddDepartment(searchTerm.trim());
      setIsCreating(false);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const showCreateOption = searchTerm.trim() && 
    !departments.some(dept => 
      dept.name.toLowerCase() === searchTerm.toLowerCase()
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm(value);
          }}
          disabled={disabled}
          className={className}
          placeholder="Select or type to create department"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={`absolute inset-y-0 right-0 flex items-center pr-2 ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <ChevronDown 
            size={16} 
            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
          />
        </button>
      </div>

      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 rounded-md shadow-lg ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-white'
        } border ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
        } max-h-60 overflow-auto`}>
          <div className="py-1">
            {/* Existing departments */}
            {filteredDepartments.map((department) => (
              <button
                key={department.id}
                type="button"
                onClick={() => handleSelect(department.name)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                  value === department.name
                    ? theme === 'dark' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-900'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-600'
                      : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{department.name}</span>
                {department.employeeCount !== undefined && (
                  <span className={`text-xs ${
                    value === department.name
                      ? theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ({department.employeeCount})
                  </span>
                )}
                {value === department.name && (
                  <Check size={16} />
                )}
              </button>
            ))}

            {/* Create new department option */}
            {showCreateOption && (
              <button
                type="button"
                onClick={handleCreateNew}
                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                  theme === 'dark' 
                    ? 'text-green-400 hover:bg-gray-600' 
                    : 'text-green-600 hover:bg-gray-100'
                }`}
              >
                <Plus size={16} />
                <span>Create "{searchTerm}"</span>
              </button>
            )}

            {filteredDepartments.length === 0 && !showCreateOption && searchTerm && (
              <div className={`px-4 py-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No departments found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDropdown;