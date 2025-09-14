import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Filter, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different priorities
const createCustomIcon = (priority) => {
  const color = priority === 'high' ? '#DC2626' : 
                priority === 'medium' ? '#D97706' : '#059669';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const MapView = ({ issues, onIssueSelect, language, translations }) => {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Indore coordinates
  const indoreCenter = [22.7196, 75.8577];

  const filteredIssues = issues.filter(issue => 
    filter === 'all' || issue.priority === filter
  );

  const getPriorityLabel = (priority) => {
    const labels = {
      high: { hi: 'उच्च', en: 'High' },
      medium: { hi: 'मध्यम', en: 'Medium' },
      low: { hi: 'कम', en: 'Low' }
    };
    return labels[priority]?.[language] || priority;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: { hi: 'लंबित', en: 'Pending' },
      assigned: { hi: 'आवंटित', en: 'Assigned' },
      'in-progress': { hi: 'प्रगतिशील', en: 'In Progress' },
      completed: { hi: 'पूर्ण', en: 'Completed' }
    };
    return labels[status]?.[language] || status;
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Issues List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">
            {translations.issuesList}
          </h3>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'high', 'medium', 'low'].map((priority) => (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filter === priority
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {priority === 'all' ? translations.all : getPriorityLabel(priority)}
              </button>
            ))}
          </div>
        </div>

        {/* Issues List */}
        <div className="flex-1 overflow-y-auto">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onIssueSelect(issue)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors border-l-4 hover:bg-gray-50 ${
                issue.priority === 'high' ? 'border-l-red-500 bg-red-50' :
                issue.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
                'border-l-green-500 bg-green-50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {issue.complaintNumber}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getPriorityLabel(issue.priority)}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                  {issue.title}
                </h4>
                
                <p className="text-xs text-gray-600 line-clamp-2">
                  {issue.description}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{issue.userName}</span>
                  <span>{getStatusLabel(issue.status)}</span>
                </div>
                
                <div className="text-xs text-gray-500">
                  {issue.location.address}
                </div>
              </div>
            </div>
          ))}
          
          {filteredIssues.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <div className="text-lg mb-2">{translations.noIssuesFound}</div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-2">
            {translations.priority}
          </h4>
          <div className="space-y-2">
            {[
              { priority: 'high', color: '#DC2626' },
              { priority: 'medium', color: '#D97706' },
              { priority: 'low', color: '#059669' }
            ].map(({ priority, color }) => (
              <div key={priority} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700">{getPriorityLabel(priority)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={indoreCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredIssues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={createCustomIcon(issue.priority)}
            >
              <Popup>
                <div className="p-2 min-w-64">
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-800">
                      {translations.complaintNo}: {issue.complaintNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      {translations.name}: {issue.userName}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {issue.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {issue.description.slice(0, 100)}...
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2 py-1 rounded-full text-xs text-white font-medium"
                        style={{ 
                          backgroundColor: issue.priority === 'high' ? '#DC2626' : 
                                          issue.priority === 'medium' ? '#D97706' : '#059669'
                        }}
                      >
                        {getPriorityLabel(issue.priority)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getStatusLabel(issue.status)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {issue.location.address}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Issue Count */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-semibold text-gray-800 mb-2">
            {translations.totalIssues}
          </h4>
          <div className="text-2xl font-bold text-blue-600">{filteredIssues.length}</div>
        </div>
      </div>
    </div>
  );
};

export default MapView;