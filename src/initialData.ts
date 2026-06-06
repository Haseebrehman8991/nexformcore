import { StaffProfile, ClientDeadline, TaskDelegation, DailyPost, CEOReport, SystemSettings } from './types';

export const INITIAL_STAFF: StaffProfile[] = [
  {
    id: 'ceo-1',
    name: 'CEO Administrator',
    email: 'Haseeb@123',
    role: 'CEO',
    department: 'Operations',
    joinedDate: '2025-01-10',
    permissions: {
      canPost: true,
      canViewAnalytics: true,
      canManageStaff: true,
      canConfigureSystem: true,
      canAccessVault: true,
    },
    password: 'Haseeb@123',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'shahar-1',
    name: 'Shahar Bano',
    email: 'Bano@123',
    role: 'Staff',
    department: 'Instagram Graphic Design',
    joinedDate: '2025-03-15',
    permissions: {
      canPost: true,
      canViewAnalytics: false,
      canManageStaff: false,
      canConfigureSystem: false,
      canAccessVault: true,
    },
    password: 'Bano@123',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Lead Instagram Strategist. Designing high-conversion micro-narratives and organic engagement grids for premium cosmetics.',
    linkedinUrl: 'https://linkedin.com/in/shahar-bano-nexform',
    instagramUrl: 'https://instagram.com/shahar.bano.design',
    facebookUrl: 'https://facebook.com/shahar.bano.creative'
  },
  {
    id: 'naila-1',
    name: 'Naila Bashar',
    email: 'Naila@123',
    role: 'Staff',
    department: 'LinkedIn Marketing',
    joinedDate: '2025-02-05',
    permissions: {
      canPost: true,
      canViewAnalytics: false,
      canManageStaff: false,
      canConfigureSystem: false,
      canAccessVault: true,
    },
    password: 'Naila@123',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    bio: 'LinkedIn B2B Lead Acquisition Specialist. Creating thought leadership assets and cold-outreach systems for tech enterprises.',
    linkedinUrl: 'https://linkedin.com/in/naila-bashar-b2b',
    instagramUrl: '',
    facebookUrl: ''
  },
  {
    id: 'arhum-1',
    name: 'Arhum Hussain',
    email: 'Arhum@123',
    role: 'Staff',
    department: 'Facebook Graphic Design',
    joinedDate: '2025-04-01',
    permissions: {
      canPost: true,
      canViewAnalytics: false,
      canManageStaff: false,
      canConfigureSystem: false,
      canAccessVault: true,
    },
    password: 'Arhum@123',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Visual Identity UI Artist. Building corporate advertisement banners, group community assets, and strategic interactive campaigns.',
    linkedinUrl: 'https://linkedin.com/in/arhum-hussain-ui',
    instagramUrl: 'https://instagram.com/arhum.hussain',
    facebookUrl: 'https://facebook.com/arhum.hussain.graphic'
  }
];

export const INITIAL_DEADLINES: ClientDeadline[] = [
  {
    id: 'dl-1',
    clientName: 'Algonquin Tech',
    projectName: 'Brand Identity Strategy & Rollout',
    dueDate: '2026-06-15',
    status: 'In Progress',
    category: 'Design'
  },
  {
    id: 'dl-2',
    clientName: 'Kalliste Co.',
    projectName: 'LinkedIn Outbound Funnel Launch',
    dueDate: '2026-06-10',
    status: 'Urgent',
    category: 'Strategy'
  },
  {
    id: 'dl-3',
    clientName: 'Verve Cosmetics',
    projectName: 'Instagram Launch Graphics (30-day Grid)',
    dueDate: '2026-06-08',
    status: 'Urgent',
    category: 'Design'
  },
  {
    id: 'dl-4',
    clientName: 'Zenith Logistics',
    projectName: 'Corporate Facebook Lead-Gen Ads',
    dueDate: '2026-06-25',
    status: 'In Progress',
    category: 'Ad Campaign'
  },
  {
    id: 'dl-5',
    clientName: 'AeroGroup',
    projectName: 'Website Ad Banners & Copywriting',
    dueDate: '2026-06-30',
    status: 'Completed',
    category: 'Copywriting'
  }
];

export const INITIAL_DELEGATED_TASKS: TaskDelegation[] = [
  // Shahar Bano Tasks
  {
    id: 'tsk-sh-1',
    title: 'Design Carousel for Verve Product Launch',
    description: 'Create a 6-slide carousel detailing the key organic ingredients. Color scheme: Earthy peach.',
    assignedToId: 'shahar-1',
    date: '2026-06-06',
    status: 'Pending',
    priority: 'High',
    department: 'Instagram Graphic Design'
  },
  {
    id: 'tsk-sh-2',
    title: 'Instagram Reels Video Cover Art',
    description: 'Develop three eye-catching thumbnail designs for the upcoming interview series reels.',
    assignedToId: 'shahar-1',
    date: '2026-06-06',
    status: 'Completed',
    priority: 'Medium',
    department: 'Instagram Graphic Design'
  },
  // Naila Bashar Tasks
  {
    id: 'tsk-na-1',
    title: 'Draft CEO Thought-Leadership Article',
    description: 'Post about AI-driven agency scaling models. Target 800 words with highly actionable steps.',
    assignedToId: 'naila-1',
    date: '2026-06-06',
    status: 'Completed',
    priority: 'High',
    department: 'LinkedIn Marketing'
  },
  {
    id: 'tsk-na-2',
    title: 'Outbound LinkedIn Connection Sequence',
    description: 'Perform 30 cold DMs and set up calendar invites for qualified responses.',
    assignedToId: 'naila-1',
    date: '2026-06-06',
    status: 'Pending',
    priority: 'High',
    department: 'LinkedIn Marketing'
  },
  // Arhum Hussain Tasks
  {
    id: 'tsk-ar-1',
    title: 'Join 10 Local E-Commerce Facebook Groups',
    description: 'Identify and join active local retailer communities to pitch graphic services.',
    assignedToId: 'arhum-1',
    date: '2026-06-06',
    status: 'Pending',
    priority: 'High',
    department: 'Facebook Graphic Design'
  },
  {
    id: 'tsk-ar-2',
    title: 'Create Facebook Banner Mockups',
    description: 'Design the primary banner layout size 820x312px for Zenith Logistics.',
    assignedToId: 'arhum-1',
    date: '2026-06-06',
    status: 'Completed',
    priority: 'Medium',
    department: 'Facebook Graphic Design'
  }
];

export const INITIAL_DAILY_POSTS: DailyPost[] = [];

export const INITIAL_REPORTS: CEOReport[] = [
  {
    id: 'rep-1',
    senderId: 'shahar-1',
    senderName: 'Shahar Bano',
    date: '2026-06-05',
    type: 'Request',
    subject: 'Requesting Adobe Stock Access Account Key',
    content: 'Hi CEO, I require high-res texture vectors for the upcoming Verve project line. Please approve budget or provide the logins.',
    status: 'Pending'
  },
  {
    id: 'rep-2',
    senderId: 'naila-1',
    senderName: 'Naila Bashar',
    date: '2026-06-04',
    type: 'Urgent Report',
    subject: 'Secured Enterprise Call with Algonquin Tech',
    content: 'Landed a complete discovery consultation with their CTO. Task delegation for strategy prep might need high priority next week.',
    status: 'Reviewed'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  agencyName: 'Nexform Agency',
  maintenanceMode: false,
  allowedIpRanges: '127.0.0.1, 192.168.1.0/24, 0.0.0.0/0',
  passwordPolicy: 'Normal',
  weeklyDmTarget: 150,
  enableNotificationSound: true,
  vaultAuditLog: [
    { timestamp: '2026-06-06 02:10', action: 'Login Approved', user: 'ceo@nexform.com' },
    { timestamp: '2026-06-05 18:45', action: 'Workflow Delegation Updated', user: 'ceo@nexform.com' },
    { timestamp: '2026-06-05 09:15', action: 'Report Viewed (Naila Bashar)', user: 'ceo@nexform.com' }
  ]
};
