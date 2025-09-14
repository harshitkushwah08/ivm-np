export const mockIssues = [
  {
    id: '1',
    complaintNumber: 'IND2024001',
    userName: 'राहुल शर्मा',
    userPhone: '+91 9876543210',
    title: 'सड़क में गड्ढे',
    description: 'मुख्य सड़क पर बड़े गड्ढे हैं जो दुर्घटनाओं का कारण बन रहे हैं। यातायात में बहुत परेशानी हो रही है।',
    category: 'Infrastructure',
    priority: 'high',
    status: 'pending',
    location: {
      lat: 22.7196,
      lng: 75.8577,
      address: 'राजवाड़ा, इंदौर'
    },
    assignedDepartments: [],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    complaintNumber: 'IND2024002',
    userName: 'प्रिया पटेल',
    userPhone: '+91 9876543211',
    title: 'पानी की समस्या',
    description: 'पिछले 3 दिनों से पानी की आपूर्ति बंद है। घर में पानी का बिल्कुल इंतजाम नहीं है।',
    category: 'Water Supply',
    priority: 'high',
    status: 'assigned',
    location: {
      lat: 22.7167,
      lng: 75.8545,
      address: 'सरवटे बस स्टैंड, इंदौर'
    },
    assignedDepartments: ['water-dept'],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-15'
  },
  {
    id: '3',
    complaintNumber: 'IND2024003',
    userName: 'अमित गुप्ता',
    userPhone: '+91 9876543212',
    title: 'स्ट्रीट लाइट खराब',
    description: 'कॉलोनी में कई स्ट्रीट लाइट काम नहीं कर रही हैं। रात में बहुत अंधेरा रहता है।',
    category: 'Electricity',
    priority: 'medium',
    status: 'in-progress',
    location: {
      lat: 22.7083,
      lng: 75.8648,
      address: 'विजय नगर, इंदौर'
    },
    assignedDepartments: ['electricity-dept'],
    createdAt: '2024-01-13',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    complaintNumber: 'IND2024004',
    userName: 'सुनीता यादव',
    userPhone: '+91 9876543213',
    title: 'कूड़े का ढेर',
    description: 'पार्क के पास कूड़ा जमा हो गया है और बदबू आ रही है। स्वास्थ्य के लिए हानिकारक है।',
    category: 'Waste Management',
    priority: 'medium',
    status: 'pending',
    location: {
      lat: 22.7281,
      lng: 75.8626,
      address: 'लालबाग, इंदौर'
    },
    assignedDepartments: [],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    complaintNumber: 'IND2024005',
    userName: 'विकास जैन',
    userPhone: '+91 9876543214',
    title: 'पार्क की सफाई',
    description: 'पार्क में घास काटने की जरूरत है और पेड़ों की छंटाई भी करनी है।',
    category: 'Parks & Gardens',
    priority: 'low',
    status: 'pending',
    location: {
      lat: 22.7240,
      lng: 75.8710,
      address: 'इंद्रपुरी, इंदौर'
    },
    assignedDepartments: [],
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11'
  },
  {
    id: '6',
    complaintNumber: 'IND2024006',
    userName: 'मीरा अग्रवाल',
    userPhone: '+91 9876543215',
    title: 'नाली में रुकावट',
    description: 'बारिश के पानी की नाली में रुकावट है। पानी जमा हो रहा है।',
    category: 'Drainage',
    priority: 'high',
    status: 'completed',
    location: {
      lat: 22.6980,
      lng: 75.8570,
      address: 'एमआईजी, इंदौर'
    },
    assignedDepartments: ['public-works'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-16'
  }
];

export const mockDepartments = [
  {
    id: 'water-dept',
    name: 'जल आपूर्ति विभाग',
    head: 'श्री रमेश कुमार',
    phone: '+91 9876501234',
    email: 'water@indore.gov.in',
    totalIssues: 12,
    completedIssues: 8
  },
  {
    id: 'electricity-dept',
    name: 'विद्युत विभाग',
    head: 'श्रीमती सुनीता देवी',
    phone: '+91 9876501235',
    email: 'electricity@indore.gov.in',
    totalIssues: 18,
    completedIssues: 14
  },
  {
    id: 'public-works',
    name: 'लोक निर्माण विभाग',
    head: 'श्री अनिल वर्मा',
    phone: '+91 9876501236',
    email: 'publicworks@indore.gov.in',
    totalIssues: 25,
    completedIssues: 20
  },
  {
    id: 'waste-management',
    name: 'अपशिष्ट प्रबंधन विभाग',
    head: 'श्री राजेश पटेल',
    phone: '+91 9876501237',
    email: 'waste@indore.gov.in',
    totalIssues: 15,
    completedIssues: 12
  },
  {
    id: 'parks-gardens',
    name: 'पार्क एवं उद्यान विभाग',
    head: 'श्रीमती प्रिया शर्मा',
    phone: '+91 9876501238',
    email: 'parks@indore.gov.in',
    totalIssues: 8,
    completedIssues: 6
  },
  {
    id: 'health-dept',
    name: 'स्वास्थ्य विभाग',
    head: 'डॉ. अमित गुप्ता',
    phone: '+91 9876501239',
    email: 'health@indore.gov.in',
    totalIssues: 10,
    completedIssues: 7
  }
];