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
  const [language, setLanguage] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState(mockIssues);
  const [departments, setDepartments] = useState(mockDepartments);

  const translations = {
    hi: {
      // Common
      nagarNigam: 'इंदौर नगर निगम',
      nagarNigamSecondary: 'Indore Municipal Corporation',
      nagarNigamShort: 'इंदौर नगर निगम',
      nagarNigamShortSecondary: 'Indore Municipal Corp.',
      adminDashboard: 'प्रशासन डैशबोर्ड',
      switchLanguage: 'English',
      governmentOfIndia: 'भारत सरकार',
      
      // Login
      adminLogin: 'व्यवस्थापक लॉगिन',
      username: 'यूजरनेम',
      password: 'पासवर्ड',
      enterUsername: 'अपना यूजरनेम दर्ज करें',
      enterPassword: 'अपना पासवर्ड दर्ज करें',
      login: 'लॉग इन',
      loggingIn: 'लॉग इन हो रहे हैं...',
      invalidCredentials: 'गलत यूजरनेम या पासवर्ड',
      demoCredentials: 'डेमो क्रेडेंशियल्स:',
      
      // Two Factor Auth
      twoFactorAuth: 'दो-कारक सत्यापन',
      twoFactorAuthSecondary: 'Two-Factor Authentication',
      otpVerification: 'OTP सत्यापन',
      enterOTPCode: 'आपके फोन पर भेजा गया 6-अंकीय कोड दर्ज करें',
      timeRemaining: 'समय शेष:',
      didntReceiveCode: 'कोड नहीं मिला? {seconds} सेकंड बाद दोबारा भेजें',
      resend: 'दोबारा भेजें',
      verify: 'सत्यापित करें',
      verifying: 'सत्यापन हो रहा है...',
      invalidOTP: 'गलत OTP',
      newOTPSent: 'नया OTP भेजा गया',
      demoOTP: 'डेमो OTP:',
      
      // Sidebar
      mainMap: 'मुख्य मानचित्र',
      mainMapSecondary: 'Main Map',
      issues: 'शिकायतें',
      issuesSecondary: 'Issues',
      departments: 'विभाग',
      departmentsSecondary: 'Departments',
      logout: 'लॉग आउट',
      logoutSecondary: 'Logout',
      
      // Map
      issuesList: 'शिकायतें सूची',
      all: 'सभी',
      priority: 'प्राथमिकता',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      pending: 'लंबित',
      assigned: 'आवंटित',
      inProgress: 'प्रगतिशील',
      completed: 'पूर्ण',
      totalIssues: 'कुल शिकायतें',
      noIssuesFound: 'कोई शिकायत नहीं मिली',
      complaintNo: 'शिकायत संख्या',
      name: 'नाम',
      
      // Issues Page
      issueManagement: 'शिकायत प्रबंधन',
      issueManagementDesc: 'सभी शिकायतों का विस्तृत विवरण',
      search: 'खोजें...',
      allStatus: 'सभी स्थिति',
      allPriority: 'सभी प्राथमिकता',
      created: 'बनाया गया',
      assignedDepartments: 'आवंटित विभाग',
      assignDepartment: 'विभाग आवंटित करें',
      markComplete: 'पूर्ण चिह्नित करें',
      reopen: 'पुनः खोलें',
      noIssuesFoundDesc: 'आपके मापदंड से मेल खाने वाली कोई शिकायत नहीं मिली',
      
      // Departments Page
      departmentManagement: 'विभाग प्रबंधन',
      departmentManagementDesc: 'सभी नगर निगम विभागों की जानकारी और प्रदर्शन',
      head: 'प्रमुख',
      completionRate: 'पूर्णता दर',
      detailedView: 'विस्तृत विवरण',
      departmentInfo: 'विभाग जानकारी',
      phone: 'फोन',
      email: 'ईमेल',
      performance: 'प्रदर्शन',
      assignedIssues: 'आवंटित शिकायतें',
      noIssuesAssigned: 'कोई शिकायत आवंटित नहीं',
      
      // Assign Department Modal
      confirmAssignment: 'पुष्टि करें',
      issue: 'शिकायत',
      departmentsToBeAssigned: 'आवंटित किए जाने वाले विभाग',
      confirmAssignmentQuestion: 'क्या आप वाकई इस शिकायत को चुने गए विभागों को आवंटित करना चाहते हैं?',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      issueDetails: 'शिकायत विवरण',
      complainant: 'शिकायतकर्ता',
      location: 'स्थान',
      category: 'श्रेणी',
      description: 'विवरण',
      selectDepartments: 'विभाग चुनें',
      selectOneOrMore: 'एक या अधिक विभाग चुन सकते हैं',
      selectedDepartments: 'चयनित विभाग',
      assign: 'आवंटित करें',
      selectAtLeastOneDepartment: 'कृपया कम से कम एक विभाग का चयन करें'
    },
    en: {
      // Common
      nagarNigam: 'Indore Municipal Corporation',
      nagarNigamSecondary: 'इंदौर नगर निगम',
      nagarNigamShort: 'Indore Municipal Corp.',
      nagarNigamShortSecondary: 'इंदौर नगर निगम',
      adminDashboard: 'Admin Dashboard',
      switchLanguage: 'हिंदी',
      governmentOfIndia: 'Government of India',
      
      // Login
      adminLogin: 'Admin Login',
      username: 'Username',
      password: 'Password',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      login: 'Login',
      loggingIn: 'Logging in...',
      invalidCredentials: 'Invalid credentials',
      demoCredentials: 'Demo Credentials:',
      
      // Two Factor Auth
      twoFactorAuth: 'Two-Factor Authentication',
      twoFactorAuthSecondary: 'दो-कारक सत्यापन',
      otpVerification: 'OTP Verification',
      enterOTPCode: 'Enter the 6-digit code sent to your phone',
      timeRemaining: 'Time remaining:',
      didntReceiveCode: 'Didn\'t receive code? Resend in {seconds} seconds',
      resend: 'Resend',
      verify: 'Verify',
      verifying: 'Verifying...',
      invalidOTP: 'Invalid OTP',
      newOTPSent: 'New OTP sent',
      demoOTP: 'Demo OTP:',
      
      // Sidebar
      mainMap: 'Main Map',
      mainMapSecondary: 'मुख्य मानचित्र',
      issues: 'Issues',
      issuesSecondary: 'शिकायतें',
      departments: 'Departments',
      departmentsSecondary: 'विभाग',
      logout: 'Logout',
      logoutSecondary: 'लॉग आउट',
      
      // Map
      issuesList: 'Issues List',
      all: 'All',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      pending: 'Pending',
      assigned: 'Assigned',
      inProgress: 'In Progress',
      completed: 'Completed',
      totalIssues: 'Total Issues',
      noIssuesFound: 'No issues found',
      complaintNo: 'Complaint No',
      name: 'Name',
      
      // Issues Page
      issueManagement: 'Issue Management',
      issueManagementDesc: 'Detailed view of all issues',
      search: 'Search...',
      allStatus: 'All Status',
      allPriority: 'All Priority',
      created: 'Created',
      assignedDepartments: 'Assigned Departments',
      assignDepartment: 'Assign Department',
      markComplete: 'Mark Complete',
      reopen: 'Reopen',
      noIssuesFoundDesc: 'No issues found matching your criteria',
      
      // Departments Page
      departmentManagement: 'Department Management',
      departmentManagementDesc: 'Information and performance of all municipal departments',
      head: 'Head',
      completionRate: 'Completion Rate',
      detailedView: 'Detailed View',
      departmentInfo: 'Department Information',
      phone: 'Phone',
      email: 'Email',
      performance: 'Performance',
      assignedIssues: 'Assigned Issues',
      noIssuesAssigned: 'No issues assigned',
      
      // Assign Department Modal
      confirmAssignment: 'Confirm Assignment',
      issue: 'Issue',
      departmentsToBeAssigned: 'Departments to be assigned',
      confirmAssignmentQuestion: 'Are you sure you want to assign this issue to the selected departments?',
      cancel: 'Cancel',
      confirm: 'Confirm',
      issueDetails: 'Issue Details',
      complainant: 'Complainant',
      location: 'Location',
      category: 'Category',
      description: 'Description',
      selectDepartments: 'Select Departments',
      selectOneOrMore: 'You can select one or more departments',
      selectedDepartments: 'Selected Departments',
      assign: 'Assign',
      selectAtLeastOneDepartment: 'Please select at least one department'
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

  const onIssueSelect = (issue) => {
    console.log('Issue selected:', issue);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !showTwoFactor) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        language={language} 
        onToggleLanguage={toggleLanguage}
        translations={t}
      />
    );
  }

  if (showTwoFactor) {
    return (
      <TwoFactorAuth 
        onSuccess={handleTwoFactorSuccess} 
        language={language} 
        onToggleLanguage={toggleLanguage}
        translations={t}
      />
    );
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
        translations={t}
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
                <p className="text-sm text-gray-500">{t.adminDashboard}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{t.switchLanguage}</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Profile</p>
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
          {activeTab === 'map' && (
            <MapView 
              language={language} 
              issues={issues} 
              onIssueSelect={onIssueSelect}
              translations={t}
            />
          )}
          {activeTab === 'issues' && (
            <IssuesPage 
              language={language} 
              issues={issues} 
              departments={departments} 
              onAssignDepartment={handleAssignDepartment} 
              onUpdateIssueStatus={handleUpdateIssueStatus}
              translations={t}
            />
          )}
          {activeTab === 'departments' && (
            <DepartmentsPage 
              language={language} 
              departments={departments} 
              issues={issues}
              translations={t}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;