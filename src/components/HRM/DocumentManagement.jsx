import React, { useState, useEffect } from 'react';
import { useEmployeeStore } from '../../store/employeeStore';

const DocumentManagement = ({ employee, onClose }) => {
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [customDocName, setCustomDocName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]); // Start with empty array
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state
  const [loadingMore, setLoadingMore] = useState(false); // Add loading more state
  
  const { addEmployeeDocument, deleteEmployeeDocument, getEmployeeDocuments } = useEmployeeStore();
  
  const documentTypes = ['Aadhaar', 'PAN', 'Passport', 'Driving License', 'Voter ID', 'Degree Certificate', 'Mark Sheets', 'Other'];

  useEffect(() => {
    loadDocuments();
    setHasMore(true);
    loadDocuments(1, false);
  }, [employee.id]); // Add employee.id as dependency

  const loadDocuments = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const docs = await getEmployeeDocuments(employee.id, pageNum);
      const documentsArray = Array.isArray(docs) ? docs : [];
      
      if (append) {
        setDocuments(prev => [...prev, ...documentsArray]);
      } else {
        setDocuments(documentsArray);
      }
      
      // Check if there are more documents (assuming 10 per page)
      setHasMore(documentsArray.length === 10);
      
      if (pageNum === 1) {
        setPage(1);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };
  
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottom = scrollHeight - scrollTop <= clientHeight + 10; // 10px buffer
    
    if (bottom && hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      loadDocuments(nextPage, true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit');
        return;
      }
      setDocumentFile(file);
      setDocumentName(file.name);
    }
  };


const handleUpload = async () => {
    if (!documentType || !documentFile) {
      alert('Please select document type and file');
      return;
    }
  
    const finalDocName = documentType === 'Other' ? customDocName : documentType;
    
    if (!finalDocName) {
      alert('Please specify document name');
      return;
    }
  
    setUploading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', documentFile);
      formData.append('type', documentType);
      formData.append('name', finalDocName);
      formData.append('employeeId', employee.id);
  
      // Use the store function instead of direct API call
      const newDocument = await addEmployeeDocument(employee.id, formData);
      
      // Update local state immediately for better UX
      setDocuments(prev => [newDocument, ...prev]);
      
      // Reset form
      setDocumentType('');
      setDocumentFile(null);
      setDocumentName('');
      setCustomDocName('');
      
    } catch (error) {
      console.error('Failed to upload document:', error);
      alert(error.message || 'Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteEmployeeDocument(employee.id, docId);
        setDocuments(documents.filter(doc => doc.id !== docId));
      } catch (error) {
        console.error('Failed to delete document:', error);
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Document Management - {employee.firstName} {employee.lastName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Upload Section */}
          <div className="w-1/3 border-r p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Upload New Document</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type *</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {documentType === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Name *</label>
                  <input
                    type="text"
                    value={customDocName}
                    onChange={(e) => setCustomDocName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify document name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document File *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          onChange={handleFileChange} 
                          className="sr-only" 
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                  </div>
                </div>
                {documentName && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {documentName}
                  </p>
                )}
              </div>
              
              <button
                onClick={handleUpload}
                disabled={uploading || !documentType || !documentFile || (documentType === 'Other' && !customDocName)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </div>

          {/* Documents List */}
          <div className="w-2/3 p-6 overflow-y-auto" onScroll={handleScroll}>
            <h4 className="text-md font-medium text-gray-900 mb-4">Documents</h4>
            
            {loading ? (
                <div className="text-center py-8">
                <p className="text-gray-500">Loading documents...</p>
                </div>
            ) :
            documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.fileName} • {Math.round(doc.fileSize / 1024)} KB
                        </p>
                        <p className="text-xs text-gray-400">
                          Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </a>
                      <a
                        href={doc.fileUrl}
                        download={doc.fileName}
                        className="text-green-600 hover:text-green-800"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {loadingMore && (
                    <div className="text-center py-4">
                    <p className="text-gray-500">Loading more documents...</p>
                    </div>
                )}
                
                {!hasMore && documents.length > 0 && (
                    <div className="text-center py-4">
                    <p className="text-gray-500">No more documents to load</p>
                    </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No documents uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;