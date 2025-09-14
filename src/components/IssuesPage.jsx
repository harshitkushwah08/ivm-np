import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, MapPin, User, Phone, AlertCircle } from 'lucide-react';
import AssignDepartmentModal from './AssignDepartmentModal';

const IssuesPage = ({ issues, departments, onAssignDepartment, onUpdateIssueStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.complaintNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-red-600 bg-red-100';
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'उच्च / High';
      case 'medium': return 'मध्यम / Medium';
      case 'low': return 'कम / Low';
      default: return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'लंबित / Pending';
      case 'assigned': return 'आवंटित / Assigned';
      case 'in-progress': return 'प्रगतिशील / In Progress';
      case 'completed': return 'पूर्ण / Completed';
      default: return status;
    }
  };

  const handleAssignDepartment = (issueId, departmentIds) => {
    onAssignDepartment(issueId, departmentIds);
    setShowAssignModal(false);
    setSelectedIssue(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          शिकायत प्रबंधन / Issue Management
        </h2>
        <p className="text-gray-600">सभी शिकायतों का विस्तृत विवरण / Detailed view of all issues</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="खोजें... / Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">सभी स्थिति / All Status</option>
            <option value="pending">लंबित / Pending</option>
            <option value="assigned">आवंटित / Assigned</option>
            <option value="in-progress">प्रगतिशील / In Progress</option>
            <option value="completed">पूर्ण / Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">सभी प्राथमिकता / All Priority</option>
            <option value="high">उच्च / High</option>
            <option value="medium">मध्यम / Medium</option>
            <option value="low">कम / Low</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Issue Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {issue.complaintNumber}
                </h3>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                    {getPriorityLabel(issue.priority)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {getStatusLabel(issue.status)}
                  </span>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{issue.title}</h4>
              <p className="text-gray-600 text-sm line-clamp-2">{issue.description}</p>
            </div>

            {/* Issue Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>{issue.userName}</span>
                <Phone size={16} className="ml-4" />
                <span>{issue.userPhone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span className="line-clamp-1">{issue.location.address}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>बनाया गया: {new Date(issue.createdAt).toLocaleDateString('hi-IN')}</span>
              </div>

              {/* Assigned Departments */}
              {issue.assignedDepartments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    आवंटित विभाग / Assigned Departments:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {issue.assignedDepartments.map((deptId) => {
                      const dept = departments.find(d => d.id === deptId);
                      return dept ? (
                        <span key={deptId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {dept.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedIssue(issue);
                    setShowAssignModal(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  विभाग आवंटित करें / Assign Department
                </button>
                
                {issue.status === 'assigned' || issue.status === 'in-progress' ? (
                  <button
                    onClick={() => onUpdateIssueStatus(issue.id, 'completed')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    पूर्ण चिह्नित करें / Mark Complete
                  </button>
                ) : issue.status === 'completed' ? (
                  <button
                    onClick={() => onUpdateIssueStatus(issue.id, 'pending')}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    पुनः खोलें / Reopen
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">कोई शिकायत नहीं मिली</h3>
          <p className="text-gray-500">No issues found matching your criteria</p>
        </div>
      )}

      {/* Assign Department Modal */}
      {showAssignModal && selectedIssue && (
        <AssignDepartmentModal
          issue={selectedIssue}
          departments={departments}
          onAssign={handleAssignDepartment}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
};

export default IssuesPage;