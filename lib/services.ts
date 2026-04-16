export type Service = {
  id: string
  title: string
  icon: string
  bullets: string[]
}

/** Migrated from DigitalBYSite/src/Modules/SmartServices/SmartServices.jsx */
export const services: Service[] = [
  {
    id: 'system-integration',
    title: 'System Integration',
    icon: '/assets/images/services-icon/system-integration.svg',
    bullets: [
      'SAP (iDocs, Flat File/XML)',
      'JD Edwards & Oracle',
      'Automation Systems e.g. ASRS Robotic & Conveyor Systems',
      'Custom ERP’s',
      'Parcel Systems e.g. Pitney Bowes',
    ],
  },
  {
    id: 'implementation',
    title: 'Implementation',
    icon: '/assets/images/services-icon/implementation.svg',
    bullets: [
      'Define Needs',
      'Build and Execute Proof-of-Concepts',
      'Technical Designs Creation for Code Change',
      'Conference Room Pilot Management',
      'Go-Live & Hyper Care',
      'Project Management',
    ],
  },
  {
    id: 'audit-management',
    title: 'Audit Management',
    icon: '/assets/images/services-icon/audit-management.svg',
    bullets: [
      'Help with Internal/External Audits',
      'Provide Audit Controls & Federated Reports',
      'Make RP SOX Compliant for Change Management & Related Control Reports',
    ],
  },
  {
    id: 'training-documentation',
    title: 'Training / Documentation',
    icon: '/assets/images/services-icon/training.svg',
    bullets: [
      'End-User Training',
      'Train The Trainers',
      'SOP (Standard Operating Procedures)',
      'Audit Control',
    ],
  },
  {
    id: 'dda-reports-labels',
    title: 'DDA / Reports / Labels',
    icon: '/assets/images/services-icon/training.svg',
    bullets: [
      'Productivity',
      'Order Management',
      'Picking, Receiving & Cost Analysis',
      'Shipping & Shipping SSCL Labels',
      'UPC, RFID & AIAG & Inventory',
      '2D Barcodes',
    ],
  },
  {
    id: 'upgrades',
    title: 'Upgrades',
    icon: '/assets/images/services-icon/upgrades.svg',
    bullets: [
      'Capability Matrix',
      'Fit-Gap Analysis',
      'Solution Summary & Design',
      'Upgrade Recommendation',
      'ROI/Feasibility Study',
      'Database Migration',
      'New Features Configuration Training',
      'Deployments',
    ],
  },
  {
    id: 'custom-enhancements',
    title: 'Custom Enhancements',
    icon: '/assets/images/services-icon/enhancements.svg',
    bullets: [
      'User Interfaces – GUI & RF',
      'Inventory Receiving & Management',
      'Quality Assurance',
      'Slotting & Shipping',
      'Order Management',
      'Integration',
    ],
  },
  {
    id: 'support',
    title: 'Support',
    icon: '/assets/images/services-icon/support.svg',
    bullets: [
      '24 x 7 x 365',
      'Operational Support',
      'Custom/Standard Code',
    ],
  },
]
