import React, { useState, useEffect } from 'react';
import { 
  INITIAL_STAFF, 
  INITIAL_DEADLINES, 
  INITIAL_DELEGATED_TASKS, 
  INITIAL_DAILY_POSTS, 
  INITIAL_REPORTS, 
  INITIAL_SETTINGS 
} from './initialData';
import { 
  StaffProfile, 
  ClientDeadline, 
  TaskDelegation, 
  DailyPost, 
  CEOReport, 
  SystemSettings,
  AttendanceLog,
  DirectOrder
} from './types';
import { DashboardCharts } from './components/DashboardCharts';
import { generateDailyTaskPDF } from './pdfGenerator';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Send, 
  CheckSquare, 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Upload, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Unlock, 
  TrendingUp, 
  LogOut, 
  MapPin, 
  Globe, 
  FileSpreadsheet, 
  BookOpen, 
  Briefcase, 
  Layers, 
  Activity, 
  UserPlus, 
  ShieldAlert,
  ChevronRight,
  ClipboardList,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  Link,
  AlertCircle,
  Trash2
} from 'lucide-react';

export default function App() {
  // --- 1. CORE PERSISTENT STATE ---
  const [currentUser, setCurrentUser] = useState<StaffProfile | null>(() => {
    const saved = localStorage.getItem('nexform_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [staffList, setStaffList] = useState<StaffProfile[]>(() => {
    const saved = localStorage.getItem('nexform_staff_list');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [clientDeadlines, setClientDeadlines] = useState<ClientDeadline[]>(() => {
    const saved = localStorage.getItem('nexform_client_deadlines');
    return saved ? JSON.parse(saved) : INITIAL_DEADLINES;
  });

  const [delegatedTasks, setDelegatedTasks] = useState<TaskDelegation[]>(() => {
    const saved = localStorage.getItem('nexform_delegated_tasks');
    return saved ? JSON.parse(saved) : INITIAL_DELEGATED_TASKS;
  });

  const [dailyPosts, setDailyPosts] = useState<DailyPost[]>(() => {
    const saved = localStorage.getItem('nexform_daily_posts');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_POSTS;
  });

  const [ceoReports, setCeoReports] = useState<CEOReport[]>(() => {
    const saved = localStorage.getItem('nexform_ceo_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('nexform_system_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Save states to localStorage on state change
  useEffect(() => {
    localStorage.setItem('nexform_current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nexform_staff_list', JSON.stringify(staffList));
  }, [staffList]);

  useEffect(() => {
    localStorage.setItem('nexform_client_deadlines', JSON.stringify(clientDeadlines));
  }, [clientDeadlines]);

  useEffect(() => {
    localStorage.setItem('nexform_delegated_tasks', JSON.stringify(delegatedTasks));
  }, [delegatedTasks]);

  useEffect(() => {
    localStorage.setItem('nexform_daily_posts', JSON.stringify(dailyPosts));
  }, [dailyPosts]);

  useEffect(() => {
    localStorage.setItem('nexform_ceo_reports', JSON.stringify(ceoReports));
  }, [ceoReports]);

  useEffect(() => {
    localStorage.setItem('nexform_system_settings', JSON.stringify(systemSettings));
  }, [systemSettings]);

  // --- ATTENDANCE SYSTEM STATE ---
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(() => {
    const saved = localStorage.getItem('nexform_attendance_logs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'att-1', staffId: 'shahar-1', staffName: 'Shahar Bano', date: '2026-06-05', time: '09:05 AM', status: 'Present', department: 'Instagram Graphic Design' },
      { id: 'att-2', staffId: 'naila-1', staffName: 'Naila Bashar', date: '2026-06-05', time: '08:45 AM', status: 'Present', department: 'LinkedIn Marketing' },
      { id: 'att-3', staffId: 'arhum-1', staffName: 'Arhum Hussain', date: '2026-06-05', time: '09:22 AM', status: 'Late', department: 'Facebook Graphic Design' },
      { id: 'att-4', staffId: 'shahar-1', staffName: 'Shahar Bano', date: '2026-06-04', time: '08:55 AM', status: 'Present', department: 'Instagram Graphic Design' },
      { id: 'att-5', staffId: 'naila-1', staffName: 'Naila Bashar', date: '2026-06-04', time: '08:42 AM', status: 'Present', department: 'LinkedIn Marketing' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexform_attendance_logs', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  // Automatic migration effect to enforce user-provided credentials on first launch
  useEffect(() => {
    const hasOldCredentials = staffList.some(s => 
      s.email.toLowerCase().includes('@nexform.com') || 
      s.password === 'admin' || 
      s.password === 'shahar123' ||
      s.password === 'naila123' ||
      s.password === 'arhum123'
    );

    if (hasOldCredentials) {
      const migrated = staffList.map(s => {
        if (s.id === 'ceo-1') {
          return { ...s, email: 'Haseeb@123', password: 'Haseeb@123' };
        } else if (s.id === 'shahar-1') {
          return { ...s, name: 'Shahar Bano', email: 'Bano@123', password: 'Bano@123' };
        } else if (s.id === 'naila-1') {
          return { ...s, name: 'Naila Bashar', email: 'Naila@123', password: 'Naila@123' };
        } else if (s.id === 'arhum-1') {
          return { ...s, name: 'Arhum Hussain', email: 'Arhum@123', password: 'Arhum@123' };
        }
        return s;
      });

      setStaffList(migrated);
      localStorage.setItem('nexform_staff_list', JSON.stringify(migrated));
      
      setCurrentUser(null);
      localStorage.removeItem('nexform_current_user');
      
      setDailyPosts([]);
      localStorage.setItem('nexform_daily_posts', '[]');
    }
  }, []);

  // Personal profile updates states for current employee
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState('');
  const [profileLinkedin, setProfileLinkedin] = useState('');
  const [profileInstagram, setProfileInstagram] = useState('');
  const [profileFacebook, setProfileFacebook] = useState('');
  const [profilePassword, setProfilePassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfileBio(currentUser.bio || '');
      setProfileAvatarUrl(currentUser.avatarUrl || '');
      setProfileLinkedin(currentUser.linkedinUrl || '');
      setProfileInstagram(currentUser.instagramUrl || '');
      setProfileFacebook(currentUser.facebookUrl || '');
      setProfilePassword(currentUser.password || '');
    }
  }, [currentUser]);

  // --- DIRECT ORDERS STATE ---
  const [directOrders, setDirectOrders] = useState<DirectOrder[]>(() => {
    const saved = localStorage.getItem('nexform_direct_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ord-1',
        ceoName: 'CEO Administrator',
        title: 'Establish Urgent Verve Cosmetics Launch Grid',
        instructions: 'Please design the complete 30-day organic catalog grid layout. Send the draft in PDF format directly for review prior to final Instagram post scheduling.',
        staffIds: ['shahar-1'],
        date: '2026-06-05',
        time: '11:20 AM PST',
        format: 'PDF Doc',
        status: 'Pending'
      },
      {
        id: 'ord-2',
        ceoName: 'CEO Administrator',
        title: 'B2B Enterprise Lead Sequence Refinement',
        instructions: 'Update the outbound email sequence for Algonquin Tech. Ensure LinkedIn landing page CTA leads to the official calendar booking link.',
        staffIds: ['naila-1'],
        date: '2026-06-05',
        time: '02:15 PM PST',
        format: 'Email',
        status: 'Completed'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexform_direct_orders', JSON.stringify(directOrders));
  }, [directOrders]);

  // CEO order inputs
  const [newOrderTitle, setNewOrderTitle] = useState('');
  const [newOrderInstructions, setNewOrderInstructions] = useState('');
  const [newOrderStaffSelector, setNewOrderStaffSelector] = useState('all');
  const [newOrderFormat, setNewOrderFormat] = useState<'Email' | 'PDF Doc' | 'Direct Directive' | 'Urgent Order'>('Direct Directive');

  // --- 2. GUI NAVIGATION & INPUTS ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active tab inside CEO and Staff workspaces
  const [ceoActiveTab, setCeoActiveTab] = useState<'dashboard' | 'staff' | 'tasks' | 'reports' | 'settings' | 'attendance' | 'orders'>('dashboard');
  const [staffActiveTab, setStaffActiveTab] = useState<'report' | 'tasks' | 'reports' | 'pdf' | 'profile' | 'orders'>('report');

  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState('2026-06-06');
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState('');
  const [manualStaffId, setManualStaffId] = useState('');
  const [manualCheckInTime, setManualCheckInTime] = useState('09:00');

  // Success/Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'warning'>('success');

  const showToast = (msg: string, type: 'success' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- 3. CEO FORMS STATE ---
  // Monthly Custom Duties State
  const [selectedDutyStaffId, setSelectedDutyStaffId] = useState('');
  const [dutyDescription, setDutyDescription] = useState('');
  const [dutyTime, setDutyTime] = useState('10:00 AM');

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Instagram Graphic Design' as StaffProfile['department'],
    canPost: true,
    canViewAnalytics: false,
    canManageStaff: false,
    canConfigureSystem: false,
    canAccessVault: true
  });

  const [newDeadline, setNewDeadline] = useState({
    clientName: '',
    projectName: '',
    dueDate: '',
    status: 'In Progress' as ClientDeadline['status'],
    category: 'Design' as ClientDeadline['category']
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedToId: 'shahar-1',
    priority: 'Medium' as TaskDelegation['priority']
  });

  // --- 4. STAFF INPUT STATE ---
  const [pPostedToday, setPPostedToday] = useState<boolean>(true);
  const [pPostDetails, setPPostDetails] = useState('');
  const [pPostLink, setPPostLink] = useState('');
  const [pNoPostReason, setPNoPostReason] = useState('');
  const [pDmCount, setPDmCount] = useState<number>(15);
  const [pDmLocal, setPDmLocal] = useState<number>(7);
  const [pDmInternational, setPDmInternational] = useState<number>(8);
  
  // Platform specific
  const [pFbGroups, setPFbGroups] = useState<number>(3);
  const [pFbGroupsLocal, setPFbGroupsLocal] = useState<number>(2);
  const [pFbGroupsIntl, setPFbGroupsIntl] = useState<number>(1);
  const [pLiFollowUp, setPLiFollowUp] = useState<number>(5);
  const [pLiRefused, setPLiRefused] = useState<number>(2);
  const [pLiLanded, setPLiLanded] = useState<number>(1);

  // Time metrics for 2-hour compliance check
  const [postedTime, setPostedTime] = useState('09:00');
  const [sharedTime, setSharedTime] = useState('10:15');

  // Screenshots file state
  const [pScreenshotFile, setPScreenshotFile] = useState<{ name: string; size: string; preview: string } | null>(null);

  // Custom Monthly CEO Duty Input States
  const [pCustomDutySubmitted, setPCustomDutySubmitted] = useState<boolean>(true);
  const [pCustomDutyText, setPCustomDutyText] = useState<string>('');

  // CEO edit/credential states
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [editingStaffName, setEditingStaffName] = useState<string>('');
  const [editingStaffEmail, setEditingStaffEmail] = useState<string>('');
  const [editingStaffPassword, setEditingStaffPassword] = useState<string>('');

  // Send Direct Request / Report to CEO
  const [repType, setRepType] = useState<'Request' | 'Urgent Report' | 'Complaint' | 'Feedback'>('Request');
  const [repSubject, setRepSubject] = useState('');
  const [repContent, setRepContent] = useState('');

  // --- 5. INTERACTIVE FUNCTIONS & LOGOUT ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = loginEmail.trim().toLowerCase();
    const found = staffList.find(
      (s) => (s.email.toLowerCase() === trimmedEmail || s.name.toLowerCase() === trimmedEmail) && s.password === loginPassword
    );

    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}! Access level: ${found.role}`);
      setLoginPassword('');
    } else {
      setLoginError('Invalid Nexform credentials. Double-check your access credentials.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCeoActiveTab('dashboard');
    setStaffActiveTab('report');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleQuickLogin = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    const found = staffList.find(s => s.email.toLowerCase() === email.toLowerCase() && s.password === pass);
    if (found) {
      setCurrentUser(found);
      showToast(`Logged in instantly as ${found.name}`);
    }
  };

  // --- CEO ACTIONS ---
  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      showToast('Please fill out all staff registration parameters', 'warning');
      return;
    }

    const emailExists = staffList.some(s => s.email.toLowerCase() === newStaff.email.toLowerCase());
    if (emailExists) {
      showToast('Email address already registered', 'warning');
      return;
    }

    const created: StaffProfile = {
      id: `staff-${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email.trim(),
      role: 'Staff',
      department: newStaff.department,
      joinedDate: new Date().toISOString().split('T')[0],
      permissions: {
        canPost: newStaff.canPost,
        canViewAnalytics: newStaff.canViewAnalytics,
        canManageStaff: newStaff.canManageStaff,
        canConfigureSystem: newStaff.canConfigureSystem,
        canAccessVault: newStaff.canAccessVault,
      },
      password: newStaff.password
    };

    setStaffList([...staffList, created]);
    setNewStaff({
      name: '',
      email: '',
      password: '',
      department: 'Instagram Graphic Design',
      canPost: true,
      canViewAnalytics: false,
      canManageStaff: false,
      canConfigureSystem: false,
      canAccessVault: true
    });
    
    // Add to audit logs
    const updatedLogs = [
      { timestamp: new Date().toLocaleString(), action: `Onboarded Staff Core Profile: ${created.name}`, user: currentUser?.email || 'CEO' },
      ...systemSettings.vaultAuditLog
    ];
    setSystemSettings({ ...systemSettings, vaultAuditLog: updatedLogs });

    showToast(`Staff member ${created.name} successfully registered with password!`);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (id === 'ceo-1' || id === currentUser?.id) {
      showToast('Cannot delete standard administrative CEO account', 'warning');
      return;
    }
    if (confirm(`Are you sure you want to remove the staff access for ${name}?`)) {
      setStaffList(staffList.filter(s => s.id !== id));
      showToast(`Removed access credentials for ${name}`);
    }
  };

  const handleUpdatePermissions = (id: string, fields: Partial<StaffProfile['permissions']>) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          permissions: {
            ...s.permissions,
            ...fields
          }
        };
      }
      return s;
    }));
    showToast('Staff credentials level permissions updated.');
  };

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadline.clientName || !newDeadline.projectName || !newDeadline.dueDate) {
      showToast('Please provide brand client, name and due date.', 'warning');
      return;
    }

    const created: ClientDeadline = {
      id: `dl-${Date.now()}`,
      clientName: newDeadline.clientName,
      projectName: newDeadline.projectName,
      dueDate: newDeadline.dueDate,
      status: newDeadline.status,
      category: newDeadline.category
    };

    setClientDeadlines([...clientDeadlines, created]);
    setNewDeadline({
      clientName: '',
      projectName: '',
      dueDate: '',
      status: 'In Progress',
      category: 'Design'
    });
    showToast(`Assigned client milestone deadline for ${created.clientName}`);
  };

  const handleDeleteDeadline = (id: string) => {
    setClientDeadlines(clientDeadlines.filter(d => d.id !== id));
    showToast('Client milestone cleared from dashboard.');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      showToast('Provide task briefing title & details.', 'warning');
      return;
    }

    const staffMember = staffList.find(s => s.id === newTask.assignedToId);
    if (!staffMember) return;

    const created: TaskDelegation = {
      id: `tsk-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      assignedToId: newTask.assignedToId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      priority: newTask.priority,
      department: staffMember.department
    };

    setDelegatedTasks([created, ...delegatedTasks]);
    setNewTask({
      title: '',
      description: '',
      assignedToId: staffList.find(s => s.role === 'Staff')?.id || 'shahar-1',
      priority: 'Medium'
    });
    showToast(`Delegated new workspace instruction to ${staffMember.name}`);
  };

  const handleReassignTask = (taskId: string, targetStaffId: string) => {
    const target = staffList.find(s => s.id === targetStaffId);
    if (!target) return;

    setDelegatedTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          assignedToId: targetStaffId,
          department: target.department
        };
      }
      return t;
    }));
    showToast(`Task reassigned cleanly to ${target.name} based on workload capacity.`);
  };

  const handleMarkTaskStatus = (taskId: string, newStatus: 'Completed' | 'Pending') => {
    setDelegatedTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
    showToast(`Task updated to ${newStatus}`);
  };

  // Toggle reported review state
  const handleReviewReport = (id: string, status: CEOReport['status']) => {
    setCeoReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Feedback set to status: ${status}`);
  };

  // CSV EXPORT GENERATOR (Excel & Word support)
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Nexform Agency Performance Summary\n';
    csvContent += `Generated On,${new Date().toLocaleDateString()}\n\n`;
    
    // Section 1: Staff Directory
    csvContent += 'STAFF ROSTER\n';
    csvContent += 'Name,Email,Department,Role,Date Joined\n';
    staffList.forEach(s => {
      csvContent += `"${s.name}","${s.email}","${s.department}","${s.role}","${s.joinedDate}"\n`;
    });
    csvContent += '\n';

    // Section 2: Post Stats 
    csvContent += 'SOCIAL CONTENT COMPLIANCE ENTRIES\n';
    csvContent += 'Staff Name,Date Reported,Channel,Posted?,Local DMs,Intl DMs,Total DMs,Shared Link,Shared Within 2 Hrs Limit,Reason If Didnt Post\n';
    dailyPosts.forEach(p => {
      const staffRef = staffList.find(s => s.id === p.staffId);
      csvContent += `"${staffRef?.name || 'Unknown'}",${p.date},"${p.platform}",${p.postedToday ? 'YES' : 'NO'},${p.dmLocal},${p.dmInternational},${p.dmCount},"${p.postLink || 'None'}",${p.postedToday ? (p.sharedWithinTwoHours ? 'YES' : 'NO') : 'N/A'},"${p.noPostReason || 'None Specified'}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nexform_Agency_Workflow_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV statistics compiled! Double-click to open in Microsoft Excel or Word.');
  };

  // -- UPDATE ADMIN CONFIG REGISTRY
  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLogs = [
      { timestamp: new Date().toLocaleString().split(',')[0], action: 'Re-Edited Access Control & Policy Settings', user: currentUser?.email || 'CEO' },
      ...systemSettings.vaultAuditLog
    ];
    setSystemSettings({
      ...systemSettings,
      vaultAuditLog: updatedLogs
    });
    showToast('Secure system credentials constraints saved successfully!');
  };

  // --- STAFF ACTIONS ---
  // Handle Mock Screenshot select file upload
  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeKB = Math.round(file.size / 1024) + ' KB';
      const reader = new FileReader();
      reader.onloadend = () => {
        setPScreenshotFile({
          name: file.name,
          size: sizeKB,
          preview: reader.result as string
        });
        showToast(`Screenshot uploaded successfully: ${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Post reporting
  const handleSubmitPostLog = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    // Strict validation
    if (pPostedToday && !pPostDetails) {
      showToast('Please state what design asset or content you posted today.', 'warning');
      return;
    }
    if (pPostedToday && !pPostLink) {
      showToast('Please provide a valid client shareable asset link.', 'warning');
      return;
    }
    if (!pPostedToday && !pNoPostReason) {
      showToast('A compliance justification is required if you did not post today.', 'warning');
      return;
    }

    if (pDmCount > 30) {
      showToast('Policy Limit: Direct Messages sent must be 30 or less daily.', 'warning');
      return;
    }

    // Determine 2 hours limit threshold based on postedTime and sharedTime
    let onTime = true;
    try {
      const [postH, postM] = postedTime.split(':').map(Number);
      const [shareH, shareM] = sharedTime.split(':').map(Number);
      const postMinutes = postH * 60 + postM;
      const shareMinutes = shareH * 60 + shareM;
      const hourDiff = (shareMinutes - postMinutes) / 60;
      onTime = hourDiff >= 0 && hourDiff <= 2.0;
    } catch {
      onTime = true;
    }

    // Construct submission screenshot 
    const attachedScreenshots: Array<{ name: string; url: string; size: string }> = [];
    if (pScreenshotFile) {
      attachedScreenshots.push({
        name: pScreenshotFile.name,
        url: pScreenshotFile.preview,
        size: pScreenshotFile.size
      });
    }

    // Determine platform
    let pPlatform: DailyPost['platform'] = 'Instagram';
    if (currentUser.department.includes('Instagram')) pPlatform = 'Instagram';
    if (currentUser.department.includes('Facebook')) pPlatform = 'Facebook';
    if (currentUser.department.includes('LinkedIn')) pPlatform = 'LinkedIn';

    const newLog: DailyPost = {
      id: `pst-${Date.now()}`,
      staffId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      platform: pPlatform,
      postedToday: pPostedToday,
      postDetails: pPostedToday ? pPostDetails : undefined,
      postLink: pPostedToday ? pPostLink : undefined,
      submittedAt: new Date().toLocaleTimeString(),
      sharedWithinTwoHours: pPostedToday ? onTime : undefined,
      noPostReason: !pPostedToday ? pNoPostReason : undefined,
      dmCount: pDmCount,
      dmLocal: pDmLocal,
      dmInternational: pDmInternational,
      screenshots: attachedScreenshots,
      customDutySubmitted: pCustomDutySubmitted,
      customDutyText: pCustomDutyText || undefined,
      
      // Facebook
      fbGroupsJoinedToday: pPlatform === 'Facebook' ? pFbGroups : undefined,
      fbGroupsLocal: pPlatform === 'Facebook' ? pFbGroupsLocal : undefined,
      fbGroupsInternational: pPlatform === 'Facebook' ? pFbGroupsIntl : undefined,
      
      // LinkedIn
      linkedInFollowUps: pPlatform === 'LinkedIn' ? pLiFollowUp : undefined,
      linkedInRefused: pPlatform === 'LinkedIn' ? pLiRefused : undefined,
      linkedInLandedToCall: pPlatform === 'LinkedIn' ? pLiLanded : undefined
    };

    // Replace today's log if already entered or append
    const cleanList = dailyPosts.filter(p => !(p.staffId === currentUser.id && p.date === newLog.date));
    setDailyPosts([newLog, ...cleanList]);
    
    // Clean inputs
    setPPostDetails('');
    setPPostLink('');
    setPNoPostReason('');
    setPScreenshotFile(null);
    setPCustomDutySubmitted(true);
    setPCustomDutyText('');

    // If did not post, auto forward complaint/escalation to CEO
    if (!pPostedToday) {
      const autoReport: CEOReport = {
        id: `rep-auto-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        type: 'Urgent Report',
        subject: `Post Escalation - Non-Compliance Explanation`,
        content: `Auto-Escalation logged due to missed daily content. Reason stated: ${pNoPostReason}`,
        status: 'Pending'
      };
      setCeoReports([autoReport, ...ceoReports]);
      showToast('Daily check-in completed. missed post reason directly escalated to CEO.', 'warning');
    } else {
      showToast('Daily post audit report recorded! Nice job maintaining professional compliance!');
    }
  };

  const handleSubmitRequestToCEO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !repSubject || !repContent) {
      showToast('Please type your topic subject and message content.', 'warning');
      return;
    }

    const report: CEOReport = {
      id: `rep-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      type: repType,
      subject: repSubject,
      content: repContent,
      status: 'Pending'
    };

    setCeoReports([report, ...ceoReports]);
    setRepSubject('');
    setRepContent('');
    showToast('Your message has been directly submitted onto the CEO panel dashboard.');
  };

  // --- STATS HELPER CALCULATORS ---
  const getCurrentUserPostLogToday = () => {
    if (!currentUser) return null;
    const todayStr = new Date().toISOString().split('T')[0];
    return dailyPosts.find(p => p.staffId === currentUser.id && p.date === todayStr) || null;
  };

  const calculateMonthlyPerformance = (staffId: string) => {
    const logs = dailyPosts.filter(p => p.staffId === staffId);
    if (logs.length === 0) return 0;
    const postsCount = logs.filter(p => p.postedToday).length;
    return Math.round((postsCount / logs.length) * 100);
  };

  // --- COMPONENT HANDLERS FOR NEW PROFILE & ATTENDANCE FEATURES ---
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!profileName.trim()) {
      showToast('Profile display name cannot be empty.', 'warning');
      return;
    }

    if (currentUser.role === 'Staff' && !profileLinkedin.trim()) {
      showToast('LinkedIn profile link is required (must be provided) for agency compliance.', 'warning');
      return;
    }

    const updatedProfile: StaffProfile = {
      ...currentUser,
      name: profileName.trim(),
      bio: profileBio.trim(),
      avatarUrl: profileAvatarUrl.trim(),
      linkedinUrl: profileLinkedin.trim(),
      instagramUrl: profileInstagram.trim(),
      facebookUrl: profileFacebook.trim(),
      password: profilePassword
    };

    // Update session state
    setCurrentUser(updatedProfile);

    // Update staff array so CEO directory details match
    setStaffList(prev => prev.map(s => s.id === currentUser.id ? updatedProfile : s));

    // Append to system vault audit log
    const updatedLogs = [
      { timestamp: new Date().toLocaleString(), action: `Updated profile details: ${profileName} with social coordinates`, user: currentUser.email },
      ...systemSettings.vaultAuditLog
    ];
    setSystemSettings({ ...systemSettings, vaultAuditLog: updatedLogs });

    showToast('Your personal profile credentials and social networks have been saved successfully!');
  };

  const handleRecordAttendance = (suppliedTimeStr?: string) => {
    if (!currentUser) return;
    const todayDate = '2026-06-06';
    const exists = attendanceLogs.some(log => log.staffId === currentUser.id && log.date === todayDate);
    if (exists) {
      showToast('You have already taken your daily attendance for today!', 'warning');
      return;
    }

    let timeRepresentation = '';
    let status: 'Present' | 'Late' = 'Present';

    if (suppliedTimeStr) {
      // CEO manual overriding mechanism
      try {
        const [h, m] = suppliedTimeStr.split(':').map(Number);
        if (h > 9 || (h === 9 && m > 0)) {
          status = 'Late';
        }
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 === 0 ? 12 : h % 12;
        const displayM = m < 10 ? '0' + m : m;
        timeRepresentation = `${displayH}:${displayM} ${ampm}`;
      } catch {
        timeRepresentation = suppliedTimeStr;
      }
    } else {
      // Exact Pakistan Karachi Standard Time capture
      const now = new Date();
      try {
        const formatter24 = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const formatted24 = formatter24.format(now);
        const [h, m] = formatted24.split(':').map(Number);
        if (h > 9 || (h === 9 && m > 0)) {
          status = 'Late';
        }

        const ampmFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        timeRepresentation = ampmFormatter.format(now) + ' PST';
      } catch {
        // Precise Manual offset (Karachi is UTC+5)
        const utcHours = now.getUTCHours();
        const karachiHours = (utcHours + 5) % 24;
        const minutes = now.getUTCMinutes();
        if (karachiHours > 9 || (karachiHours === 9 && minutes > 0)) {
          status = 'Late';
        }
        const ampm = karachiHours >= 12 ? 'PM' : 'AM';
        const displayH = karachiHours % 12 === 0 ? 12 : karachiHours % 12;
        const displayM = minutes < 10 ? '0' + minutes : minutes;
        timeRepresentation = `${displayH}:${displayM} ${ampm} PST`;
      }
    }

    const newLog: AttendanceLog = {
      id: `att-${Date.now()}`,
      staffId: currentUser.id,
      staffName: currentUser.name,
      date: todayDate,
      time: timeRepresentation,
      status,
      department: currentUser.department
    };

    setAttendanceLogs([newLog, ...attendanceLogs]);
    showToast(`Check-In recorded at ${timeRepresentation} (Pakistan Karachi time) and shared with CEO!`);
  };

  // Dynamic workload check for employees to assist visual task assignment
  const getStaffWorkloadBadge = (staffId: string) => {
    const pendCount = delegatedTasks.filter(t => t.assignedToId === staffId && t.status === 'Pending').length;
    if (pendCount === 0) return { text: 'Fully Available', style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (pendCount <= 1) return { text: 'Optimal Load (1)', style: 'bg-blue-500/10 text-sky-400 border-sky-500/20' };
    return { text: `High Load (${pendCount})`, style: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
  };

  // Filter lists based on role
  const getDailyTransmittedUploads = () => {
    return dailyPosts.filter(p => p.screenshots && p.screenshots.length > 0);
  };


  return (
    <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 flex flex-col font-sans transition-all selection:bg-emerald-500 selection:text-zinc-900">
      
      {/* 4000ms Notification Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-xl animate-bounce backdrop-blur-md transition-all duration-300 ${
          toastType === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300' 
            : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
        }`}>
          <div className="p-1 rounded-full bg-black/40">
            {toastType === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
          </div>
          <p className="text-sm font-medium tracking-tight font-sans">{toastMessage}</p>
        </div>
      )}

      {/* --- NOT LOGGED IN FRAME --- */}
      {!currentUser ? (
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          
          {/* Subtle cosmic light elements */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-12 right-12 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Minimalist Centered Logo Layout */}
          <div className="w-full max-w-md space-y-8 z-10">
            <div className="text-center space-y-2">
              <div id="company-logo" className="flex flex-col items-center">
                <div className="text-5xl font-extrabold tracking-tight text-white flex items-center select-none">
                  <span>Nex</span>
                  <span className="text-emerald-500 font-extrabold relative inline-block transform skew-x-[-8deg] px-0.5 drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]">x</span>
                  <span>form</span>
                </div>
                <div className="text-xs uppercase tracking-[0.35em] text-zinc-500 font-semibold mt-1">Agency</div>
              </div>
              <h2 className="text-xl font-medium tracking-tight text-zinc-300 pt-3">
                Intranet Operations Portal
              </h2>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Secure access gateway for managing project logs, outreach parameters, permissions, and direct performance reports.
              </p>
            </div>

            {/* Login form */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Access Identification (Email Address)
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter email e.g. CEO or Founder"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Security Verification Link or Password
                    </label>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                  />
                </div>

                {loginError && (
                  <div className="bg-red-950/40 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate Securely</span>
                </button>
              </form>
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                <Lock className="w-3 h-3 text-emerald-500" /> End-to-End Cryptography Active
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* --- LOGGED IN USER VIEWPORTS --- */
        <div className="flex-1 flex flex-col">
          
          {/* Main Top Header Navigation */}
          <header className="bg-zinc-950 border-b border-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3">
              <div className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center">
                <span>Nex</span>
                <span className="text-emerald-500 font-extrabold transform skew-x-[-8deg] px-0.5">x</span>
                <span>form</span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-[0.3em] font-mono ml-2 border-l border-zinc-800 pl-2">Hub</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 pr-4 rounded-xl">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-emerald-500 font-mono">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold text-white font-sans">{currentUser.name}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider font-mono">
                    {currentUser.role === 'CEO' ? 'CEO Admin' : currentUser.department}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-black/40 hover:bg-zinc-900 hover:text-red-400 p-2.5 rounded-xl border border-zinc-800 text-zinc-400 cursor-pointer transition-colors"
                title="Log Out of Hub"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            
            {/* ======================================= */}
            {/* CEO PANEL VIEWPORT (Authenticated CEO) */}
            {/* ======================================= */}
            {currentUser.role === 'CEO' && (
              <div className="space-y-6">
                
                {/* Visual Tab Selection */}
                <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-3">
                  <button
                    onClick={() => setCeoActiveTab('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'dashboard' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Analytics Dashboard</span>
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('staff')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'staff' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Staff Directory</span>
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('tasks')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'tasks' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Task Workflows</span>
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('orders')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'orders' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Direct Orders</span>
                    {directOrders.filter(o => o.status === 'Pending').length > 0 && (
                      <span className="bg-amber-500 text-zinc-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {directOrders.filter(o => o.status === 'Pending').length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('reports')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'reports' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Incoming Vault Reports</span>
                    {ceoReports.filter(r => r.status === 'Pending').length > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {ceoReports.filter(r => r.status === 'Pending').length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('attendance')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'attendance' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Daily Attendance</span>
                  </button>

                  <button
                    onClick={() => setCeoActiveTab('settings')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      ceoActiveTab === 'settings' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>System Constraints</span>
                  </button>
                </div>

                {/* --- TAB 1: ANALYTICS DASHBOARD --- */}
                {ceoActiveTab === 'dashboard' && (
                  <div className="space-y-6">
                    
                    {/* Welcome Card & CSV Export Block */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Administrative Portal Overview</h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Consolidated metric analytics from social designer departments, outbound client lead acquisition, and live milestones.
                        </p>
                      </div>
                      <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-emerald-400 font-bold px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/25 transition-all text-xs cursor-pointer font-mono"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export CSV Summary</span>
                      </button>
                    </div>

                    {/* Handcrafted Highly Visual SVG Charts & Matrix Widgets */}
                    <DashboardCharts dailyPosts={dailyPosts} clientDeadlines={clientDeadlines} />

                    {/* Client Milestones Deadlines Matrix */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                      <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Client Project Deadlines tracker</h3>
                          <p className="text-[11px] text-zinc-500 mt-0.5">Automated visual status warnings for critical partner timelines</p>
                        </div>
                      </div>

                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* List column */}
                        <div className="md:col-span-2 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {clientDeadlines.map((dl) => {
                            const badgeColors = {
                              Urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
                              'In Progress': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
                              Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                              Delayed: 'bg-zinc-500/10 text-zinc-400 border-zinc-800'
                            };
                            return (
                              <div key={dl.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex justify-between items-center hover:border-zinc-700 transition-all">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-xs font-bold leading-tight">{dl.clientName}</span>
                                    <span className="text-[9px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-500 font-mono">{dl.category}</span>
                                  </div>
                                  <p className="text-[11px] text-zinc-400 font-medium">{dl.projectName}</p>
                                  <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Due date: {dl.dueDate}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg border leading-none ${badgeColors[dl.status]}`}>
                                    {dl.status}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteDeadline(dl.id)}
                                    className="p-1 hover:text-red-400 text-zinc-600 transition-colors"
                                    title="Delete Deadline"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Add Milestone form */}
                        <div className="bg-zinc-950 p-4 border border-zinc-850 rounded-xl space-y-4">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Log Client Milestone</h4>
                          <form onSubmit={handleAddDeadline} className="space-y-3">
                            <div>
                              <input 
                                type="text"
                                placeholder="Client / Brand Name"
                                required
                                value={newDeadline.clientName}
                                onChange={(e) => setNewDeadline({ ...newDeadline, clientName: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
                              />
                            </div>
                            <div>
                              <input 
                                type="text"
                                placeholder="Deliverables Brief / Project Name"
                                required
                                value={newDeadline.projectName}
                                onChange={(e) => setNewDeadline({ ...newDeadline, projectName: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] text-zinc-500 uppercase font-bold mb-1">Due Date</label>
                                <input 
                                  type="date"
                                  required
                                  value={newDeadline.dueDate}
                                  onChange={(e) => setNewDeadline({ ...newDeadline, dueDate: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] text-zinc-500 uppercase font-bold mb-1">Status</label>
                                <select
                                  value={newDeadline.status}
                                  onChange={(e) => setNewDeadline({ ...newDeadline, status: e.target.value as ClientDeadline['status'] })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all"
                                >
                                  <option value="In Progress">In Progress</option>
                                  <option value="Urgent">Urgent</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Delayed">Delayed</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] text-zinc-500 uppercase font-bold mb-1">Task Category</label>
                              <select
                                value={newDeadline.category}
                                onChange={(e) => setNewDeadline({ ...newDeadline, category: e.target.value as ClientDeadline['category'] })}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg p-2 text-xs text-white"
                              >
                                <option value="Design">Design Artifacts</option>
                                <option value="Ad Campaign">Ad Campaign Setup</option>
                                <option value="Strategy">Strategy Funnel</option>
                                <option value="Copywriting">Copywriting Pitch</option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Delegate Schedule</span>
                            </button>
                          </form>
                        </div>

                      </div>
                    </div>

                  </div>
                )}

                {/* --- TAB 2: STAFF DIRECTORY & ONBOARDING --- */}
                {ceoActiveTab === 'staff' && (
                  <div className="space-y-6">
                    
                    {/* Top explanation */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Staff Roster Directory</h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Role-Based Access Control configuration. Only the CEO can manage staff passwords, permissions limits, and departmental channels.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Staff database Table */}
                      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Authorized Team Roster</h3>
                        
                        {editingStaffId && (
                          <div className="bg-zinc-950 border border-emerald-900/40 p-4 rounded-xl space-y-3 text-left">
                            <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
                              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" /> Modify Account Credentials
                              </span>
                              <button
                                type="button"
                                onClick={() => setEditingStaffId(null)}
                                className="text-[9px] uppercase font-bold text-zinc-500 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[8px] uppercase tracking-wider text-zinc-500 font-mono mb-0.5">Full Name</label>
                                <input
                                  type="text"
                                  value={editingStaffName}
                                  onChange={(e) => setEditingStaffName(e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] uppercase tracking-wider text-zinc-500 font-mono mb-0.5">Username (Email)</label>
                                <input
                                  type="text"
                                  value={editingStaffEmail}
                                  onChange={(e) => setEditingStaffEmail(e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] uppercase tracking-wider text-zinc-500 font-mono mb-0.5">Login Password</label>
                                <input
                                  type="text"
                                  value={editingStaffPassword}
                                  onChange={(e) => setEditingStaffPassword(e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-emerald-400 font-mono"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  if (!editingStaffName.trim() || !editingStaffEmail.trim() || !editingStaffPassword.trim()) {
                                    showToast('Please populate all inputs.', 'warning');
                                    return;
                                  }
                                  setStaffList(prev => prev.map(s => s.id === editingStaffId ? {
                                    ...s,
                                    name: editingStaffName.trim(),
                                    email: editingStaffEmail.trim(),
                                    password: editingStaffPassword.trim()
                                  } : s));

                                  if (currentUser && currentUser.id === editingStaffId) {
                                    setCurrentUser(prev => prev ? {
                                      ...prev,
                                      name: editingStaffName.trim(),
                                      email: editingStaffEmail.trim(),
                                      password: editingStaffPassword.trim()
                                    } : null);
                                  }

                                  const updatedLogs = [
                                    { timestamp: new Date().toLocaleString(), action: `🛡️ CEO updated credentials for user ${editingStaffName}`, user: currentUser?.email || 'CEO' },
                                    ...systemSettings.vaultAuditLog
                                  ];
                                  setSystemSettings({ ...systemSettings, vaultAuditLog: updatedLogs });

                                  setEditingStaffId(null);
                                  showToast(`Credentials for ${editingStaffName} updated!`);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
                              >
                                Commit Updated Info
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                <th className="pb-3 pr-2">Employee</th>
                                <th className="pb-3 px-2">Department</th>
                                <th className="pb-3 px-2">Login Password</th>
                                <th className="pb-3 px-2">Monthly Compliance</th>
                                <th className="pb-3 text-right">Scope Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-855 text-xs text-zinc-300">
                              {staffList.map((st) => (
                                <tr key={st.id} className="hover:bg-zinc-950/40 transition-colors">
                                  <td className="py-3 pr-2 font-medium text-white flex items-center gap-3">
                                    <div className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center text-emerald-400 font-bold font-mono uppercase text-xs">
                                      {st.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="font-bold">{st.name}</p>
                                      <p className="text-[10px] text-zinc-500 font-mono leading-none">{st.email}</p>
                                    </div>
                                  </td>
                                  <td className="py-3 px-2">
                                    <span className="bg-zinc-950 border border-zinc-850 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400">
                                      {st.department}
                                    </span>
                                  </td>
                                  <td className="py-3 px-2 font-mono text-zinc-550">
                                    {st.password || '•••••'}
                                  </td>
                                  <td className="py-3 px-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-emerald-500 rounded-full"
                                          style={{ width: `${calculateMonthlyPerformance(st.id)}%` }}
                                        />
                                      </div>
                                      <span className="font-mono text-[10px] text-zinc-455 font-bold">
                                        {calculateMonthlyPerformance(st.id)}%
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => {
                                          setEditingStaffId(st.id);
                                          setEditingStaffName(st.name);
                                          setEditingStaffEmail(st.email);
                                          setEditingStaffPassword(st.password || '');
                                        }}
                                        className="p-1.5 rounded bg-zinc-950 hover:bg-emerald-950 border border-zinc-800 hover:border-emerald-800 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer text-xs"
                                        title="Modify Login Username/Password"
                                      >
                                        <Lock className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteStaff(st.id, st.name)}
                                        disabled={st.id === 'ceo-1'}
                                        className={`p-1.5 rounded bg-zinc-950 hover:bg-red-950 border border-zinc-800 hover:border-red-800 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer ${
                                          st.id === 'ceo-1' ? 'opacity-40 cursor-not-allowed' : ''
                                        }`}
                                        title="Revoke Credentials Access"
                                      >
                                        <XCircle className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right Column containing Onboarding Form and Monthly Custom Duties panel */}
                      <div className="space-y-6">
                        {/* Right: Onboarding Form (Create Staff & Password) */}
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 font-sans">
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Create Staff Profile</h3>
                            <p className="text-[11px] text-zinc-500">CEO Authority to register credentials for department heads.</p>
                          </div>

                          <form onSubmit={handleCreateStaff} className="space-y-4 pt-2">
                            <div>
                               <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">First & Last Name</label>
                               <input 
                                 type="text"
                                 placeholder="e.g. Shahar Bano"
                                 required
                                 value={newStaff.name}
                                 onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                 className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-sans"
                               />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Corporate Email Address</label>
                              <input 
                                type="email"
                                placeholder="e.g. shahar@nexform.com"
                                required
                                value={newStaff.email}
                                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Assign Core Password</label>
                              <input 
                                type="text"
                                placeholder="Type password e.g. shahar123"
                                required
                                value={newStaff.password}
                                onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Department Assignment</label>
                              <select
                                value={newStaff.department}
                                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value as StaffProfile['department'] })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
                              >
                                <option value="Instagram Graphic Design">Instagram Graphic Design (Shahar Bano)</option>
                                <option value="Facebook Graphic Design">Facebook Graphic Design (Arhum Hussain)</option>
                                <option value="LinkedIn Marketing">LinkedIn Marketing (Naila Bashar)</option>
                                <option value="Operations">Operations</option>
                                <option value="Product Design">Product Design</option>
                                <option value="Strategy">Strategy</option>
                              </select>
                            </div>

                            {/* Security checklist options */}
                            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-2">
                              <span className="block text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Default Security Clearances</span>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox"
                                  id="chk-post"
                                  checked={newStaff.canPost}
                                  onChange={(e) => setNewStaff({...newStaff, canPost: e.target.checked})}
                                  className="accent-emerald-500 w-3.5 h-3.5"
                                />
                                <label htmlFor="chk-post" className="text-[10px] text-zinc-400">Can log posts & outbound DMs</label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox"
                                  id="chk-vault"
                                  checked={newStaff.canAccessVault}
                                  onChange={(e) => setNewStaff({...newStaff, canAccessVault: e.target.checked})}
                                  className="accent-emerald-500 w-3.5 h-3.5"
                                />
                                <label htmlFor="chk-vault" className="text-[10px] text-zinc-400">Has read storage permissions</label>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <UserPlus className="w-4 h-4 text-zinc-950" />
                              <span>Save Staff Profile</span>
                            </button>
                          </form>
                        </div>

                        {/* Right: Monthly Custom Duties Control Panel */}
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Monthly duties Configurator</h3>
                            <p className="text-[11px] text-zinc-500">
                             Dynamically update customized services, timing requirements, or word counts for department heads to report on.
                            </p>
                          </div>

                          <div className="space-y-4 pt-2">
                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Select Employee Profile</label>
                              <select
                                value={selectedDutyStaffId}
                                onChange={(e) => {
                                  setSelectedDutyStaffId(e.target.value);
                                  const target = staffList.find(s => s.id === e.target.value);
                                  setDutyDescription(target?.customDutyDescription || '');
                                  setDutyTime(target?.customDutyTime || '10:00 AM');
                                }}
                                className="w-full bg-zinc-950 border border-zinc-805 rounded-xl p-3 text-xs text-white"
                              >
                                <option value="">-- Choose Employee --</option>
                                {staffList.filter(s => s.role !== 'CEO').map(s => (
                                  <option key={s.id} value={s.id}>{s.name} ({s.department})</option>
                                ))}
                              </select>
                            </div>

                            {selectedDutyStaffId && (
                              <div className="space-y-3 animate-fade-in text-left">
                                <div>
                                  <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Custom Daily Duty / Service Requirements</label>
                                  <textarea
                                    value={dutyDescription}
                                    onChange={(e) => setDutyDescription(e.target.value)}
                                    placeholder="e.g. Submit content everyday at 10:00 AM, 1500 words, plagiarism-free"
                                    className="w-full bg-zinc-950 border border-zinc-805 rounded-xl p-3 text-xs text-zinc-350 focus:outline-none focus:border-emerald-500 font-sans"
                                    rows={4}
                                  />
                                </div>

                                <div>
                                  <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">Daily Submission Target Time Constraint</label>
                                  <input
                                    type="text"
                                    value={dutyTime}
                                    onChange={(e) => setDutyTime(e.target.value)}
                                    placeholder="e.g. 10:00 AM, 11:30 AM"
                                    className="w-full bg-zinc-950 border border-zinc-805 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!selectedDutyStaffId) return;
                                    setStaffList(prev => prev.map(s => s.id === selectedDutyStaffId ? { ...s, customDutyDescription: dutyDescription, customDutyTime: dutyTime } : s));
                                    
                                    // Update currentUser dynamically if edited profile is current employee!
                                    if (currentUser && currentUser.id === selectedDutyStaffId) {
                                      setCurrentUser(prev => prev ? { ...prev, customDutyDescription: dutyDescription, customDutyTime: dutyTime } : null);
                                    }

                                    showToast(`Active monthly duty updated for ${staffList.find(s => s.id === selectedDutyStaffId)?.name}!`);
                                  }}
                                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 font-mono uppercase"
                                >
                                  <CheckSquare className="w-4 h-4 text-zinc-950" />
                                  <span>Apply Configured Duty</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* --- TAB 3: TASK WORKFLOWS & WORKLOAD ASSIGNMENT --- */}
                {ceoActiveTab === 'tasks' && (
                  <div className="space-y-6">
                    
                    {/* Workflow Explanation Banner */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                      <h2 className="text-xl font-bold text-white tracking-tight">Workflow Task Delegation Engine</h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Delegate agency briefs to specialists who are available. The system monitors the count of pending tasks to prevent load imbalances on any manager.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Staff availability workload board */}
                      <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Manager Availability Monitor</h3>
                        
                        <div className="space-y-4">
                          {staffList.filter(s => s.role === 'Staff').map((s) => {
                            const badge = getStaffWorkloadBadge(s.id);
                            return (
                              <div key={s.id} className="bg-zinc-950 p-4 border border-zinc-850 rounded-xl relative flex justify-between items-center">
                                <div className="space-y-1">
                                  <p className="font-bold text-white text-xs">{s.name}</p>
                                  <p className="text-[9px] text-zinc-500 font-mono leading-none">{s.department}</p>
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full border leading-tight ${badge.style}`}>
                                  {badge.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Workflow assignments and delegation changer */}
                      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Delegated Agency Instructions</h3>
                          
                          {/* Brief delegator card */}
                          <div className="p-1 px-2.5 bg-zinc-950 rounded border border-zinc-850 text-[10px] text-zinc-400 font-mono">
                            Logged: {delegatedTasks.length} active assignments
                          </div>
                        </div>

                        {/* List representing the active task cards */}
                        <div className="space-y-4">
                          {delegatedTasks.map((t) => {
                            const staffRef = staffList.find(s => s.id === t.assignedToId);
                            const otherStaff = staffList.filter(s => s.role === 'Staff' && s.id !== t.assignedToId);
                            return (
                              <div key={t.id} className="bg-zinc-950 p-4 border border-zinc-850 rounded-xl hover:border-zinc-700 transition-all space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-white text-xs font-bold">{t.title}</h4>
                                      <span className={`text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border leading-none ${
                                        t.status === 'Completed' 
                                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                          : 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
                                      }`}>
                                        {t.status}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400">{t.description}</p>
                                  </div>
                                  
                                  <span className={`text-[8.5px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                    t.priority === 'High' 
                                      ? 'bg-red-950 text-red-450 border-red-800' 
                                      : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                  }`}>
                                    {t.priority}
                                  </span>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2.5 border-t border-zinc-900 text-[11px] text-zinc-420">
                                  <div>
                                    <span className="text-zinc-500">Currently Deployed To:</span>{' '}
                                    <span className="font-bold text-emerald-400">{staffRef?.name || 'Unassigned'}</span>
                                  </div>

                                  {/* Quick Load reassignment tool based on core capacity */}
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-500">Balance Task Workload:</span>
                                    <select
                                      defaultValue={t.assignedToId}
                                      onChange={(e) => handleReassignTask(t.id, e.target.value)}
                                      className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-zinc-300 focus:outline-none focus:border-emerald-500 transition-all cursor-pointer font-sans"
                                    >
                                      {staffList.filter(s => s.role === 'Staff').map(s => (
                                        <option key={s.id} value={s.id} className="text-xs">
                                          Deploy to {s.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Create Task delegation form */}
                        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850/80 mt-6 space-y-4">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Delegate Brief / Workspace instruction</h4>
                          
                          <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <input 
                                  type="text"
                                  placeholder="Delegation Instruction Title"
                                  required
                                  value={newTask.title}
                                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all"
                                />
                              </div>
                              <div>
                                <textarea
                                  placeholder="Description / detailed deliverable rules..."
                                  required
                                  rows={2}
                                  value={newTask.description}
                                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-sans"
                                />
                              </div>
                            </div>

                            <div className="space-y-3 flex flex-col justify-between">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Assign Expert</label>
                                  <select
                                    value={newTask.assignedToId}
                                    onChange={(e) => setNewTask({ ...newTask, assignedToId: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                  >
                                    {staffList.filter(s => s.role === 'Staff').map(s => (
                                      <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Priority</label>
                                  <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskDelegation['priority'] })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white"
                                  >
                                    <option value="High">Emergency (High)</option>
                                    <option value="Medium">Standard (Medium)</option>
                                    <option value="Low">Low Priority</option>
                                  </select>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Deploy Assignment to queue</span>
                              </button>
                            </div>
                          </form>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* --- TAB 4: INCOMING REPORTS VAULT & ENCLOSURES --- */}
                {ceoActiveTab === 'reports' && (
                  <div className="space-y-6">
                    
                    {/* Report Vault Info bar */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                      <h2 className="text-xl font-bold tracking-tight text-white">Transmitted Records & Screenshot Vaults</h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Review uploaded evidence enclosures accompanying DM logs, daily link check compliant items, or direct letters forwarded for attention.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Direct staff request letters submitted to CEO */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Forwarded Messages & Escalations</h3>
                        
                        <div className="space-y-4">
                          {ceoReports.map((rep) => {
                            const badgeStyles = {
                              Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                              Reviewed: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
                              Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                              Declined: 'bg-zinc-950 text-zinc-500 border-zinc-850'
                            };
                            return (
                              <div key={rep.id} className="bg-zinc-950 p-4 border border-zinc-850 rounded-xl space-y-3 relative">
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <span className="text-[9px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                                      {rep.type}
                                    </span>
                                    <h4 className="font-bold text-white text-xs">{rep.subject}</h4>
                                    <p className="text-[10px] text-zinc-500 font-mono">From {rep.senderName} • Date: {rep.date}</p>
                                  </div>

                                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border leading-none font-mono ${badgeStyles[rep.status]}`}>
                                    {rep.status}
                                  </span>
                                </div>

                                <div className="text-xs text-zinc-300 p-3 bg-zinc-900/60 rounded-lg font-sans italic border border-zinc-850">
                                  "{rep.content}"
                                </div>

                                <div className="flex justify-end gap-2 text-[10px] pt-1">
                                  <button
                                    onClick={() => handleReviewReport(rep.id, 'Reviewed')}
                                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-teal-500/30 text-teal-400 cursor-pointer transition-all"
                                  >
                                    Mark Reviewed
                                  </button>
                                  <button
                                    onClick={() => handleReviewReport(rep.id, 'Approved')}
                                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 text-emerald-400 cursor-pointer transition-all"
                                  >
                                    Approve Request
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Screen proofs upload vault */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Transmitted Screenshot Enclosures</h3>
                        
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                          {getDailyTransmittedUploads().map((post) => {
                            const staffRef = staffList.find(s => s.id === post.staffId);
                            return (
                              <div key={post.id} className="bg-zinc-950 p-4 border border-zinc-850 rounded-xl space-y-3">
                                <div className="flex justify-between items-center text-[11px]">
                                  <div>
                                    <span className="font-bold text-white">{staffRef?.name || 'Founder'}</span>
                                    <span className="text-zinc-500"> published to </span>
                                    <span className="text-emerald-400 font-bold font-mono">{post.platform}</span>
                                  </div>
                                  <span className="text-zinc-500 font-mono font-bold text-[10px]">{post.date}</span>
                                </div>

                                <div className="space-y-2">
                                  {post.screenshots.map((sc, scIdx) => (
                                    <div key={scIdx} className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-850 flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-3">
                                        {sc.url ? (
                                          <img src={sc.url} alt={sc.name} className="w-14 h-10 object-cover rounded-md border border-zinc-800" referrerPolicy="no-referrer" />
                                        ) : (
                                          <div className="w-14 h-10 bg-zinc-800 border border-zinc-800 rounded-md flex items-center justify-center font-mono font-bold text-[9px] text-zinc-500 text-center leading-none uppercase">
                                            PNG Proof
                                          </div>
                                        )}
                                        <div className="text-left leading-none">
                                          <p className="text-xs text-zinc-300 font-bold truncate max-w-[130px] font-mono">{sc.name}</p>
                                          <span className="text-[9px] text-zinc-650 font-mono">{sc.size}</span>
                                        </div>
                                      </div>

                                      {/* Mock Save Word Link */}
                                      <div className="flex gap-2">
                                        <a
                                          href={`data:text/plain;charset=utf-8,${encodeURIComponent('NEXFORM VERIFICATION VAULT DUAL EXCISE REPORT\nUploaded by: ' + staffRef?.name + '\nFile Name: ' + sc.name + '\nDate Uploaded: ' + post.date)}`}
                                          download={`Nexform_Enclosure_${sc.name.replace('.png', '')}.doc`}
                                          className="px-2.5 py-1 border border-zinc-800 hover:border-sky-500/40 rounded text-sky-400 text-[10px] bg-zinc-950/80 cursor-pointer font-mono"
                                        >
                                          Save Word
                                        </a>
                                        <a
                                          href={`data:text/csv;charset=utf-8,${encodeURIComponent('Nexform File Receipt,Staff Name,Platform,Filename,Date\n' + post.id + ',' + staffRef?.name + ',' + post.platform + ',' + sc.name + ',' + post.date)}`}
                                          download={`Receipt_${sc.name.replace('.png', '')}.csv`}
                                          className="px-2.5 py-1 border border-zinc-800 hover:border-emerald-500/40 rounded text-emerald-400 text-[10px] bg-zinc-950/80 cursor-pointer font-mono"
                                        >
                                          Save Excel
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* --- TAB 5: SYSTEM CONFIG RULES --- */}
                {ceoActiveTab === 'settings' && (
                  <div className="space-y-6">
                    
                    {/* Settings explanation */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                      <h2 className="text-xl font-bold text-white tracking-tight">System Configuration Settings</h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Secure access credentials policy management, daily targets, and network logging constraints.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Configuration panel */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Edit Platform Credentials & Access Policies</h3>
                        
                        <form onSubmit={handleUpdateSettings} className="space-y-4">
                          <div>
                            <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Nexform Agency Legal Title Name</label>
                            <input 
                              type="text"
                              required
                              value={systemSettings.agencyName}
                              onChange={(e) => setSystemSettings({ ...systemSettings, agencyName: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Administrative Target (Weekly DMs)</label>
                              <input 
                                type="number"
                                required
                                value={systemSettings.weeklyDmTarget}
                                onChange={(e) => setSystemSettings({ ...systemSettings, weeklyDmTarget: Number(e.target.value) })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Core Password Strength Requirement</label>
                              <select
                                value={systemSettings.passwordPolicy}
                                onChange={(e) => setSystemSettings({ ...systemSettings, passwordPolicy: e.target.value as 'Strong' | 'Normal' })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-sans"
                              >
                                <option value="Normal">Normal Authorization (Alphabetic)</option>
                                <option value="Strong">High Entropy Verification (Capitals + Numbers)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Restricted Whitelist Network IP Ranges</label>
                            <input 
                              type="text"
                              required
                              value={systemSettings.allowedIpRanges}
                              onChange={(e) => setSystemSettings({ ...systemSettings, allowedIpRanges: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white font-mono"
                            />
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            <input 
                              type="checkbox"
                              id="sys-maint"
                              checked={systemSettings.maintenanceMode}
                              onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                              className="accent-emerald-500 w-4 h-4"
                            />
                            <label htmlFor="sys-maint" className="text-xs text-zinc-300 font-bold">
                              Activate Emergency Intranet Lockdown (Maintenance Mode)
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <ShieldAlert className="w-4 h-4" />
                            <span>Save Constraints & Re-edit Policy</span>
                          </button>
                        </form>
                      </div>

                      {/* Emergency Database Zero-Out Registry Action Card */}
                      <div className="bg-zinc-900 border border-red-955/45 p-6 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                            <ShieldAlert className="w-4.5 h-4.5 text-red-500" />
                            <span>Emergency Database Zero-Out Action Card</span>
                          </h3>
                          <p className="text-[11px] text-zinc-450">
                             DANGER ZONE: Activating this routine immediately purges all operational post records, staff attendance lists, active custom assignments, client deadlines, and orders to clean slate (0).
                          </p>
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm("⚠️ DANGER ZONE: Are you absolutely sure you want to ZERO-OUT the entire system database? This action cannot be undone and will purge all post logs, attendance time records, custom assignments, and operational files.")) {
                                setDailyPosts([]);
                                setCeoReports([]);
                                setAttendanceLogs([]);
                                setDelegatedTasks([]);
                                setClientDeadlines([]);
                                setDirectOrders([]);
                                
                                // Reset staff list monthly dynamic custom duty pointers
                                setStaffList(prev => prev.map(s => ({
                                  ...s,
                                  customDutyDescription: undefined,
                                  customDutyTime: undefined
                                })));

                                const updatedLogs = [
                                  { timestamp: new Date().toLocaleString(), action: "🛡️ Hard Zero-Out Reset Executed", user: currentUser?.email || "CEO" },
                                  ...systemSettings.vaultAuditLog
                                ];
                                setSystemSettings({ ...systemSettings, vaultAuditLog: updatedLogs });
                                showToast('All system registries and metric counters have been zeroed out successfully!', 'warning');
                              }
                            }}
                            className="bg-red-950/20 hover:bg-red-900/40 border border-red-900/50 hover:border-red-650 text-red-400 hover:text-red-300 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 font-mono uppercase"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Wipe All Records to Absolute Zero</span>
                          </button>
                        </div>
                      </div>

                      {/* Audit Log database */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white">System Access Audit logs</h3>
                          <p className="text-[11px] text-zinc-500">Security event monitoring and configuration modifications registry.</p>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-850 rounded-xl divide-y divide-zinc-850 text-[11px]">
                          {systemSettings.vaultAuditLog.map((log, idx) => (
                            <div key={idx} className="p-3 font-mono flex justify-between items-center text-zinc-400 hover:bg-zinc-900/40 transition-colors">
                              <div>
                                <p className="text-white font-semibold">{log.action}</p>
                                <p className="text-[9px] text-zinc-500">{log.user}</p>
                              </div>
                              <span className="text-[9px] text-zinc-500 text-right">{log.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* --- TAB 7: DIRECT SECURED OPERATIONAL ORDERS --- */}
                {ceoActiveTab === 'orders' && (
                  <div className="space-y-6 animate-fade-in text-left">
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                          <Send className="text-emerald-400 w-5 h-5 animate-pulse" />
                          <span>Direct Staff Directives Portal</span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Issue immediate operational orders, draft directive email correspondence, design printable PDF tasks, or dispatch team declarations to staff members.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Block: Direct Order Form */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 h-fit">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Issue Direct Staff Directive</h3>
                        <p className="text-xs text-zinc-400">Specify details below to signal operational commands. Relays instantly onto staff member workspaces.</p>
                        
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!newOrderTitle.trim() || !newOrderInstructions.trim()) {
                              showToast('Please specify a title and complete instructions.', 'warning');
                              return;
                            }
                            
                            // Auto-compute Karachi time
                            let timeRepresentation = '';
                            const now = new Date();
                            try {
                              const formatter = new Intl.DateTimeFormat('en-US', {
                                timeZone: 'Asia/Karachi',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              });
                              timeRepresentation = formatter.format(now) + ' PST';
                            } catch {
                              const utcHours = now.getUTCHours();
                              const karachiHours = (utcHours + 5) % 24;
                              const ampm = karachiHours >= 12 ? 'PM' : 'AM';
                              const displayH = karachiHours % 12 === 0 ? 12 : karachiHours % 12;
                              const displayM = now.getUTCMinutes() < 10 ? '0' + now.getUTCMinutes() : now.getUTCMinutes();
                              timeRepresentation = `${displayH}:${displayM} ${ampm} PST`;
                            }

                            const newOrder: DirectOrder = {
                              id: `ord-${Date.now()}`,
                              ceoName: 'CEO Administrator',
                              title: newOrderTitle.trim(),
                              instructions: newOrderInstructions.trim(),
                              staffIds: newOrderStaffSelector === 'all' ? ['all'] : [newOrderStaffSelector],
                              date: '2026-06-06',
                              time: timeRepresentation,
                              format: newOrderFormat,
                              status: 'Pending'
                            };

                            setDirectOrders([newOrder, ...directOrders]);
                            setNewOrderTitle('');
                            setNewOrderInstructions('');
                            showToast(`Directive successfully issued and dispatched to ${newOrderStaffSelector === 'all' ? 'all' : 'designated staff'}!`);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Assigned Recipient</label>
                            <select
                              value={newOrderStaffSelector}
                              onChange={(e) => setNewOrderStaffSelector(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-805 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-emerald-500"
                            >
                              <option value="all">Group Broadcast (All Staff Members)</option>
                              {staffList.filter(s => s.role === 'Staff').map(st => (
                                <option key={st.id} value={st.id}>{st.name} ({st.department})</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Directive Format</label>
                              <select
                                value={newOrderFormat}
                                onChange={(e) => setNewOrderFormat(e.target.value as any)}
                                className="w-full bg-zinc-950 border border-zinc-805 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-emerald-500"
                              >
                                <option value="Direct Directive">Direct Directive</option>
                                <option value="Email">Email Format Correspondence</option>
                                <option value="PDF Doc">PDF Document Outline</option>
                                <option value="Urgent Order">Urgent Commander Order</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Dispatch Date</label>
                              <input
                                type="text"
                                disabled
                                value="2026-06-06 (Today)"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-500 font-mono text-center"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Directive Subject/Title</label>
                            <input
                              type="text"
                              value={newOrderTitle}
                              onChange={(e) => setNewOrderTitle(e.target.value)}
                              placeholder="e.g. Mandatory LinkedIn Copy writing review"
                              className="w-full bg-zinc-950 border border-zinc-805 rounded-xl p-3 text-xs text-white placeholder-zinc-700 font-sans focus:outline-none focus:border-emerald-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Detailed Directives / Order Messaging</label>
                            <textarea
                              value={newOrderInstructions}
                              onChange={(e) => setNewOrderInstructions(e.target.value)}
                              placeholder="Write your direct commands, email text block, or PDF scope..."
                              className="w-full bg-zinc-950 border border-zinc-805 rounded-xl p-3 text-xs text-white placeholder-zinc-700 font-sans focus:outline-none focus:border-emerald-500"
                              rows={5}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors block text-center cursor-pointer"
                          >
                            Dispatch Commander Order
                          </button>
                        </form>
                      </div>

                      {/* Right Block: Directive Ledger */}
                      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Active Order Dispatch Database ({directOrders.length})</h3>
                            <p className="text-xs text-zinc-400">Verifies full sequence audit, response status tracking, and download templates.</p>
                          </div>
                        </div>

                        <div className="space-y-4 divide-y divide-zinc-850">
                          {directOrders.length === 0 ? (
                            <div className="text-center py-12 text-zinc-500 text-xs font-mono">No command directives logged globally. Use left form to dispatch your first order.</div>
                          ) : (
                            directOrders.map((ord) => {
                              const isAll = ord.staffIds.includes('all');
                              const recpNames = isAll 
                                ? 'Broadcast: All Active Staff' 
                                : ord.staffIds.map(stId => staffList.find(s => s.id === stId)?.name || 'Unknown Staff').join(', ');
                              
                              return (
                                <div key={ord.id} className="pt-4 first:pt-0 space-y-3">
                                  <div className="flex justify-between items-start gap-4 text-left">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                          ord.format === 'Urgent Order' 
                                            ? 'bg-red-950 text-red-400 border-red-900/40 animate-pulse' 
                                            : ord.format === 'Email' 
                                            ? 'bg-sky-950 text-sky-400 border-sky-900/40' 
                                            : ord.format === 'PDF Doc' 
                                            ? 'bg-pink-950 text-pink-400 border-pink-900/40' 
                                            : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                                        }`}>
                                          {ord.format}
                                        </span>
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                          ord.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border-emerald-900/50' : 'bg-amber-950 text-amber-400 border-amber-900/50'
                                        }`}>
                                          {ord.status}
                                        </span>
                                        <span className="text-[10px] text-zinc-500 font-mono">{ord.date} - {ord.time}</span>
                                      </div>
                                      <h4 className="text-xs font-black uppercase text-white mt-1">{ord.title}</h4>
                                      <p className="text-[11px] text-emerald-400 font-semibold font-mono">Assigned: {recpNames}</p>
                                    </div>

                                    <div className="flex gap-2">
                                      {/* Quick controls to change status */}
                                      <button
                                        onClick={() => {
                                          setDirectOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: o.status === 'Completed' ? 'Pending' : 'Completed' } : o));
                                          showToast(`Directive status toggled for '${ord.title}'`);
                                        }}
                                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                          ord.status === 'Completed' ? 'bg-zinc-950 text-zinc-500 hover:text-white border border-zinc-850' : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-900/40'
                                        }`}
                                      >
                                        Toggle Status
                                      </button>
                                      <button
                                        onClick={() => {
                                          setDirectOrders(prev => prev.filter(o => o.id !== ord.id));
                                          showToast('Commander order deleted and revoked from staff view.', 'warning');
                                        }}
                                        className="px-2 py-1 bg-red-950 text-red-400 rounded text-[10px] border border-red-900/40 hover:bg-red-900 cursor-pointer"
                                      >
                                        Revoke
                                      </button>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-zinc-950 border border-zinc-855 rounded-xl space-y-2">
                                    <p className="text-xs text-zinc-300 italic whitespace-pre-wrap">{ord.instructions}</p>
                                    
                                    {/* Exporters according to CEO request "in the format of email it or PDF, Order Anything" */}
                                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
                                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider font-bold mr-1">Compile File Out:</span>
                                      
                                      <a
                                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                                          `=========================================\nNEXFORM EXECUTIVE ORDER: ${ord.format.toUpperCase()}\n=========================================\n\nSubject: ${ord.title}\nAssigned Recipients: ${recpNames}\nDispatched On: ${ord.date} - ${ord.time}\nIssued By: ${ord.ceoName}\nStatus: ${ord.status}\n\nDIRECTIVE DETAIL:\n-----------------\n${ord.instructions}\n\n=========================================\nNexform Corporate Intranet System (Corporate Compliance)`
                                        )}`}
                                        download={`Nexform_Directive_PDF_${ord.id}.txt`}
                                        className="px-2.5 py-1.5 border border-zinc-850 rounded text-pink-400 text-[10px] bg-zinc-950 hover:bg-pink-950/20 hover:border-pink-900/60 transition-all font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      >
                                        <FileText className="w-3 h-3 text-pink-400" />
                                        <span>Download PDF Doc (Txt Outline)</span>
                                      </a>

                                      <a
                                        href={`mailto:staff@nexform.com?subject=${encodeURIComponent('[Nexform Directive] ' + ord.title)}&body=${encodeURIComponent(
                                          `Hi Team,\n\nThe CEO has issued a Direct Directive on the Nexform Intranet Hub.\n\nType: ${ord.format}\nSubject: ${ord.title}\nInstructions:\n${ord.instructions}\n\nPlease check-in on your dashboard immediately and compile completion status.\n\nRegards,\nNexform Corporate Intranet Portal`
                                        )}`}
                                        className="px-2.5 py-1.5 border border-zinc-850 rounded text-sky-400 text-[10px] bg-zinc-950 hover:bg-sky-950/20 hover:border-sky-900/60 transition-all font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      >
                                        <Mail className="w-3 h-3 text-sky-400" />
                                        <span>Email This Form</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB 6: DAILY ATTENDANCE EMPLOYEES --- */}
                {ceoActiveTab === 'attendance' && (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Welcome banner */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                          <Clock className="text-emerald-400 w-5 h-5 animate-pulse" />
                          <span>Daily Attendance Employees Hub</span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Audits live check-in timestamps, manages daily staff rosters, and tracks punctuality metrics for compliance.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-zinc-400">Roster Date:</label>
                        <select
                          value={selectedAttendanceDate}
                          onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                          className="bg-zinc-950 border border-zinc-805 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        >
                          <option value="2026-06-06">2026-06-06 (Today)</option>
                          <option value="2026-06-05">2026-06-05 (Yesterday)</option>
                          <option value="1026-06-04">2026-06-04</option>
                        </select>
                      </div>
                    </div>

                    {/* Roster Statistics cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider font-mono">Present On Time</p>
                          <h4 className="text-2xl font-bold text-emerald-400 mt-1">
                            {attendanceLogs.filter(log => log.date === selectedAttendanceDate && log.status === 'Present').length} Employees
                          </h4>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-emerald-500/20" />
                      </div>

                      <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider font-mono">Late Arrivals</p>
                          <h4 className="text-2xl font-bold text-amber-400 mt-1">
                            {attendanceLogs.filter(log => log.date === selectedAttendanceDate && log.status === 'Late').length} Employees
                          </h4>
                        </div>
                        <Clock className="w-8 h-8 text-amber-500/20" />
                      </div>

                      <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider font-mono">Absent / Unmarked</p>
                          <h4 className="text-2xl font-bold text-red-400 mt-1">
                            {staffList.filter(s => s.role === 'Staff' && !attendanceLogs.some(log => log.staffId === s.id && log.date === selectedAttendanceDate)).length} Employees
                          </h4>
                        </div>
                        <XCircle className="w-8 h-8 text-red-500/20" />
                      </div>

                      <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider font-mono">Roster Completion</p>
                          <h4 className="text-2xl font-bold text-white mt-1">
                            {Math.round(
                              (attendanceLogs.filter(log => log.date === selectedAttendanceDate).length / 
                              Math.max(1, staffList.filter(s => s.role === 'Staff').length)) * 100
                            )}%
                          </h4>
                        </div>
                        <CheckSquare className="w-8 h-8 text-emerald-500/20" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left and Middle columns: Attendance Roster list */}
                      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Attendance Register Entries</h3>
                            <p className="text-[11px] text-zinc-500">Live check-in events recorded for {selectedAttendanceDate}.</p>
                          </div>
                          
                          <div className="relative w-full sm:w-60">
                            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                              type="text"
                              placeholder="Search employee attendance..."
                              value={attendanceSearchQuery}
                              onChange={(e) => setAttendanceSearchQuery(e.target.value)}
                              className="bg-zinc-950 border border-zinc-805 text-xs text-white rounded-xl pl-9 pr-4 py-2 w-full focus:outline-none focus:border-emerald-500 font-sans"
                            />
                          </div>
                        </div>

                        {/* List items */}
                        <div className="space-y-3">
                          {/* Checked-In Employees first */}
                          {(() => {
                            const activeLogs = attendanceLogs.filter(
                              log => log.date === selectedAttendanceDate &&
                              log.staffName.toLowerCase().includes(attendanceSearchQuery.toLowerCase())
                            );

                            const uncheckedStaff = staffList.filter(
                              s => s.role === 'Staff' &&
                              s.name.toLowerCase().includes(attendanceSearchQuery.toLowerCase()) &&
                              !attendanceLogs.some(log => log.staffId === s.id && log.date === selectedAttendanceDate)
                            );

                            if (activeLogs.length === 0 && uncheckedStaff.length === 0) {
                              return (
                                <div className="text-center py-12 text-zinc-500 text-xs">
                                  No employees matching criteria.
                                </div>
                              );
                            }

                            return (
                              <div className="divide-y divide-zinc-850 border border-zinc-850 rounded-xl bg-zinc-950 overflow-hidden text-left">
                                {activeLogs.map((log) => {
                                  const staffRef = staffList.find(s => s.id === log.staffId);
                                  return (
                                    <div key={log.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={staffRef?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
                                          alt={log.staffName}
                                          className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-800"
                                        />
                                        <div>
                                          <h4 className="text-xs font-bold text-white">{log.staffName}</h4>
                                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5">
                                            {log.department}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-4 text-xs">
                                        <div className="text-right">
                                          <span className="text-zinc-400 font-mono flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                            {log.time}
                                          </span>
                                          <span className="text-[8.5px] text-zinc-500 block">Checked In</span>
                                        </div>

                                        <span className={`px-2 py-1 rounded text-[9.5px] leading-none uppercase font-mono font-bold border ${
                                          log.status === 'Present' 
                                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40' 
                                            : 'bg-amber-950/40 text-amber-400 border-amber-900/40'
                                        }`}>
                                          {log.status}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}

                                {uncheckedStaff.map((staff) => (
                                  <div key={staff.id} className="p-4 flex items-center justify-between bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors opacity-75">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={staff.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
                                        alt={staff.name}
                                        className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-800 grayscale"
                                      />
                                      <div>
                                        <h4 className="text-xs font-bold text-zinc-400">{staff.name}</h4>
                                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mt-0.5">
                                          {staff.department}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs">
                                      <span className="text-[10px] text-zinc-500 italic block">
                                        Not Checked In
                                      </span>

                                      <span className="px-2 py-1 rounded text-[9.5px] leading-none uppercase font-mono font-bold border bg-red-950/30 text-red-400 border-red-900/30">
                                        Absent
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Right column: Form to register client check-in manually */}
                      <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl space-y-4 h-fit">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Manual Attendance</h3>
                          <p className="text-[11px] text-zinc-500">Record check-in on behalf of an employee who missed standard registration.</p>
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const targetStaffId = manualStaffId || staffList.filter(s => s.role === 'Staff')[0]?.id;
                            if (!targetStaffId) {
                              showToast('Please select a valid staff member.', 'warning');
                              return;
                            }
                            const targetStaff = staffList.find(s => s.id === targetStaffId);
                            if (!targetStaff) {
                              showToast('Please select a valid staff member.', 'warning');
                              return;
                            }
                            
                            const exists = attendanceLogs.some(log => log.staffId === targetStaff.id && log.date === selectedAttendanceDate);
                            if (exists) {
                              showToast(`${targetStaff.name} is already checked in for ${selectedAttendanceDate}!`, 'warning');
                              return;
                            }

                            let displayTime = manualCheckInTime;
                            let status: 'Present' | 'Late' = 'Present';
                            try {
                              const [h, m] = manualCheckInTime.split(':').map(Number);
                              if (h > 9 || (h === 9 && m > 0)) {
                                status = 'Late';
                              }
                              const ampm = h >= 12 ? 'PM' : 'AM';
                              const displayH = h % 12 === 0 ? 12 : h % 12;
                              const displayM = m < 10 ? '0' + m : m;
                              displayTime = `${displayH}:${displayM} ${ampm}`;
                            } catch {}

                            const manualLog: AttendanceLog = {
                              id: `att-${Date.now()}`,
                              staffId: targetStaff.id,
                              staffName: targetStaff.name,
                              date: selectedAttendanceDate,
                              time: displayTime,
                              status,
                              department: targetStaff.department
                            };

                            setAttendanceLogs([manualLog, ...attendanceLogs]);
                            showToast(`Recorded manual check-in for ${targetStaff.name} on ${selectedAttendanceDate} at ${displayTime}!`);
                          }}
                          className="space-y-4 pt-1"
                        >
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Select Employee</label>
                            <select
                              value={manualStaffId}
                              onChange={(e) => setManualStaffId(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2.5 rounded-xl focus:outline-none"
                            >
                              <option value="">-- Choose Staff --</option>
                              {staffList.filter(s => s.role === 'Staff').map((st) => (
                                <option key={st.id} value={st.id}>{st.name} ({st.department})</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-zinc-550 mb-1 font-mono">Arrival Time</label>
                              <input
                                type="time"
                                value={manualCheckInTime}
                                onChange={(e) => setManualCheckInTime(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white text-center font-mono focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase font-bold text-zinc-550 mb-1 font-mono">Roster Date</label>
                              <input
                                type="text"
                                disabled
                                value={selectedAttendanceDate}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-500 text-center font-mono"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-md transition-all uppercase block text-center"
                          >
                            Add Check-In Entry
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}


            {/* ========================================= */}
            {/* FOUNDERS & STAFF PANEL VIEWPORT (Staff roles) */}
            {/* ========================================= */}
            {currentUser.role === 'Staff' && (
              <div className="space-y-6">
                
                {/* Visual Tab Selection for Staff */}
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 overflow-x-auto">
                  <button
                    onClick={() => setStaffActiveTab('report')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'report' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Report Daily Log</span>
                  </button>

                  <button
                    onClick={() => setStaffActiveTab('tasks')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'tasks' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Instructions & Tasks</span>
                    {delegatedTasks.filter(t => t.assignedToId === currentUser.id && t.status === 'Pending').length > 0 && (
                      <span className="bg-amber-500 text-zinc-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none font-mono">
                        {delegatedTasks.filter(t => t.assignedToId === currentUser.id && t.status === 'Pending').length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setStaffActiveTab('orders')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'orders' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Direct Orders</span>
                    {directOrders.filter(o => o.status === 'Pending' && (o.staffIds.includes('all') || o.staffIds.includes(currentUser.id))).length > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none animate-pulse font-mono">
                        {directOrders.filter(o => o.status === 'Pending' && (o.staffIds.includes('all') || o.staffIds.includes(currentUser.id))).length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setStaffActiveTab('reports')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'reports' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Forward Request</span>
                  </button>

                  <button
                    onClick={() => setStaffActiveTab('pdf')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'pdf' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>PDF generator</span>
                  </button>

                  <button
                    onClick={() => setStaffActiveTab('profile')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      staffActiveTab === 'profile' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold' 
                        : 'bg-zinc-900 hover:bg-zinc-800/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Profile & Monthly Record</span>
                  </button>
                </div>

                {/* --- STAFF TAB 1: DAILY REPORTING WORKSPACE --- */}
                {staffActiveTab === 'report' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                    
                    {/* Left: Input Form details */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6 relative">
                      
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
                          Nexform Compliance Form
                        </span>
                        <h2 className="text-xl font-bold tracking-tight text-white">Daily Social Posting & Outreach Log</h2>
                        <p className="text-xs text-zinc-400">
                          Submit your client deliverables updates, outbound social DMs count on local vs international partners, and screenshots to the CEO.
                        </p>
                      </div>

                      {/* Check-In Attendance Widget */}
                      {(() => {
                        const todayDate = '2026-06-06';
                        const checkedInLog = attendanceLogs.find(log => log.staffId === currentUser.id && log.date === todayDate);
                        if (checkedInLog) {
                          return (
                            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-left">
                              <div className="space-y-0.5">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">Arrival Timestamp Active</span>
                                <h4 className="text-xs font-bold text-white">Attendance Verified: Present</h4>
                                <p className="text-[10px] text-zinc-400">Checked-in at {checkedInLog.time} today on June 6, 2026.</p>
                              </div>
                              <span className="bg-emerald-500 text-zinc-950 font-bold text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-xl flex items-center gap-1 font-mono">
                                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950" /> Checked In
                              </span>
                            </div>
                          );
                        } else {
                          return (
                            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                              <div className="space-y-0.5">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-[#10b981] font-bold block font-mono">One-Click Attendance</span>
                                <h4 className="text-xs font-bold text-white">Share Live Check-In with CEO</h4>
                                <p className="text-[10.5px] text-zinc-400">Registers and relays your exact check-in time (Pakistan Karachi timezone) directly onto the CEO console.</p>
                              </div>
                              <div className="w-full md:w-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleRecordAttendance();
                                  }}
                                  className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-[11px] px-4.5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-mono uppercase cursor-pointer"
                                >
                                  <Clock className="w-4 h-4 text-zinc-950" />
                                  <span>Check-In Now</span>
                                </button>
                              </div>
                            </div>
                          );
                        }
                      })()}

                      <form onSubmit={handleSubmitPostLog} className="space-y-5 pt-3">
                        
                        {/* Checkbox: Did you publish today? */}
                        <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-xs font-bold text-white block">Did you post today on brand channel?</label>
                            <span className="text-[10px] text-zinc-500 font-medium">Verify posting or check to state justification reason instead.</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => { setPPostedToday(true); }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold select-none cursor-pointer transition-all ${
                                pPostedToday 
                                  ? 'bg-emerald-500 text-zinc-950' 
                                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                              }`}
                            >
                              Yes, I Posted
                            </button>
                            <button
                              type="button"
                              onClick={() => { setPPostedToday(false); }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold select-none cursor-pointer transition-all ${
                                !pPostedToday 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                              }`}
                            >
                              No Post Filed
                            </button>
                          </div>
                        </div>

                        {/* Condition A: Yes, Posted details */}
                        {pPostedToday ? (
                          <div className="space-y-4 animate-fade-in box">
                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">
                                Content Assets Staged & Posted Today
                              </label>
                              <textarea
                                required
                                value={pPostDetails}
                                onChange={(e) => setPPostDetails(e.target.value)}
                                placeholder="Describe the graphic design color schemas, templates or reels visual layouts posted today..."
                                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 font-sans"
                                rows={2.5}
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1.5">
                                Public Shared Channel URL (Instagram/Linkedin/FB link)
                              </label>
                              <input
                                type="url"
                                required
                                value={pPostLink}
                                onChange={(e) => setPPostLink(e.target.value)}
                                placeholder="https://instagram.com/p/..."
                                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-sky-500 font-mono"
                              />
                            </div>

                            {/* 2 Hour Compliance validation UI stopwatch */}
                            <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
                              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-zinc-500">
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2-Hour Limit Check</span>
                                <span className="text-zinc-400 font-mono">Standard Operating Rules</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[9px] text-zinc-500 font-bold mb-1">Time Published today</label>
                                  <input 
                                    type="time" 
                                    value={postedTime} 
                                    onChange={(e) => setPostedTime(e.target.value)}
                                    className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-350 w-full text-center font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] text-zinc-500 font-bold mb-1">Time Shared inside channel</label>
                                  <input 
                                    type="time" 
                                    value={sharedTime} 
                                    onChange={(e) => setSharedTime(e.target.value)}
                                    className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-350 w-full text-center font-mono"
                                  />
                                </div>
                              </div>
                              <p className="text-[10px] text-zinc-500 italic">
                                * Policy Requirement: Shared link must be uploaded within 2 hours of post publish time. Current values represent conformant on-schedule audit state.
                              </p>
                            </div>

                          </div>
                        ) : (
                          /* Condition B: No, reason input box directly forwarded to CEO */
                          <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2 animate-pulse">
                            <label className="block text-xs font-bold text-red-400">
                              CEO Escalation Note: Non-Posting Statement
                            </label>
                            <span className="block text-[10px] text-zinc-500 mb-1 leading-normal">
                              Provide a solid administrative justification explanatory letter. This justification will be auto-transmitted to the CEO's priority review feed.
                            </span>
                            <textarea
                              required
                              value={pNoPostReason}
                              onChange={(e) => setPNoPostReason(e.target.value)}
                              placeholder="Detail precise client approvals bottleneck or design constraints that prevented social uploads today..."
                              className="w-full bg-zinc-950 border border-red-900/40 text-xs text-white rounded-lg p-3 focus:outline-none focus:border-red-500 font-sans"
                              rows={3}
                            />
                          </div>
                        )}

                        {/* Outgoing Client Lead Aquistion Segment (DMs) */}
                        <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-4">
                          <div className="flex justify-between items-center flex-wrap">
                            <label className="text-xs font-bold text-white block">Outbound DMs Client Acquisition Metrics</label>
                            <span className="text-[9px] font-mono bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800 text-zinc-400 font-bold">
                              Policy Limit: Max 30 Outbound Leads
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-[11px] mb-1 font-mono">
                                <span className="text-zinc-400">Outbound Messages logged today:</span>
                                <span className="font-bold text-emerald-400">{pDmCount} / 30 DMs</span>
                              </div>
                              <input 
                                type="range"
                                min={0}
                                max={30}
                                value={pDmCount}
                                onChange={(e) => {
                                  const total = Number(e.target.value);
                                  setPDmCount(total);
                                  // Auto balance local vs intl counts
                                  const leftOver = Math.floor(total / 2);
                                  setPDmLocal(leftOver);
                                  setPDmInternational(total - leftOver);
                                }}
                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <label className="block text-[10px] text-zinc-550 uppercase font-mono tracking-wider mb-1">Local Clients</label>
                                <input 
                                  type="number"
                                  min={0}
                                  max={30}
                                  value={pDmLocal}
                                  onChange={(e) => {
                                    const loc = Math.min(Number(e.target.value), pDmCount);
                                    setPDmLocal(loc);
                                    setPDmInternational(pDmCount - loc);
                                  }}
                                  className="w-full bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-zinc-550 uppercase font-mono tracking-wider mb-1">International Clients</label>
                                <input 
                                  type="number"
                                  min={0}
                                  max={30}
                                  value={pDmInternational}
                                  onChange={(e) => {
                                    const intl = Math.min(Number(e.target.value), pDmCount);
                                    setPDmInternational(intl);
                                    setPDmLocal(pDmCount - intl);
                                  }}
                                  className="w-full bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center text-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Extra Segment: Shahar / Arhum / Naila role-specific logs */}
                          {currentUser.department.includes('LinkedIn') && (
                            <div className="pt-3 border-t border-zinc-900 grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[9.5px] text-zinc-450 uppercase mb-1">Follow Ups</label>
                                <input 
                                  type="number"
                                  value={pLiFollowUp}
                                  onChange={(e) => setPLiFollowUp(Number(e.target.value))}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1.5 text-center text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9.5px] text-red-400 uppercase mb-1">Refused</label>
                                <input 
                                  type="number"
                                  value={pLiRefused}
                                  onChange={(e) => setPLiRefused(Number(e.target.value))}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1.5 text-center text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9.5px] text-emerald-450 uppercase mb-1">Landed Call</label>
                                <input 
                                  type="number"
                                  value={pLiLanded}
                                  onChange={(e) => setPLiLanded(Number(e.target.value))}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1.5 text-center text-xs text-white"
                                />
                              </div>
                            </div>
                          )}

                          {currentUser.department.includes('Facebook') && (
                            <div className="pt-3 border-t border-zinc-900 space-y-2">
                              <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Facebook Group outreach logging</span>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-[9.5px] text-zinc-500 uppercase mb-1">Joined Groups</label>
                                  <input 
                                    type="number"
                                    value={pFbGroups}
                                    onChange={(e) => setPFbGroups(Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1 text-center text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9.5px] text-zinc-500 uppercase mb-1">Local Groups</label>
                                  <input 
                                    type="number"
                                    value={pFbGroupsLocal}
                                    onChange={(e) => setPFbGroupsLocal(Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1 text-center text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9.5px] text-zinc-500 uppercase mb-1">Intl Groups</label>
                                  <input 
                                    type="number"
                                    value={pFbGroupsIntl}
                                    onChange={(e) => setPFbGroupsIntl(Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-1 py-1 text-center text-xs"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* File Upload Evidence screenshot */}
                        <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
                          <label className="text-xs font-bold text-white block">Attachments Screenshot Evidence (Optional)</label>
                          <div className="flex items-center gap-3">
                            <label className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 p-3 rounded-xl cursor-pointer text-xs font-semibold uppercase flex items-center gap-2 transition-all">
                              <Upload className="w-4 h-4 text-emerald-400" />
                              <span>Select Screenshot</span>
                              <input 
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                                className="hidden"
                              />
                            </label>

                            {pScreenshotFile && (
                              <div className="text-left text-[11px] leading-tight">
                                <p className="font-mono text-zinc-350 font-bold truncate max-w-[150px]">{pScreenshotFile.name}</p>
                                <span className="text-zinc-500 text-[10px] font-mono">{pScreenshotFile.size}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* CEO Assigned Duty Submission Module */}
                        {(() => {
                          const profileInList = staffList.find(s => s.id === currentUser.id);
                          const activeDuty = profileInList?.customDutyDescription;
                          const activeDutyTime = profileInList?.customDutyTime;
                          
                          if (!activeDuty) return null;
                          
                          return (
                            <div className="p-4 bg-zinc-950 border border-emerald-900/30 rounded-xl space-y-4 animate-fade-in text-left">
                              <div className="space-y-1">
                                <label className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                                  <ClipboardList className="w-4 h-4 animate-pulse text-emerald-400" />
                                  <span>CEO Monthly Assignment Checklist</span>
                                </label>
                                <div className="p-3 bg-zinc-900 rounded-lg text-xs text-zinc-300 italic border border-zinc-850 mt-1 font-sans">
                                  "{activeDuty}"
                                </div>
                                {activeDutyTime && (
                                  <div className="text-[10px] text-zinc-500 font-mono mt-1.5 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                    <span>Daily target timeline: </span>
                                    <span className="text-red-400 font-bold">{activeDutyTime}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col gap-3 pt-3 border-t border-zinc-900">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-white">Have you satisfied this monthly duty today?</span>
                                  <button
                                    type="button"
                                    onClick={() => setPCustomDutySubmitted(prev => !prev)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all uppercase flex items-center gap-1.5 font-mono ${
                                      pCustomDutySubmitted 
                                        ? 'bg-emerald-500 text-zinc-950 font-bold' 
                                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                                    }`}
                                  >
                                    {pCustomDutySubmitted ? (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Duty Done</span>
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Incomplete</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                <div>
                                  <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">
                                    Service Submission Logs / Word count / Verification URLs
                                  </label>
                                  <textarea
                                    required={pCustomDutySubmitted}
                                    value={pCustomDutyText}
                                    onChange={(e) => setPCustomDutyText(e.target.value)}
                                    placeholder="Type deliverables details here, e.g. Submitted article to Naila, 1600 words, no plagiarism..."
                                    className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 font-mono"
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        <button
                          type="submit"
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Transmit Daily Log Files</span>
                        </button>

                      </form>
                    </div>

                    {/* Right Pane: Social compliance metrics, stats guidelines */}
                    <div className="space-y-6">
                      
                      {/* Current stats of the logged of employee */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-5">
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-[#39b54a]">
                          Monthly Compliance Rate
                        </span>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-4xl font-extrabold text-white font-mono leading-none">
                              {calculateMonthlyPerformance(currentUser.id)}%
                            </span>
                            <span className="block text-xs text-zinc-500 pt-1 font-sans">Active social publication rate</span>
                          </div>

                          <div className="w-14 h-14 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                          </div>
                        </div>

                        <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-850">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${calculateMonthlyPerformance(currentUser.id)}%` }}
                          />
                        </div>

                        <div className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-zinc-850">
                          <p className="flex justify-between font-mono">
                            <span>Sended DMs Log Tracker:</span>
                            <span className="font-bold text-white">Daily Target Max 30 / day</span>
                          </p>
                          <p className="flex justify-between font-mono">
                            <span>Upload screenshots queue:</span>
                            <span className="font-bold text-emerald-450">Active Vault Persistence</span>
                          </p>
                        </div>
                      </div>

                      {/* Display today's entered social report summary if present */}
                      {getCurrentUserPostLogToday() ? (
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Recorded Check-in details for today</span>
                          </h3>
                          
                          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2 text-xs">
                            <p className="flex justify-between text-zinc-400 font-mono">
                              <span>Report Time:</span>
                              <span className="text-white font-semibold">{getCurrentUserPostLogToday()?.submittedAt}</span>
                            </p>
                            <p className="flex justify-between text-zinc-400 font-mono">
                              <span>Posted status today:</span>
                              <span className={getCurrentUserPostLogToday()?.postedToday ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                                {getCurrentUserPostLogToday()?.postedToday ? 'YES' : 'NO'}
                              </span>
                            </p>
                            
                            {getCurrentUserPostLogToday()?.postedToday && (
                              <p className="text-zinc-500">
                                Link Shared:{' '}
                                <a 
                                  href={getCurrentUserPostLogToday()?.postLink || '#'} 
                                  target="_blank" 
                                  className="text-emerald-400 font-mono underline truncate inline-block max-w-[200px]"
                                  referrerPolicy="no-referrer"
                                >
                                  {getCurrentUserPostLogToday()?.postLink}
                                </a>
                              </p>
                            )}

                            <p className="flex justify-between text-zinc-400 font-mono pt-1.5 border-t border-zinc-900">
                              <span>Total Outbound Leads Logged:</span>
                              <span className="text-white font-bold">{getCurrentUserPostLogToday()?.dmCount} DMs</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-zinc-900/50 border border-zinc-850 p-6 rounded-2xl flex flex-col items-center justify-center text-center py-10 space-y-2 text-zinc-500">
                          <AlertTriangle className="w-8 h-8 text-amber-500/30 animate-pulse" />
                          <p className="text-xs">No checklist social post logged today for your account.</p>
                          <span className="text-[10px] text-zinc-600">Please complete the daily compliance form to generate the daily task PDF.</span>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* --- STAFF TAB 2: TASK WORKFLOW ACTIONS --- */}
                {staffActiveTab === 'tasks' && (
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                        <ClipboardList className="w-5 h-5 text-emerald-400" />
                        <span>Daily Workspace Assignments</span>
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Task list instructions delegated specifically to you by the CEO. Toggle tasks to Complete once completed to compile a perfect daily report PDF.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {delegatedTasks.filter(t => t.assignedToId === currentUser.id).length === 0 ? (
                        <div className="text-center py-12 bg-zinc-950 rounded-xl text-zinc-500 text-xs">
                          There are no instructions or tasks currently assigned to you today. Enjoy is clean deck!
                        </div>
                      ) : (
                        delegatedTasks.filter(t => t.assignedToId === currentUser.id).map((tsk) => (
                          <div 
                            key={tsk.id} 
                            className={`p-4 border rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                              tsk.status === 'Completed' 
                                ? 'bg-zinc-950/60 border-zinc-900 text-zinc-500 opacity-70' 
                                : 'bg-zinc-950 border-zinc-850 text-white hover:border-zinc-700'
                            }`}
                          >
                            <div className="space-y-1 text-left">
                              <div className="flex items-center gap-2">
                                <h4 className={`text-xs font-bold uppercase ${tsk.status === 'Completed' ? 'line-through' : 'text-white'}`}>
                                  {tsk.title}
                                </h4>
                                <span className={`text-[8.5px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                  tsk.priority === 'High' ? 'bg-red-950 text-red-400 border-red-900/50' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                }`}>
                                  {tsk.priority} Priority
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400">{tsk.description}</p>
                              <span className="block text-[9.5px] text-zinc-500 font-mono">Date Assigned: {tsk.date}</span>
                            </div>

                            <button
                              onClick={() => handleMarkTaskStatus(tsk.id, tsk.status === 'Completed' ? 'Pending' : 'Completed')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                                tsk.status === 'Completed'
                                  ? 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                                  : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                              }`}
                            >
                              <CheckSquare className="w-4 h-4" />
                              <span>{tsk.status === 'Completed' ? 'Mark Incomplete' : 'Complete Task'}</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* --- STAFF TAB 3: FORWARD LETTER TO CEO --- */}
                {staffActiveTab === 'reports' && (
                  <div className="bg-zinc-900 border border-[#27272a] p-6 rounded-2xl max-w-xl mx-auto space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-white">Direct Communication to CEO</h2>
                      <p className="text-xs text-zinc-400">
                        Need resources? Got target blockages? Create official requests which bypass intermediate protocols and post straight to the CEO's administrative control.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitRequestToCEO} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Message Type</label>
                          <select
                            value={repType}
                            onChange={(e) => setRepType(e.target.value as any)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
                          >
                            <option value="Request">Budget Request</option>
                            <option value="Urgent Report">Urgent Milestone Blocking Report</option>
                            <option value="Complaint">Workflow/Resource Complaint</option>
                            <option value="Feedback">Feedback suggestion</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Send Date</label>
                          <input 
                            type="text" 
                            disabled 
                            value={new Date().toLocaleDateString()}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-500 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Subject Topic Headline</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Photoshop / Adobe vector account access keys"
                          value={repSubject}
                          onChange={(e) => setRepSubject(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-450 uppercase font-bold mb-1">Explanatory Message Letter Body</label>
                        <textarea
                          required
                          value={repContent}
                          onChange={(e) => setRepContent(e.target.value)}
                          placeholder="Write clean professional instructions detailing exactly the resources or permissions required..."
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white font-sans"
                          rows={4}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl shadow-lg cursor-pointer transition-colors flex items-center justify-center gap-1 text-xs uppercase"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Message Instantly</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* --- STAFF TAB 4: COMPLIANCE PDF EXPORT GENERATOR --- */}
                {staffActiveTab === 'pdf' && (
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-2xl mx-auto space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <span>Daily Compliance Report PDF Generator</span>
                      </h2>
                      <p className="text-xs text-[#a1a1aa]">
                        Verify today's completed and outstanding tasks, track link share timings compliance, and automatically download a beautiful, formatted PDF report suitable for print and compliance archiving.
                      </p>
                    </div>

                    {/* Pre-export report validation indicator info box */}
                    <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-4">
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Report Preview Outline</span>
                      
                      <div className="space-y-2 text-xs text-zinc-300">
                        <div className="flex justify-between font-mono">
                          <span>Staff Member:</span>
                          <span className="font-bold text-white">{currentUser.name}</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Department Channel:</span>
                          <span className="font-bold text-emerald-400">{currentUser.department}</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Completed Tasks Today:</span>
                          <span className="font-bold text-teal-400">
                            {delegatedTasks.filter(t => t.assignedToId === currentUser.id && t.status === 'Completed').length} Completed
                          </span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Pending / Incomplete Tasks:</span>
                          <span className="font-bold text-red-400">
                            {delegatedTasks.filter(t => t.assignedToId === currentUser.id && t.status === 'Pending').length} Pending
                          </span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Outbound Leads logged:</span>
                          <span className="font-bold text-white">
                            {getCurrentUserPostLogToday() ? `${getCurrentUserPostLogToday()?.dmCount} DMs` : 'None logged today'}
                          </span>
                        </div>
                      </div>

                      {/* PDF Action generation button */}
                      <button
                        onClick={() => {
                          const userTasks = delegatedTasks.filter(t => t.assignedToId === currentUser.id);
                          const userPost = getCurrentUserPostLogToday();
                          const todayStr = new Date().toLocaleDateString();
                          generateDailyTaskPDF(currentUser, userTasks, userPost, todayStr);
                          showToast('Your daily performance PDF report has been generated and downloaded!');
                        }}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase"
                      >
                        <Download className="w-4 h-4 text-zinc-950" />
                        <span>Build and Download PDF Report</span>
                      </button>
                    </div>

                    <div className="text-center text-[10px] text-zinc-650 italic">
                      * Ensures complete transparency which helps maintain the professional environment expected by CEO at Nexform.
                    </div>
                  </div>
                )}

                {/* --- STAFF TAB 5: PERSONAL PROFILE & MONTHLY PERFORMANCE RECORD --- */}
                {staffActiveTab === 'profile' && (() => {
                  const postsCount = dailyPosts.filter(p => p.staffId === currentUser.id && p.postedToday).length;
                  const totalPosts = postsCount; // Base offset set to 0 as requested to make all things start at zero
                  
                  const totalDMs = dailyPosts.filter(p => p.staffId === currentUser.id).reduce((sum, p) => sum + (p.dmCount || 0), 0); // Base offset set to 0
                  
                  const responsesCount = dailyPosts.filter(p => p.staffId === currentUser.id).reduce((sum, p) => {
                    let resp = 0;
                     if (p.platform === 'LinkedIn') resp += (p.linkedInFollowUps || 0) + (p.linkedInLandedToCall || 0);
                     else if (p.platform === 'Facebook') resp += (p.fbGroupsJoinedToday || 0) + Math.floor(p.dmCount * 0.15);
                     else resp += Math.floor(p.dmCount * 0.25);
                     return sum + resp;
                  }, 0);
                  const totalResponses = responsesCount; // Base offset set to 0
                  
                  const rejectsCount = dailyPosts.filter(p => p.staffId === currentUser.id).reduce((sum, p) => {
                    let rej = 0;
                    if (p.platform === 'LinkedIn') rej += (p.linkedInRefused || 0);
                    else rej += Math.floor(p.dmCount * 0.4);
                    return sum + rej;
                  }, 0);
                  const totalRejects = rejectsCount; // Base offset set to 0
 
                  const totalEngagement = Math.round(totalDMs * 3.8 + totalPosts * 185 + totalResponses * 12.5);

                  const avatarOptionsPreset = [
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
                    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
                  ];

                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-left">
                      {/* Left: Monthly Performance Record */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl relative">
                          <div className="space-y-1 mb-6">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#10b981] font-bold">
                              Performance Core Dashboard
                            </span>
                            <h2 className="text-xl font-bold tracking-tight text-white">Monthly Analytics Record</h2>
                            <p className="text-xs text-zinc-400">
                              Your comprehensive monthly milestones, outreach results, and digital content footprint.
                            </p>
                          </div>

                          {/* Visual Banner of CEO Custom Duty if assigned */}
                          {(() => {
                            const profileInList = staffList.find(s => s.id === currentUser.id);
                            if (profileInList?.customDutyDescription) {
                              return (
                                <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                  <div className="space-y-1 text-left">
                                    <span className="text-[9px] uppercase font-mono font-black text-emerald-400 tracking-wider flex items-center gap-1">
                                      <ClipboardList className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                                      Active Duty Service Assigned by CEO
                                    </span>
                                    <p className="text-xs text-zinc-300 italic">"{profileInList.customDutyDescription}"</p>
                                    {profileInList.customDutyTime && (
                                      <p className="text-[10px] text-[#10b981] font-mono">Daily Target Timing Constraint: <span className="font-bold text-white">{profileInList.customDutyTime}</span></p>
                                    )}
                                  </div>
                                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 rounded-lg text-[9px] font-mono uppercase font-bold tracking-wider select-none shrink-0 border border-emerald-900/45">
                                    Custom Task Duty
                                  </span>
                                </div>
                              );
                            }
                          })()}

                          {/* Grid of the 5 metrics */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Total Posts</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-black text-white">{totalPosts}</h3>
                                <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded uppercase font-mono font-bold">Live</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Shared brand content deliverables.</p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Total Engagement</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-black text-[#10b981]">{totalEngagement.toLocaleString()}</h3>
                                <span className="text-[9px] text-[#10b981] font-bold font-mono">Likes</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Aggregated design reach metrics.</p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Total DMs</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-black text-sky-400">{totalDMs}</h3>
                                <span className="text-[9px] text-sky-400 font-mono font-bold">Cold</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Outbound lead generation texts.</p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Total Responses</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-black text-teal-400">{totalResponses}</h3>
                                <span className="text-[9px] text-teal-400 bg-teal-950/40 px-1.5 py-0.5 rounded uppercase font-mono font-bold">Warm</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Interested leads & conversation rates.</p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Total Rejects</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-black text-red-400">{totalRejects}</h3>
                                <span className="text-[9px] text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded uppercase font-mono font-bold">Closed</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Refused outbound sequences.</p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-855 p-4 rounded-xl space-y-2 col-span-2 sm:col-span-1">
                              <span className="text-[10px] font-mono text-zinc-550 uppercase font-semibold">Funnel Health</span>
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-xl font-bold text-white">
                                  {Math.round((totalResponses / Math.max(1, totalDMs)) * 100)}%
                                </h3>
                                <span className="text-[9px] text-amber-400 font-mono font-bold">Paced</span>
                              </div>
                              <p className="text-[9.5px] text-zinc-500 leading-none">Outreach response efficiency.</p>
                            </div>
                          </div>
                        </div>

                        {/* Summary details container */}
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Roster Attendance Compliance History</h3>
                          <div className="space-y-2">
                            {attendanceLogs.filter(log => log.staffId === currentUser.id).length === 0 ? (
                              <div className="text-center py-6 text-zinc-500 text-xs font-mono">
                                No check-in events logged historically in this session.
                              </div>
                            ) : (
                              attendanceLogs.filter(log => log.staffId === currentUser.id).map(log => (
                                <div key={log.id} className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl flex justify-between items-center text-xs font-mono">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                    <span className="text-white font-bold">{log.date}</span>
                                    <span className="text-zinc-500">Checked-In at {log.time}</span>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold font-mono ${
                                    log.status === 'Present' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' : 'bg-amber-950 text-amber-400 border border-amber-900/40'
                                  }`}>
                                    {log.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Edit Profile Settings */}
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6 h-fit">
                        <div>
                          <h2 className="text-xl font-bold tracking-tight text-white font-sans">Edit Your Profile</h2>
                          <p className="text-xs text-zinc-400 mt-1 font-sans">
                            Modify your active public display credentials. Changes are propagated live onto the administrative directories, logs, and PDF files.
                          </p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          {/* Live Avatar Preview */}
                          <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
                            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-400">Roster Avatar Preview</span>
                            <img
                              src={profileAvatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
                              alt="Roster preview"
                              className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/50"
                              referrerPolicy="no-referrer"
                            />
                            
                            <div className="space-y-2 text-center w-full">
                              <span className="block text-[8.5px] text-zinc-500 font-mono">Preset Workspace Suggestions:</span>
                              <div className="flex gap-2 justify-center flex-wrap">
                                {avatarOptionsPreset.map((preset, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setProfileAvatarUrl(preset)}
                                    className={`w-7 h-7 rounded-full overflow-hidden border transition-all cursor-pointer ${
                                      profileAvatarUrl === preset ? 'border-emerald-400 scale-110 ring-1 ring-emerald-400' : 'border-zinc-800 opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    <img src={preset} alt={`preset-${idx}`} className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Display Full Name</label>
                            <input
                              type="text"
                              required
                              value={profileName}
                              onChange={(e) => setProfileName(e.target.value)}
                              placeholder="e.g. Shahar Bano"
                              className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-white uppercase tracking-wider font-semibold focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Update Account Password</label>
                            <input
                              type="text"
                              required
                              value={profilePassword}
                              onChange={(e) => setProfilePassword(e.target.value)}
                              placeholder="Enter secure password"
                              className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono">Professional biography (Bio)</label>
                            <textarea
                              required
                              value={profileBio}
                              onChange={(e) => setProfileBio(e.target.value)}
                              placeholder="State your operational focus, expertise level, or credentials focus..."
                              className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                              rows={4}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-550 uppercase font-bold mb-1 font-mono">Custom Image URL String</label>
                            <input
                              type="url"
                              value={profileAvatarUrl}
                              onChange={(e) => setProfileAvatarUrl(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-zinc-350 font-mono focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-550 uppercase font-bold mb-1 font-mono flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-emerald-400" />
                              <span>or Select Photo From Computer:</span>
                            </label>
                            <div className="flex items-center gap-3 bg-zinc-950 p-3.5 rounded-xl border border-zinc-808">
                              <label className="bg-zinc-900 border border-zinc-800 hover:border-emerald-700 hover:bg-zinc-850 py-2 px-3.5 rounded-lg cursor-pointer text-[11px] font-bold uppercase transition-colors select-none text-white">
                                Choose Local File
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      if (file.size > 2 * 1024 * 1024) {
                                        showToast('Please select an image file under 2MB.', 'warning');
                                        return;
                                      }
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        if (event.target?.result) {
                                          setProfileAvatarUrl(event.target.result as string);
                                          showToast('Avatar image loaded successfully from computer.');
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <span className="text-[10px] text-zinc-500 font-mono select-none truncate max-w-[170px]">
                                {profileAvatarUrl?.startsWith('data:') ? 'Custom computer image uploaded' : 'Preset avatar active'}
                              </span>
                            </div>
                          </div>

                          {/* Social links block */}
                          <div className="space-y-3 pt-3 border-t border-zinc-850">
                            <h3 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Social Roster Coordinates</h3>
                            
                            <div>
                              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono flex items-center gap-1">
                                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                                LinkedIn URL <span className="text-emerald-400 font-sans font-normal lowercase">(required - must)</span>
                              </label>
                              <input
                                type="url"
                                required={currentUser.role === 'Staff'}
                                value={profileLinkedin}
                                onChange={(e) => setProfileLinkedin(e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-zinc-350 font-mono focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono flex items-center gap-1">
                                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                                Instagram URL <span className="text-zinc-650 font-sans font-normal lowercase">(optional)</span>
                              </label>
                              <input
                                type="url"
                                value={profileInstagram}
                                onChange={(e) => setProfileInstagram(e.target.value)}
                                placeholder="https://instagram.com/username"
                                className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-zinc-350 font-mono focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1 font-mono flex items-center gap-1">
                                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                                Facebook URL <span className="text-zinc-650 font-sans font-normal lowercase">(optional)</span>
                              </label>
                              <input
                                type="url"
                                value={profileFacebook}
                                onChange={(e) => setProfileFacebook(e.target.value)}
                                placeholder="https://facebook.com/username"
                                className="w-full bg-zinc-950 border border-zinc-808 rounded-xl p-3 text-xs text-zinc-350 font-mono focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors block text-center cursor-pointer"
                          >
                            Save Profile Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })()}

                {/* --- STAFF TAB 6: DIRECT SECURED EXECUTIVE ORDERS --- */}
                {staffActiveTab === 'orders' && (() => {
                  const myOrders = directOrders.filter(o => o.staffIds.includes('all') || o.staffIds.includes(currentUser.id));
                  
                  return (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <Send className="text-emerald-400 w-5 h-5 animate-pulse" />
                          <span>Direct CEO Directives Inbox</span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Review mandatory tasks and orders issued directly by the CEO. You must review, implement, and mark directives as complete for real-time reporting metrics.
                        </p>
                      </div>

                      <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-zinc-850">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Your Directives & Correspondence Logs</h3>
                          <span className="text-xs text-zinc-500 font-mono">Incoming Alerts: {myOrders.filter(o => o.status === 'Pending').length} Pending</span>
                        </div>

                        <div className="space-y-4 divide-y divide-zinc-850">
                          {myOrders.length === 0 ? (
                            <div className="text-center py-12 text-zinc-550 text-xs font-mono">
                              No personal or broadcast directives issued yet by the CEO.
                            </div>
                          ) : (
                            myOrders.map((ord) => {
                              const isAll = ord.staffIds.includes('all');
                              return (
                                <div key={ord.id} className="pt-4 first:pt-0 space-y-3">
                                  <div className="flex justify-between items-start gap-4 flex-wrap md:flex-nowrap">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                          ord.format === 'Urgent Order' 
                                            ? 'bg-red-950 text-red-400 border-red-900/40 animate-pulse' 
                                            : ord.format === 'Email' 
                                            ? 'bg-sky-950 text-sky-400 border-sky-900/40' 
                                            : ord.format === 'PDF Doc' 
                                            ? 'bg-pink-950 text-pink-400 border-pink-900/40' 
                                            : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                                        }`}>
                                          {ord.format}
                                        </span>
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded leading-none border font-mono ${
                                          ord.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border-emerald-900/50' : 'bg-amber-950 text-amber-400 border-amber-900/50'
                                        }`}>
                                          {ord.status}
                                        </span>
                                        <span className="text-[10px] text-zinc-500 font-mono">Dispatched: {ord.date} - {ord.time}</span>
                                      </div>

                                      <h4 className="text-xs font-black uppercase text-white mt-1">{ord.title}</h4>
                                      <p className="text-[10.5px] text-zinc-400 font-mono">
                                        {isAll ? 'Group Broadcast (All Members)' : 'Direct Private Message to You'}
                                      </p>
                                    </div>

                                    {/* Action Button: Mark Complete */}
                                    <div>
                                      <button
                                        onClick={() => {
                                          setDirectOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: o.status === 'Completed' ? 'Pending' : 'Completed' } : o));
                                          showToast(`Directive status successfully marked as ${ord.status === 'Completed' ? 'Pending' : 'Completed'}!`);
                                        }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all uppercase flex items-center gap-1.5 font-mono ${
                                          ord.status === 'Completed' 
                                            ? 'bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-white' 
                                            : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                                        }`}
                                      >
                                        <CheckSquare className="w-3.5 h-3.5" />
                                        <span>{ord.status === 'Completed' ? 'Re-open Order' : 'Mark Completed'}</span>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                                    <div className="text-xs text-zinc-300 italic whitespace-pre-wrap">{ord.instructions}</div>
                                    
                                    {/* Download templates */}
                                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
                                      <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider font-bold mr-1">Enforced Action Node:</span>
                                      
                                      <a
                                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                                          `=========================================\nNEXFORM EXECUTIVE ORDER: ${ord.format.toUpperCase()}\n=========================================\n\nSubject: ${ord.title}\nDispatched On: ${ord.date} - ${ord.time}\nIssued By: CEO Administrator\nAssigned to: ${currentUser.name}\nStatus: ${ord.status}\n\nDIRECTIVE DETAILS:\n-----------------\n${ord.instructions}\n\n=========================================\nNexform Corporate Intranet System (Corporate Compliance)`
                                        )}`}
                                        download={`Nexform_Directive_PDF_${ord.id}.txt`}
                                        className="px-2.5 py-1.5 border border-zinc-850 rounded text-pink-400 text-[10px] bg-zinc-950 hover:bg-pink-950/20 hover:border-pink-900/60 transition-all font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      >
                                        <FileText className="w-3 h-3 text-pink-400" />
                                        <span>Download PDF Form</span>
                                      </a>

                                      {ord.format === 'Email' && (
                                        <a
                                          href={`mailto:ceo@nexform.com?subject=${encodeURIComponent('[Reply Directive] ' + ord.title)}&body=${encodeURIComponent(
                                            `Hi CEO,\n\nI have successfully received and reviewed your direct executive order: "${ord.title}".\n\nI am compiling report updates and will forward screenshots directly to the incoming vault.\n\nRegards,\n${currentUser.name}`
                                          )}`}
                                          className="px-2.5 py-1.5 border border-zinc-850 rounded text-sky-400 text-[10px] bg-zinc-950 hover:bg-sky-950/20 hover:border-sky-900/60 transition-all font-mono font-bold flex items-center gap-1 cursor-pointer"
                                        >
                                          <Mail className="w-3 h-3 text-sky-400" />
                                          <span>Send Email Response</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

              </div>
            )}

          </main>

          {/* Footer compliance credits */}
          <footer className="bg-zinc-950 border-t border-zinc-900 py-6 px-6 text-center text-[11px] text-zinc-550 space-y-1">
            <p>© {new Date().getFullYear()} Nexform Agency Corporate Intranet. All rights reserved.</p>
            <p className="text-[10px] text-zinc-600 font-mono tracking-wider">
              Secure Cloud File Storage Encryption Node Active: AI-PREVIEW-MODE-9800
            </p>
          </footer>

        </div>
      )}

    </div>
  );
}
