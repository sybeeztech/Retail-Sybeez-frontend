// modules/leave/HolidayManagement.jsx
import React, { useState, useEffect } from 'react';
import { useHolidayManagement } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';

const HolidayManagement = () => {
  const { user } = useAuthStore();
  const {
    holidays,
    loading,
    error,
    filters,
    getHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    bulkImportHolidays
  } = useHolidayManagement();

  const [showModal, setShowModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importResults, setImportResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'national',
    applicableLocations: ['all'],
    description: ''
  });

  // Check if user has admin privileges
  const isAdmin = ['super_admin', 'admin'].includes(user?.employee.role);

  useEffect(() => {
    if (isAdmin) {
      getHolidays(filters);
    }
  }, [ isAdmin]);

  // Handle filter changes with debouncing
//   const handleFilterChange = useCallback((newFilters) => {
//     getHolidays({ ...filters, ...newFilters });
//   }, []);

  const handleFilterChange = (newFilters) => {
    getHolidays({ ...filters, ...newFilters });
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      type: 'national',
      applicableLocations: ['all'],
      description: ''
    });
    setEditingHoliday(null);
  };

  // Open modal for creating/editing
  const openModal = (holiday = null) => {
    if (holiday) {
      setEditingHoliday(holiday);
      setFormData({
        name: holiday.name,
        date: holiday.date,
        type: holiday.type,
        applicableLocations: holiday.applicableLocations,
        description: holiday.description || ''
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHoliday) {
        await updateHoliday(editingHoliday.id, formData);
      } else {
        await createHoliday(formData);
      }
      getHolidays();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving holiday:', error);
    }
  };

  // Handle delete
  const handleDelete = async (holidayId) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        await deleteHoliday(holidayId);
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };

  // Handle bulk import
  const handleBulkImport = async () => {
    try {
      const holidayData = importData.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [date, name, type = 'national', locations = 'all'] = line.split(',');
          return {
            date: date.trim(),
            name: name.trim(),
            type: type.trim(),
            applicableLocations: locations.trim().split(';').map(loc => loc.trim())
          };
        });

      const results = await bulkImportHolidays(holidayData, filters.year);
      setImportResults(results);
      
      if (results.errors.length === 0) {
        setShowImportModal(false);
        setImportData('');
      }
    } catch (error) {
      console.error('Error importing holidays:', error);
    }
  };

  // Filter holidays based on search
  const filteredHolidays = holidays.filter(holiday =>
    holiday.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Location options
  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  // Type options
  const typeOptions = [
    { value: 'national', label: 'National' },
    { value: 'regional', label: 'Regional' },
    { value: 'state', label: 'State' },
    { value: 'optional', label: 'Optional' }
  ];

  // Year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear + i);

  if (!isAdmin) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access holiday management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Holiday Management</h1>
        <p className="text-gray-600">Manage company holidays and regional observances</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filters.year}
              onChange={(e) => handleFilterChange({ year: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange({ type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {typeOptions.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button> */}
            <button
              onClick={() => openModal()}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Holiday
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Holidays List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-500">Loading holidays...</div>
          </div>
        ) : filteredHolidays.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No holidays found</h3>
            <p className="text-gray-500">Get started by adding your first holiday.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holiday Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Locations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHolidays.map((holiday) => (
                  <tr key={holiday.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(holiday.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{holiday.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        holiday.type === 'national' ? 'bg-blue-100 text-blue-800' :
                        holiday.type === 'regional' ? 'bg-green-100 text-green-800' :
                        holiday.type === 'state' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {holiday.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {holiday.applicableLocations.includes('all') 
                          ? 'All Locations' 
                          : holiday.applicableLocations.join(', ')
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {holiday.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(holiday)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(holiday.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Holiday Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-h-[97vh] overflow-scroll max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingHoliday ? 'Edit Holiday' : 'Add New Holiday'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {typeOptions.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Applicable Locations *
                  </label>
                  <select
                    multiple
                    value={formData.applicableLocations}
                    onChange={(e) => {
                      const options = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({ ...formData, applicableLocations: options });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  >
                    {locationOptions.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple locations</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {editingHoliday ? 'Update' : 'Create'} Holiday
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Bulk Import Holidays</h2>
              
              {importResults && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Import Results:</h4>
                  <p>Success: {importResults.success}</p>
                  <p>Duplicates: {importResults.duplicates}</p>
                  {importResults.errors.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-red-600">Errors:</p>
                      <ul className="text-sm text-red-600">
                        {importResults.errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste holiday data (CSV format):
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder={`Date,Name,Type,Locations\n2025-01-01,New Year,national,all\n2025-01-26,Republic Day,national,all`}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: Date (YYYY-MM-DD), Name, Type (optional), Locations (optional, semicolon-separated)
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportData('');
                    setImportResults(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkImport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Import Holidays
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayManagement;