import { jsPDF } from 'jspdf';
import { StaffProfile, TaskDelegation, DailyPost } from './types';

export function generateDailyTaskPDF(
  staff: StaffProfile,
  tasks: TaskDelegation[],
  dailyPost: DailyPost | null,
  dateString: string
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Theme colors
  const primaryColor = [16, 185, 129]; // Emerald Green (#10B981)
  const darkBg = [24, 24, 27]; // Dark grey (#18181B)
  const textDark = [39, 39, 42]; // Zinc 800

  // Header Banner Background
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Top Accent Line in green
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 4, 'F');

  // Agency branding
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Nexform Agency', 15, 18);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(167, 139, 250); // Violet label
  doc.setTextColor(16, 185, 129); // Emerald label
  doc.text('DAILY COMPLIANCE & TASK REPORT', 15, 25);
  
  // Date timestamp
  doc.setFont('Helvetica', 'oblique');
  doc.setFontSize(10);
  doc.setTextColor(161, 161, 170); // grey
  doc.text(`Report Date: ${dateString}`, 154, 18);
  doc.text(`Generated: ${new Date().toLocaleTimeString()}`, 154, 25);

  // Staff details card (light gray box)
  doc.setFillColor(244, 244, 245);
  doc.rect(15, 45, 180, 26, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('STAFF MEMBER DETAILS', 20, 52);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Name:       ${staff.name}`, 20, 58);
  doc.text(`Email:      ${staff.email}`, 20, 64);
  
  doc.text(`Department:  ${staff.department}`, 105, 58);
  doc.text(`Role:        ${staff.role}`, 105, 64);

  // Section 1: Today's Tasks Complete vs Incomplete
  let currentY = 82;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate 900
  doc.text('1. DAILY TASK STATUS SUMMARY', 15, currentY);
  
  // Green visual line divider
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(15, currentY + 2, 195, currentY + 2);
  currentY += 8;

  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const pendingTasks = tasks.filter((t) => t.status === 'Pending');

  // Title Headers
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(5, 150, 105); // Completed color (green)
  doc.text(`[COMPLETED TASKS] - (${completedTasks.length})`, 15, currentY);
  currentY += 5;

  if (completedTasks.length === 0) {
    doc.setFont('Helvetica', 'oblique');
    doc.setFontSize(9);
    doc.setTextColor(113, 113, 122);
    doc.text('No tasks logged as completed today.', 20, currentY);
    currentY += 6;
  } else {
    completedTasks.forEach((t) => {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(24, 24, 27);
      doc.text(`[x] ${t.title}`, 20, currentY);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(82, 82, 91);
      doc.text(`- Description: ${t.description.substring(0, 85)}...`, 20, currentY + 4);
      currentY += 10;
    });
  }

  currentY += 4;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38); // Red for pending
  doc.text(`[INCOMPLETE / PENDING TASKS] - (${pendingTasks.length})`, 15, currentY);
  currentY += 5;

  if (pendingTasks.length === 0) {
    doc.setFont('Helvetica', 'oblique');
    doc.setFontSize(9);
    doc.setTextColor(113, 113, 122);
    doc.text('Amazing! No pending tasks remaining today.', 20, currentY);
    currentY += 6;
  } else {
    pendingTasks.forEach((t) => {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(24, 24, 27);
      doc.text(`[ ] ${t.title}`, 20, currentY);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(82, 82, 91);
      doc.text(`- Description: ${t.description.substring(0, 85)}...`, 20, currentY + 4);
      currentY += 10;
    });
  }

  // Section 2: Social Media & Post Logging
  currentY += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. SOCIAL PLATFORM PERFORMANCE LOGS', 15, currentY);
  
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.line(15, currentY + 2, 195, currentY + 2);
  currentY += 8;

  if (!dailyPost) {
    doc.setFont('Helvetica', 'oblique');
    doc.setFontSize(9);
    doc.setTextColor(113, 113, 122);
    doc.text('No social platform post logs filed for today.', 20, currentY);
  } else {
    // Post Check status
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Platform Channel: ${dailyPost.platform}`, 15, currentY);
    
    doc.setFont('Helvetica', 'normal');
    doc.text(`Has Posted Today:`, 105, currentY);
    doc.setFont('Helvetica', 'bold');
    if (dailyPost.postedToday) {
      doc.setTextColor(16, 185, 129);
      doc.text('YES', 140, currentY);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.text('NO', 140, currentY);
    }
    currentY += 6;

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('Helvetica', 'normal');
    
    if (dailyPost.postedToday) {
      // Post details & link
      doc.text(`Post Description: ${dailyPost.postDetails || 'N/A'}`, 15, currentY);
      currentY += 5;
      
      doc.setTextColor(37, 99, 235); // Blue for link
      doc.text(`Shared Link:       ${dailyPost.postLink || 'N/A'}`, 15, currentY);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      currentY += 5;

      doc.text('Shared Within 2 Hours Limit: ', 15, currentY);
      doc.setFont('Helvetica', 'bold');
      if (dailyPost.sharedWithinTwoHours) {
        doc.setTextColor(16, 185, 129);
        doc.text('YES (Compliant)', 65, currentY);
      } else {
        doc.setTextColor(220, 38, 38);
        doc.text('NO (Delayed Link Share)', 65, currentY);
      }
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      currentY += 7;
    } else {
      doc.setTextColor(220, 38, 38);
      doc.text(`Non-Post Escalation Justification:`, 15, currentY);
      currentY += 5;
      doc.setFont('Helvetica', 'oblique');
      doc.setTextColor(113, 113, 122);
      doc.text(`"${dailyPost.noPostReason || 'No reason specified'}"`, 20, currentY);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      currentY += 8;
    }

    // DM & Lead Tracking Table
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Outbound Lead Generation (DMs Logged):', 15, currentY);
    currentY += 5;

    doc.setFillColor(244, 244, 245);
    doc.rect(15, currentY, 180, 16, 'F');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Sended Outbound DMs', 20, currentY + 5);
    doc.text('International Outreach', 80, currentY + 5);
    doc.text('Local Clients Reached', 140, currentY + 5);

    doc.setFont('Helvetica', 'normal');
    doc.text(`${dailyPost.dmCount} / 30 Direct Messages`, 20, currentY + 11);
    doc.text(`${dailyPost.dmInternational} local targets`, 80, currentY + 11);
    doc.text(`${dailyPost.dmLocal} local/local business`, 140, currentY + 11);
    currentY += 21;

    // Platform Specific Details
    if (dailyPost.platform === 'Facebook') {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Community Outreach & Marketing (Facebook Groups):', 15, currentY);
      currentY += 5;
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Groups Joined Today:   ${dailyPost.fbGroupsJoinedToday ?? 0}`, 20, currentY);
      doc.text(`International Groups:  ${dailyPost.fbGroupsInternational ?? 0}`, 80, currentY);
      doc.text(`Local / Country Groups: ${dailyPost.fbGroupsLocal ?? 0}`, 140, currentY);
      currentY += 8;
    } else if (dailyPost.platform === 'LinkedIn') {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Lead Conversion Sprints (LinkedIn Core Funnel):', 15, currentY);
      currentY += 5;

      doc.setFillColor(254, 242, 242); // soft red box
      doc.setFillColor(240, 253, 250); // soft clean teal box
      doc.rect(15, currentY, 180, 10, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(37, 99, 235);
      doc.text(`Follow Ups: ${dailyPost.linkedInFollowUps ?? 0}`, 20, currentY + 6);
      doc.setTextColor(220, 38, 38);
      doc.text(`Refused Leads: ${dailyPost.linkedInRefused ?? 0}`, 75, currentY + 6);
      doc.setTextColor(5, 150, 105);
      doc.text(`Landed to Strategy Call: ${dailyPost.linkedInLandedToCall ?? 0}`, 125, currentY + 6);
      currentY += 15;
    }
  }

  // Footnote and compliance notice
  doc.setDrawColor(228, 228, 231);
  doc.line(15, 270, 195, 270);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(113, 113, 122);
  doc.text('Nexform Agency Compliance & Roles Engine. All reports directly saved onto core storage vaults and accessible by the CEO.', 15, 275);
  doc.text('CONFIDENTIAL INTRA-AGENCY TRANSMISSION ONLY. UNAUTHORIZED SHARING STRICTLY FORBIDDEN BY THE CEO.', 15, 279);

  // Trigger Save File
  const filename = `Nexform_${staff.name.replace(/\s+/g, '_')}_Report_${dateString}.pdf`;
  doc.save(filename);
}
