import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmployeeStore } from '../../store/employeeStore';
import DocumentManagement from './DocumentManagement';
import { EmployeeFormModal } from './EmployeeDirectory';
import DeleteConfirmation from './DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import useSettingsStore from '../../store/settingsStore';

const EmployeeProfile = () => {
  const { id } = useParams();
  const { employees, loading, error, fetchEmployees, updateEmployee, deleteEmployee } = useEmployeeStore();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDocuments, setShowDocuments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const navigate = useNavigate();
  const { theme } = useSettingsStore();
  // const {user} = useAuthStore();

  const user = {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    employee: {
      id: 1,
      name: 'Admin User',
      role: 'admin'
    }
  };

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    } else {
      const foundEmployee = employees.find(emp => emp.id == id);
      setEmployee(foundEmployee);
    }
  }, [id, employees, fetchEmployees]);

  const calculateTenure = (startDate) => {
    let start = new Date(startDate);
    let now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    if (days < 0) {
      months--;
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += lastDayOfMonth;
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return `${years} years, ${months} months, ${days} days`;
  };

  // Theme classes
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const textColorMuted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  if (loading) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${bgColor}`}>
        <div className={textColorMuted}>Loading employee profile...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${bgColor}`}>
        <div className="text-red-500">
          {error || 'Employee not found'}
        </div>
        <Link to="/employees" className="ml-4 text-blue-600 hover:text-blue-800">
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleEditEmployee = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      // await updateEmployee(employee.id, employeeData);
      // setIsEditModalOpen(false);
      // // Refresh the employee data
      // const updatedEmployees = await fetchEmployees();
      // const updatedEmployee = updatedEmployees.find(emp => emp.id === id);
      // setEmployee(updatedEmployee);

      // Update employee in the store - this updates the local state immediately
    const updatedEmployee = await updateEmployee(employee.id, employeeData);
    setIsEditModalOpen(false);
    
    // Update the local state with the returned updated employee
    setEmployee(updatedEmployee);
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteCandidate(employee);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  const handleDeleteConfirm = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setDeleteCandidate(null);
      navigate('/employees');
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <div className={`p-6 max-w-6xl mx-auto min-h-screen ${bgColor}`}>
      
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1) || navigate('/employees')}
          className={`inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer ${textColor}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleEditEmployee}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Employee
          </button>
          
          {/* Admin can't remove himself 
          AND Manager can't remove other managers/Admin/super_admin 
          AND Admin can't remove other Admin/super_admin */}
          {(user.employeeId !== id && 
          ( 
          !(user.employee.role === 'manager' && ['manager', 'admin', 'super_admin'].includes(employee?.role))
             &&
          !(user.employee.role === 'admin' && ['admin', 'super_admin'].includes(employee?.role)) 
          )
        )
          && (
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove Employee
          </button>
          )}
        </div>
      </div>

      {/* Header */}
      <div className={`rounded-lg shadow mb-6 p-6 ${cardBg}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0 h-24 w-24">
            {employee.avatar ? 
            (<img 
              className="h-24 w-24 rounded-full object-cover" 
              src={employee.avatar }
              alt={`${employee.firstName} ${employee.lastName}`} 
            />) : (<span className={`text-7xl font-medium ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {getInitials(employee.firstName, employee.lastName)}
            </span>)
          }
          </div>
          <div className="ml-6">
            <h1 className={`text-3xl font-bold ${textColor}`}>
              {employee.firstName} {employee.lastName}
            </h1>
            <p className={`text-lg ${textColorSecondary}`}>{employee.designation}</p>
            <div className="flex items-center mt-2">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                employee.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {employee.active ? 'Active' : 'Inactive'}
              </span>
              <span className={`ml-3 text-sm ${textColorMuted}`}>
                Tenure: {calculateTenure(employee.startDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`border-b mb-6 ${borderColor}`}>
        <nav className="-mb-px flex space-x-8">
          {['overview', 'professional', 'education', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : `${textColorMuted} hover:${textColorSecondary} hover:border-gray-300`
              }`}
            >
              {tab}
            </button>
          ))}
          {/* <button
            onClick={() => setShowDocuments(true)}
            className={`py-4 px-1 text-sm font-medium ${textColorMuted} hover:${textColorSecondary} hover:border-gray-300`}
          >
            Documents
          </button> */}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={`rounded-lg shadow p-6 ${cardBg}`}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Personal Information</h2>
              <dl className="space-y-4">
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Gender</dt>
                  <dd className={`mt-1 text-sm ${textColor} capitalize`}>{employee.gender || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Email</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.email}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Phone</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.phone}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Address</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.address}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Emergency Contact</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>
                    {employee.emergencyContactName} ({employee.emergencyContactRelation}) - {employee.emergencyContactPhone}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Employment Information */}
            <div>
              <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Employment Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Department</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.department}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Designation</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.designation}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Reporting Manager</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.reportingManager}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Joining Date</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>
                    {new Date(employee.startDate).toLocaleDateString('en-GB')}
                  </dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>CTC</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>Rs.{employee.ctc?.toLocaleString()}</dd>
                </div>
              </dl>
            </div>

            {/* Personal Identification */}
            <div className="md:col-span-2">
              <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Personal Identification</h2>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Aadhaar Number</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.aadharNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>PAN Number</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.panNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Official Email</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.officialEmail || 'Not provided'}</dd>
                </div>
              </dl>
            </div>

            {/* Bank Details */}
            <div className="md:col-span-2">
              <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Bank Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Bank Name</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.bankName || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Account Number</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.accountNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>IFSC Code</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.ifscCode || 'Not provided'}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="space-y-6">
            <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Professional Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className={`text-sm font-medium ${textColorMuted}`}>Total Experience</dt>
                <dd className={`mt-1 text-sm ${textColor}`}>
                  {employee.experienceYears ? `${employee.experienceYears} years` : 'Not specified'}
                </dd>
              </div>
              
              <div>
                <dt className={`text-sm font-medium ${textColorMuted}`}>Location</dt>
                <dd className={`mt-1 text-sm ${textColor}`}>{employee.location || 'Not specified'}</dd>
              </div>
              
              <div>
                <dt className={`text-sm font-medium ${textColorMuted}`}>Source of Hire</dt>
                <dd className={`mt-1 text-sm ${textColor}`}>{employee.sourceOfHire || 'Not specified'}</dd>
              </div>
            </div>

            <div className="mt-6">
              <h3 className={`text-md font-medium mb-4 ${textColor}`}>Current Role Details</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Designation</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.designation}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Department</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.department}</dd>
                </div>
                <div>
                  <dt className={`text-sm font-medium ${textColorMuted}`}>Reporting Manager</dt>
                  <dd className={`mt-1 text-sm ${textColor}`}>{employee.reportingManager}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div>
            <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Education</h2>
            
            {employee.education && employee.education.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Institute Name
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Degree/Diploma
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Field of Study
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Completion Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-600' : 'divide-gray-200'}`}>
                    {employee.education.map((edu, index) => (
                      <tr key={index} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {edu.institute || 'Not specified'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {edu.degree || 'Not specified'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {edu.field || 'Not specified'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {edu.completionDate ? new Date(edu.completionDate).toLocaleDateString('en-GB') : 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className={textColorMuted}>No education information available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h2 className={`text-lg font-medium mb-4 ${textColor}`}>Work Experience</h2>
            
            {employee.experience && employee.experience.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Occupation
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Company
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColorMuted}`}>
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-600' : 'divide-gray-200'}`}>
                    {employee.experience.map((exp, index) => (
                      <tr key={index} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {exp.occupation || 'Not specified'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {exp.company || 'Not specified'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                          {exp.duration || 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className={textColorMuted}>No work experience information available.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Document Management Modal */}
      {showDocuments && (
        <DocumentManagement
          employee={employee}
          onClose={() => setShowDocuments(false)}
          theme={theme}
        />
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <EmployeeFormModal
          employee={employee}
          onSave={handleSaveEmployee}
          onCancel={() => setIsEditModalOpen(false)}
          isOpen={isEditModalOpen}
          theme={theme}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <DeleteConfirmation 
          employee={deleteCandidate}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteCandidate(null)}
          theme={theme}
        />
      )}
    </div>
  );
};

export default EmployeeProfile;