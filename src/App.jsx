import React, { useState, useEffect } from 'react';
import { mockIssues, mockDepartments } from './data/mockData.js';
import LoginPage from './components/LoginPage';
import TwoFactorAuth from './components/TwoFactorAuth';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import IssuesPage from './components/IssuesPage';
import DepartmentsPage from './components/DepartmentsPage';
import LoadingScreen from './components/LoadingScreen';
import { User, Globe, Building2 } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState(mockIssues);
  const [departments, setDepartments] = useState(mockDepartments);

  const translations = {
    en: {
      dashboard: 'Admin Dashboard',
      profile: 'Profile',
      logout: 'Logout',
      loading: 'Loading...',
      switchToHindi: 'हिंदी',
      nagarNigam: 'Nagar Nigam Indore'
    },
    hi: {
      dashboard: 'प्रशासन डैशबोर्ड',
      profile: 'प्रोफाइल',
      logout: 'लॉगआउट',
      loading: 'लोड हो रहा है...',
      switchToEnglish: 'English',
      nagarNigam: 'नगर निगम इंदौर'
    }
  };

  const t = translations[language];

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowTwoFactor(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleTwoFactorSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowTwoFactor(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setIsLoading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setIsLoading(false);
      }, 800);
    }
  };

  const toggleLanguage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLanguage(language === 'en' ? 'hi' : 'en');
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setShowTwoFactor(false);
      setActiveTab('map');
      setIsLoading(false);
    }, 1000);
  };

  const handleAssignDepartment = (issueId, departmentIds) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId
          ? { ...issue, assignedDepartments: departmentIds, status: 'in-progress' }
          : issue
      )
    );
  };

  const handleUpdateIssueStatus = (issueId, newStatus) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId
          ? { ...issue, status: newStatus }
          : issue
      )
    );
  };

  const onIssueSelect = (issueId) => {
    // Handle issue selection if needed
    console.log('Issue selected:', issueId);
  };

  if (isLoading) {
    return <LoadingScreen message={t.loading} />;
  }

  if (!isAuthenticated && !showTwoFactor) {
    return <LoginPage onLogin={handleLogin} language={language} onLanguageToggle={toggleLanguage} />;
  }

  if (showTwoFactor) {
    return <TwoFactorAuth onSuccess={handleTwoFactorSuccess} language={language} onLanguageToggle={toggleLanguage} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
        language={language}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{t.nagarNigam}</h1>
                <p className="text-sm text-gray-500">{t.dashboard}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? t.switchToHindi : t.switchToEnglish}</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">{t.profile}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {activeTab === 'map' && <MapView language={language} issues={issues} onIssueSelect={onIssueSelect} />}
          {activeTab === 'issues' && <IssuesPage language={language} issues={issues} departments={departments} onAssignDepartment={handleAssignDepartment} onUpdateIssueStatus={handleUpdateIssueStatus} />}
          {activeTab === 'departments' && <DepartmentsPage language={language} departments={departments} issues={issues} />}
        </main>
      </div>
    </div>
  );
}

export default App;