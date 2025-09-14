import React, { useState } from 'react';
import { X, Building2, AlertTriangle } from 'lucide-react';

const AssignDepartmentModal = ({ issue, departments, onAssign, onClose, language, translations }) => {
  const [selectedDepartments, setSelectedDepartments] = useState(
    issue.assignedDepartments || []
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDepartmentToggle = (departmentId) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentId)
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleSubmit = () => {
    if (selectedDepartments.length === 0) {
      alert(translations.selectAtLeastOneDepartment);
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmAssignment = () => {
    onAssign(issue.id, selectedDepartments);
    setShowConfirmation(false);
  };

  const getSelectedDepartmentNames = () => {
    return departments
      .filter(dept => selectedDepartments.includes(dept.id))
      .map(dept => dept.name)
      .join(', ');
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              {translations.confirmAssignment}
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>{translations.issue}:</strong> {issue.complaintNumber}
              </p>
              <p className="text-sm text-gray-800 font-medium">{issue.title}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>{translations.departmentsToBeAssigned}:</strong>
              </p>
              <p className="text-sm text-gray-800">{getSelectedDepartmentNames()}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                {translations.confirmAssignmentQuestion}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {translations.cancel}
            </button>
            <button
              onClick={handleConfirmAssignment}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {translations.confirm}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto m-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {translations.assignDepartment}
            </h3>
            <p className="text-sm text-gray-600">{issue.complaintNumber} - {issue.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Issue Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">{translations.issueDetails}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>{translations.complainant}:</strong> {issue.userName}</p>
            <p><strong>{translations.location}:</strong> {issue.location.address}</p>
            <p><strong>{translations.category}:</strong> {issue.category}</p>
            <p><strong>{translations.priority}:</strong> {
              issue.priority === 'high' ? translations.high :
              issue.priority === 'medium' ? translations.medium : translations.low
            }</p>
            <p><strong>{translations.description}:</strong> {issue.description}</p>
          </div>
        </div>

        {/* Department Selection */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-4">
            {translations.selectDepartments}
            <span className="text-sm text-gray-600 ml-2">({translations.selectOneOrMore})</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {departments.map((department) => (
              <div
                key={department.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedDepartments.includes(department.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleDepartmentToggle(department.id)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(department.id)}
                    onChange={() => handleDepartmentToggle(department.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Building2 size={20} className="text-gray-500" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{department.name}</h5>
                    <p className="text-xs text-gray-600">{translations.head}: {department.head}</p>
                    <p className="text-xs text-gray-500">{department.phone}</p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-600">
                  <span>{translations.totalIssues}: {department.totalIssues}</span>
                  <span className="ml-3">{translations.completed}: {department.completedIssues}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Departments Summary */}
        {selectedDepartments.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">
              {translations.selectedDepartments} ({selectedDepartments.length})
            </h5>
            <div className="flex flex-wrap gap-2">
              {departments
                .filter(dept => selectedDepartments.includes(dept.id))
                .map(dept => (
                  <span
                    key={dept.id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {dept.name}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {translations.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedDepartments.length === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {translations.assign} ({selectedDepartments.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDepartmentModal;