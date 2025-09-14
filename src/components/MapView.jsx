import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

const MapView = ({ issues, onIssueSelect, language = 'hi' }) => {
  const [hoveredIssue, setHoveredIssue] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredIssues = issues.filter(issue => 
    filter === 'all' || issue.priority === filter
  );

  const getPinColor = (priority) => {
    switch (priority) {
      case 'high': return '#DC2626'; // Red
      case 'medium': return '#D97706'; // Yellow/Orange
      case 'low': return '#059669'; // Green
      default: return '#6B7280'; // Gray
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return language === 'hi' ? 'उच्च' : 'High';
      case 'medium': return language === 'hi' ? 'मध्यम' : 'Medium';
      case 'low': return language === 'hi' ? 'कम' : 'Low';
      default: return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return language === 'hi' ? 'लंबित' : 'Pending';
      case 'assigned': return language === 'hi' ? 'आवंटित' : 'Assigned';
      case 'in-progress': return language === 'hi' ? 'प्रगतिशील' : 'In Progress';
      case 'completed': return language === 'hi' ? 'पूर्ण' : 'Completed';
      default: return status;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      {/* Filter Bar */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter size={16} />
            <span>{language === 'hi' ? 'फिल्टर' : 'Filter'}</span>
          </button>
          
          {showFilters && (
            <div className="flex space-x-2">
              {['all', 'high', 'medium', 'low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setFilter(priority)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filter === priority
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {priority === 'all' ? (language === 'hi' ? 'सभी' : 'All') : getPriorityLabel(priority)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 overflow-hidden">
        {/* Map Background (Simulated) */}
        <div className="absolute inset-0">
          {/* Enhanced Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-gray-50 opacity-60"></div>
          
          {/* Simulated map grid */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute border-t border-blue-300"
                style={{ top: `${(i + 1) * 4}%`, width: '100%' }}
              />
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute border-l border-blue-300"
                style={{ left: `${(i + 1) * 2.86}%`, height: '100%' }}
              />
            ))}
          </div>
          
          {/* Simulated Roads */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute bg-gray-400 h-1" style={{ top: '30%', left: '10%', width: '80%' }}></div>
            <div className="absolute bg-gray-400 h-1" style={{ top: '60%', left: '15%', width: '70%' }}></div>
            <div className="absolute bg-gray-400 w-1" style={{ left: '40%', top: '20%', height: '60%' }}></div>
            <div className="absolute bg-gray-400 w-1" style={{ left: '70%', top: '25%', height: '50%' }}></div>
          </div>
          
          {/* Landmarks */}
          <div className="absolute inset-0">
            <div className="absolute w-4 h-4 bg-green-600 rounded-full" style={{ top: '35%', left: '45%' }} title="Central Park"></div>
            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{ top: '50%', left: '60%' }} title="Government Office"></div>
            <div className="absolute w-3 h-3 bg-red-600 rounded-full" style={{ top: '40%', left: '30%' }} title="Hospital"></div>
          </div>

          {/* City label */}
          <div className="absolute top-8 right-8 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
            <h3 className="font-bold text-gray-800">
              {language === 'hi' ? 'इंदौर, मध्य प्रदेश' : 'Indore, Madhya Pradesh'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'hi' ? 'Indore, Madhya Pradesh' : 'इंदौर, मध्य प्रदेश'}
            </p>
          </div>

          {/* Issue Pins */}
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${((issue.location.lng - 75.8) / 0.15) * 100}%`,
                top: `${((22.75 - issue.location.lat) / 0.08) * 100}%`,
              }}
              onMouseEnter={() => setHoveredIssue(issue)}
              onMouseLeave={() => setHoveredIssue(null)}
              onClick={() => onIssueSelect(issue)}
            >
              {/* Pin */}
              <div className="relative">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg transform transition-transform hover:scale-125"
                  style={{ backgroundColor: getPinColor(issue.priority) }}
                />
                <div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent"
                  style={{ borderTopColor: getPinColor(issue.priority) }}
                />
              </div>

              {/* Hover Tooltip */}
              {hoveredIssue?.id === issue.id && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-64 z-20 border">
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-800">
                      {language === 'hi' ? 'शिकायत संख्या:' : 'Complaint No:'} {issue.complaintNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'hi' ? 'नाम:' : 'Name:'} {issue.userName}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {issue.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {issue.description.slice(0, 80)}...
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2 py-1 rounded-full text-xs text-white font-medium"
                        style={{ backgroundColor: getPinColor(issue.priority) }}
                      >
                        {getPriorityLabel(issue.priority)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getStatusLabel(issue.status)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">
          {language === 'hi' ? 'प्राथमिकता' : 'Priority'}
        </h4>
        <div className="space-y-2">
          {[
            { priority: 'high', label: language === 'hi' ? 'उच्च' : 'High' },
            { priority: 'medium', label: language === 'hi' ? 'मध्यम' : 'Medium' },
            { priority: 'low', label: language === 'hi' ? 'कम' : 'Low' }
          ].map(({ priority, label }) => (
            <div key={priority} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getPinColor(priority) }}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Count */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">
          {language === 'hi' ? 'कुल शिकायतें' : 'Total Issues'}
        </h4>
        <div className="text-2xl font-bold text-blue-600">{filteredIssues.length}</div>
        <div className="text-sm text-gray-600">
          {language === 'hi' ? 'Total Issues' : 'कुल शिकायतें'}
        </div>
      </div>
    </div>
  );
};

export default MapView;