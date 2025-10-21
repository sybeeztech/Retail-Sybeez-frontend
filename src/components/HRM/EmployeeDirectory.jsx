import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  User,
  Users,
  Calendar,
  Download,
  MoreVertical
} from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

const EmployeeDirectory = () => {
  const { theme } = useSettingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Software Developer',
      manager: 'Sarah Johnson',
      hireDate: '2022-03-15',
      status: 'Active',
      salary: '$95,000',
      location: 'New York, NY',
      avatar: null
    },
    {
      id: 2,
      employeeId: 'EMP002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Engineering',
      position: 'Engineering Manager',
      manager: 'David Wilson',
      hireDate: '2021-01-10',
      status: 'Active',
      salary: '$120,000',
      location: 'New York, NY',
      avatar: null
    },
    {
      id: 3,
      employeeId: 'EMP003',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Sales',
      position: 'Sales Manager',
      manager: 'Lisa Rodriguez',
      hireDate: '2021-08-22',
      status: 'Active',
      salary: '$85,000',
      location: 'San Francisco, CA',
      avatar: null
    },
    {
      id: 4,
      employeeId: 'EMP004',
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Sales',
      position: 'Sales Director',
      manager: 'David Wilson',
      hireDate: '2020-05-18',
      status: 'Active',
      salary: '$110,000',
      location: 'San Francisco, CA',
      avatar: null
    },
    {
      id: 5,
      employeeId: 'EMP005',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Management',
      position: 'CEO',
      manager: null,
      hireDate: '2019-01-01',
      status: 'Active',
      salary: '$200,000',
      location: 'New York, NY',
      avatar: null
    },
    {
      id: 6,
      employeeId: 'EMP006',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@company.com',
      phone: '+1 (555) 678-9012',
      department: 'Marketing',
      position: 'Marketing Specialist',
      manager: 'Jennifer Brown',
      hireDate: '2022-09-12',
      status: 'Active',
      salary: '$65,000',
      location: 'Chicago, IL',
      avatar: null
    },
    {
      id: 7,
      employeeId: 'EMP007',
      firstName: 'Jennifer',
      lastName: 'Brown',
      email: 'jennifer.brown@company.com',
      phone: '+1 (555) 789-0123',
      department: 'Marketing',
      position: 'Marketing Manager',
      manager: 'David Wilson',
      hireDate: '2021-04-05',
      status: 'Active',
      salary: '$80,000',
      location: 'Chicago, IL',
      avatar: null
    },
    {
      id: 8,
      employeeId: 'EMP008',
      firstName: 'Robert',
      lastName: 'Taylor',
      email: 'robert.taylor@company.com',
      phone: '+1 (555) 890-1234',
      department: 'HR',
      position: 'HR Specialist',
      manager: 'Amanda White',
      hireDate: '2022-11-28',
      status: 'Active',
      salary: '$58,000',
      location: 'Austin, TX',
      avatar: null
    },
    {
      id: 9,
      employeeId: 'EMP009',
      firstName: 'Amanda',
      lastName: 'White',
      email: 'amanda.white@company.com',
      phone: '+1 (555) 901-2345',
      department: 'HR',
      position: 'HR Manager',
      manager: 'David Wilson',
      hireDate: '2020-12-15',
      status: 'Active',
      salary: '$95,000',
      location: 'Austin, TX',
      avatar: null
    },
    {
      id: 10,
      employeeId: 'EMP010',
      firstName: 'James',
      lastName: 'Anderson',
      email: 'james.anderson@company.com',
      phone: '+1 (555) 012-3456',
      department: 'Finance',
      position: 'Financial Analyst',
      manager: 'Patricia Garcia',
      hireDate: '2023-02-20',
      status: 'Active',
      salary: '$70,000',
      location: 'Denver, CO',
      avatar: null
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    manager: '',
    hireDate: '',
    salary: '',
    location: '',
    status: 'Active'
  });

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Management'];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave'];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Generate new employee ID
  const generateEmployeeId = () => {
    const lastId = employees.length > 0 
      ? Math.max(...employees.map(emp => parseInt(emp.employeeId.replace('EMP', ''))))
      : 0;
    return `EMP${String(lastId + 1).padStart(3, '0')}`;
  };

  // Add new employee
  const handleAddEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.department) {
      alert('Please fill in all required fields: First Name, Last Name, Email, and Department');
      return;
    }

    const employee = {
      id: employees.length + 1,
      employeeId: generateEmployeeId(),
      ...newEmployee,
      salary: newEmployee.salary ? `$${newEmployee.salary.replace(/\$/g, '')}` : '$0',
      hireDate: newEmployee.hireDate || new Date().toISOString().split('T')[0]
    };

    setEmployees([...employees, employee]);
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      manager: '',
      hireDate: '',
      salary: '',
      location: '',
      status: 'Active'
    });
    setShowAddModal(false);
    alert('Employee added successfully!');
  };

  // Update employee
  const handleUpdateEmployee = () => {
    if (!selectedEmployee.firstName || !selectedEmployee.lastName || !selectedEmployee.email || !selectedEmployee.department) {
      alert('Please fill in all required fields: First Name, Last Name, Email, and Department');
      return;
    }

    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? selectedEmployee : emp
    ));
    setShowEditModal(false);
    setSelectedEmployee(null);
    alert('Employee updated successfully!');
  };

  // Delete employee with confirmation
  const handleDeleteEmployee = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`)) {
      setEmployees(employees.filter(emp => emp.id !== employee.id));
      alert('Employee deleted successfully!');
    }
  };

  // Handle input changes for new employee form
  const handleNewEmployeeChange = (field, value) => {
    setNewEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle input changes for edit employee form
  const handleEditEmployeeChange = (field, value) => {
    setSelectedEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Open edit modal
  const handleEditClick = (employee) => {
    setSelectedEmployee({...employee});
    setShowEditModal(true);
  };

  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Employee Directory
            </h1>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Manage and view all employee information
            </p>
          </div>
          <div className="flex space-x-3">
            <button className={`border px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  All departments
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Active
                </p>
                <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Currently working
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Departments
                </p>
                <p className="text-2xl font-bold text-purple-600">{departments.length - 1}</p>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Active departments
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}>
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  New Hires
                </p>
                <p className="text-2xl font-bold text-orange-600">3</p>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  This month
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-orange-900/50' : 'bg-orange-100'
              }`}>
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-lg shadow mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} size={20} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className={`rounded-lg p-6 hover:shadow-md transition-shadow ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-white'
              }`}>
                {/* Employee Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <span className={`text-lg font-medium ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {getInitials(employee.firstName, employee.lastName)}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {employee.employeeId}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className={`${
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                    }`}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* Employee Info */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {employee.position}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {employee.department}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    } truncate`}>
                      {employee.email}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {employee.phone}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {employee.location}
                    </span>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className={`flex items-center justify-between pt-4 border-t ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    employee.status === 'Active' 
                      ? theme === 'dark' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-green-100 text-green-800'
                      : theme === 'dark'
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.status}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedEmployee(employee)}
                      className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEditClick(employee)}
                      className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteEmployee(employee)}
                      className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className={`mx-auto h-12 w-12 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`mt-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
              }`}>
                No employees found
              </h3>
              <p className={`mt-1 text-sm ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && !showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <span className={`text-xl font-medium ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {getInitials(selectedEmployee.firstName, selectedEmployee.lastName)}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedEmployee.position}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {selectedEmployee.employeeId} • {selectedEmployee.department}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                >
                  <Eye size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className={`rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`text-lg font-medium mb-4 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className={`rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`text-lg font-medium mb-4 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Employment Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Manager
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.manager || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Hire Date
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {formatDate(selectedEmployee.hireDate)}
                      </p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Salary
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.salary}
                      </p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Status
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedEmployee.status === 'Active' 
                          ? theme === 'dark' 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-green-100 text-green-800'
                          : theme === 'dark'
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedEmployee.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className={`border px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Close
                </button>
                <button 
                  onClick={() => handleEditClick(selectedEmployee)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Add New Employee
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={newEmployee.firstName}
                    onChange={(e) => handleNewEmployeeChange('firstName', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={newEmployee.lastName}
                    onChange={(e) => handleNewEmployeeChange('lastName', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => handleNewEmployeeChange('email', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => handleNewEmployeeChange('phone', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Department *
                  </label>
                  <select 
                    value={newEmployee.department}
                    onChange={(e) => handleNewEmployeeChange('department', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select department</option>
                    {departments.slice(1).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Position
                  </label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => handleNewEmployeeChange('position', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter job position"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Hire Date
                  </label>
                  <input
                    type="date"
                    value={newEmployee.hireDate}
                    onChange={(e) => handleNewEmployeeChange('hireDate', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Salary
                  </label>
                  <input
                    type="text"
                    value={newEmployee.salary}
                    onChange={(e) => handleNewEmployeeChange('salary', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="e.g., 75000"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEmployee.location}
                    onChange={(e) => handleNewEmployeeChange('location', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="e.g., New York, NY"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Manager
                  </label>
                  <input
                    type="text"
                    value={newEmployee.manager}
                    onChange={(e) => handleNewEmployeeChange('manager', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter manager name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </label>
                  <select 
                    value={newEmployee.status}
                    onChange={(e) => handleNewEmployeeChange('status', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`border px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Edit Employee
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.firstName}
                    onChange={(e) => handleEditEmployeeChange('firstName', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.lastName}
                    onChange={(e) => handleEditEmployeeChange('lastName', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={selectedEmployee.email}
                    onChange={(e) => handleEditEmployeeChange('email', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={selectedEmployee.phone}
                    onChange={(e) => handleEditEmployeeChange('phone', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Department *
                  </label>
                  <select 
                    value={selectedEmployee.department}
                    onChange={(e) => handleEditEmployeeChange('department', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    {departments.slice(1).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Position
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.position}
                    onChange={(e) => handleEditEmployeeChange('position', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Hire Date
                  </label>
                  <input
                    type="date"
                    value={selectedEmployee.hireDate}
                    onChange={(e) => handleEditEmployeeChange('hireDate', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Salary
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.salary}
                    onChange={(e) => handleEditEmployeeChange('salary', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.location}
                    onChange={(e) => handleEditEmployeeChange('location', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Manager
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee.manager || ''}
                    onChange={(e) => handleEditEmployeeChange('manager', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </label>
                  <select 
                    value={selectedEmployee.status}
                    onChange={(e) => handleEditEmployeeChange('status', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`border px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateEmployee}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDirectory;