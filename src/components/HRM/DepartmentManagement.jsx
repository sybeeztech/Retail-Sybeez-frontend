import React, { useState } from 'react';
import { Search, Plus, Building2, Users, Eye, Edit, X } from 'lucide-react';

const DepartmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = [
    {
      id: 1,
      name: 'Engineering',
      manager: 'Sarah Johnson',
      description: 'Software development and technical operations',
      employeeCount: 15,
      budget: '$2,400,000',
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'Sales',
      manager: 'Mike Chen',
      description: 'Sales operations and customer acquisition',
      employeeCount: 12,
      budget: '$1,800,000',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      name: 'Marketing',
      manager: 'Jennifer Brown',
      description: 'Brand management and digital marketing',
      employeeCount: 8,
      budget: '$1,200,000',
      location: 'Chicago, IL'
    }
  ];

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Department Management</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Department
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <div key={dept.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">{dept.name}</h3>
              <p className="text-gray-600">{dept.manager}</p>
              <p className="text-sm text-gray-500">{dept.description}</p>
              <div className="mt-4 flex justify-between">
                <span>Employees: {dept.employeeCount}</span>
                <span>{dept.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
