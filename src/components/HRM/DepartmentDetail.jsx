import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDepartmentStore } from '../../store/departmentStore';
import { useNavigate } from 'react-router-dom';

const DepartmentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [manager, setManager] = useState(null);

  const navigate = useNavigate();

  const { 
    departments, 
    departmentEmployees,
    fetchEmployeesByDepartment 
  } = useDepartmentStore();

  useEffect(() => {
    // Find the department from the store or fetch it if not available
    const dept = departments.find(d => d.id === parseInt(id));
    
    if (dept) {
      setDepartment(dept);
      loadDepartmentData(dept);
    } else {
      // If department not in store, fetch it from API
      fetchDepartmentData();
    }
  }, [id, departments]);

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(`/api/departments/${id}`);
      if (!response.ok) throw new Error('Department not found');
      
      const deptData = await response.json();
      setDepartment(deptData);
      loadDepartmentData(deptData);
    } catch (error) {
      console.error('Failed to fetch department:', error);
      setLoading(false);
    }
  };

  const loadDepartmentData = async (dept) => {
    try {
      // Fetch employees for this department
      const employeesData = await fetchEmployeesByDepartment(dept.id);
      setEmployees(employeesData || []);
      
      // Find manager from employees (assuming manager name matches employee name)
      const managerEmployee = employeesData.find(emp => 
        `${emp.firstName} ${emp.lastName}` === dept.manager
      );
      setManager(managerEmployee);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load department data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading department details...</div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-red-500">Department not found</div>
        <Link to="/departments" className="ml-4 text-blue-600 hover:underline">
          Back to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/departments" 
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Departments
        </Link>
      </div>

      {/* Department Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{department.name}</h1>
        <p className="text-gray-600 mb-6">{department.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Employees</h3>
            <p className="text-2xl font-bold">{department.employeeCount}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-1">Active Projects</h3>
            <p className="text-2xl font-bold">{department.projects?.length || 0}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Department ID</h3>
            <p className="text-2xl font-bold">#{department.id}</p>
          </div>
        </div>
      </div>

      {/* Manager Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Department Manager</h2>
        
        {manager ? (
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <img 
              onClick={() => navigate(`/employees/${manager.id}`)}
              src={manager.avatar || '/default-avatar.png'} 
              alt={manager.name}
              className="h-16 w-16 rounded-full object-cover cursor-pointer"
            />
            <div className="ml-6">
              <h3 
              onClick={() => navigate(`/employees/${manager.id}`)}
              className="text-lg font-medium hover:text-blue-800 cursor-pointer">{manager.firstName} {manager.lastName}</h3>
              <p className="text-gray-600">{manager.position}</p>
              <p className="text-gray-500 text-sm">{manager.email}</p>
              <p className="text-gray-500 text-sm">
                Manager since: {new Date(manager.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>No manager information available</p>
          </div>
        )}
      </div>

      {/* Projects Section */}
      {department.projects && department.projects.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Department Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {department.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <h3 className="font-medium">{project}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {employees.filter(emp => emp.project === project).length} team members
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employees Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Department Employees</h2>
          <span className="text-gray-500">{employees.length} employees</span>
        </div>
        
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map(employee => (
                  <tr key={employee.id}
                  
                  className="hover:bg-gray-50 ">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                        onClick={() => navigate(`/employees/${employee.id}`)}
                          src={employee.avatar || '/default-avatar.png'} 
                          alt={employee.name}
                          className="h-10 w-10 rounded-full object-cover cursor-pointer"
                        />
                        <div className="ml-4">
                          <div 
                          onClick={() => navigate(`/employees/${employee.id}`)}
                          className="text-sm font-medium text-gray-900 hover:text-blue-800 cursor-pointer">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.project || 'Not assigned'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.startDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2">No employees in this department yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetail;