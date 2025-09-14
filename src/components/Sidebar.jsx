import React from 'react';
import { Map, FileText, Building2, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const Sidebar = ({ collapsed, onToggleCollapse, activeTab, onTabChange, onLogout, language = 'hi' }) => {
  const menuItems = [
    { 
      id: 'map', 
      label: language === 'hi' ? 'मुख्य मानचित्र' : 'Main Map', 
      icon: Map, 
      labelSecondary: language === 'hi' ? 'Main Map' : 'मुख्य मानचित्र'
    },
    { 
      id: 'issues', 
      label: language === 'hi' ? 'शिकायतें' : 'Issues', 
      icon: FileText, 
      labelSecondary: language === 'hi' ? 'Issues' : 'शिकायतें'
    },
    { 
      id: 'departments', 
      label: language === 'hi' ? 'विभाग' : 'Departments', 
      icon: Building2, 
      labelSecondary: language === 'hi' ? 'Departments' : 'विभाग'
    }
  ];

  return (
    <div className={`${!collapsed ? 'w-64' : 'w-16'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg">
                {language === 'hi' ? 'इंदौर नगर निगम' : 'Indore Municipal Corp.'}
              </h2>
              <p className="text-xs text-gray-600">
                {language === 'hi' ? 'Indore Municipal Corp.' : 'इंदौर नगर निगम'}
              </p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {!collapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <div className="ml-3 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-75">{item.labelSecondary}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && (
            <div className="ml-3 text-left">
              <div className="font-medium">
                {language === 'hi' ? 'लॉग आउट' : 'Logout'}
              </div>
              <div className="text-xs opacity-75">
                {language === 'hi' ? 'Logout' : 'लॉग आउट'}
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;