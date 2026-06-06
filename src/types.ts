export interface StaffProfile {
  id: string; // unique ID
  name: string;
  email: string;
  role: 'CEO' | 'Staff';
  department: 'Instagram Graphic Design' | 'Facebook Graphic Design' | 'LinkedIn Marketing' | 'Operations' | 'Product Design' | 'Strategy';
  permissions: {
    canPost: boolean;
    canViewAnalytics: boolean;
    canManageStaff: boolean;
    canConfigureSystem: boolean;
    canAccessVault: boolean;
  };
  joinedDate: string;
  avatarUrl?: string;
  password?: string; // Standard secure password for RBAC login
  bio?: string; // Staff member biography
  linkedinUrl?: string; // LinkedIn URL (Must/Recommended)
  instagramUrl?: string; // Instagram URL (Optional)
  facebookUrl?: string; // Facebook URL (Optional)
  customDutyDescription?: string; // CEO dynamic daily task/duty description
  customDutyTime?: string; // Optional specific daily timing target
}

export interface DirectOrder {
  id: string;
  ceoName: string;
  title: string;
  instructions: string;
  staffIds: string[]; // Specific staff ids or ['all'] for everyone
  date: string; // e.g. 2026-06-06
  time: string; // e.g. 10:15 AM
  format: 'Email' | 'PDF Doc' | 'Direct Directive' | 'Urgent Order';
  status: 'Pending' | 'Completed' | 'Acknowledged';
}

export interface AttendanceLog {
  id: string;
  staffId: string;
  staffName: string;
  date: string; // e.g. 2026-06-06
  time: string; // e.g. 09:12 AM
  status: 'Present' | 'Late';
  department: string;
}

export interface ClientDeadline {
  id: string;
  clientName: string;
  projectName: string;
  dueDate: string;
  status: 'Urgent' | 'In Progress' | 'Completed' | 'Delayed';
  category: 'Design' | 'Ad Campaign' | 'Strategy' | 'Copywriting';
}

export interface TaskDelegation {
  id: string;
  title: string;
  description: string;
  assignedToId: string; // StaffProfile ID
  date: string; // e.g., '2026-06-06'
  status: 'Completed' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
  department: string;
}

export interface DailyPost {
  id: string;
  staffId: string;
  date: string; // e.g. '2026-06-06'
  platform: 'Instagram' | 'Facebook' | 'LinkedIn';
  postedToday: boolean;
  postDetails?: string; 
  postLink?: string;
  submittedAt?: string; // Time of reporting e.g. '11:30 AM'
  sharedWithinTwoHours?: boolean; // alerts
  noPostReason?: string;
  dmCount: number; // Max 30
  dmLocal: number;
  dmInternational: number;
  screenshots: Array<{ name: string; url: string; size: string }>; // base64 or objectUrl
  
  // Platform specific parameters
  // Arhum's Facebook parameters
  fbGroupsJoinedToday?: number;
  fbGroupsLocal?: number;
  fbGroupsInternational?: number;
  
  // Naila's LinkedIn parameters
  linkedInFollowUps?: number;
  linkedInRefused?: number;
  linkedInLandedToCall?: number;
  customDutySubmitted?: boolean; // If they check-off their CEO monthly duty
  customDutyText?: string; // Content, words count, plagiarism note to report
}

export interface CEOReport {
  id: string;
  senderId: string;
  senderName: string;
  date: string;
  type: 'Request' | 'Urgent Report' | 'Complaint' | 'Feedback';
  subject: string;
  content: string;
  status: 'Pending' | 'Reviewed' | 'Approved' | 'Declined';
}

export interface SystemSettings {
  agencyName: string;
  maintenanceMode: boolean;
  allowedIpRanges: string;
  passwordPolicy: 'Strong' | 'Normal';
  weeklyDmTarget: number;
  enableNotificationSound: boolean;
  vaultAuditLog: Array<{ timestamp: string; action: string; user: string }>;
}
