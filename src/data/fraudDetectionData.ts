
export interface FraudCase {
  id: string;
  caseNumber: string;
  consumerName: string;
  consumerNumber: string;
  location: string;
  zone: string;
  fraudType: 'Power Theft' | 'Meter Tampering' | 'Illegal Connection' | 'Billing Fraud' | 'Energy Diversion';
  severity: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Under Investigation' | 'Resolved' | 'Closed';
  detectionMethod: 'AI Detection' | 'Manual Inspection' | 'Consumer Report' | 'Routine Check';
  confidenceScore: number;
  amountInvolved: number;
  assignedEngineer?: string;
  detectedDate: string;
  lastUpdated: string;
  evidence: string[];
  description: string;
}

export const mockFraudCases: FraudCase[] = [
  {
    id: 'FD001',
    caseNumber: 'MSEFC-FD-2024-001',
    consumerName: 'Ramesh Kumar',
    consumerNumber: 'KA001234567891',
    location: 'Jayanagar Block 4, Bengaluru',
    zone: 'Bengaluru South',
    fraudType: 'Power Theft',
    severity: 'High',
    status: 'Active',
    detectionMethod: 'AI Detection',
    confidenceScore: 94,
    amountInvolved: 85000,
    assignedEngineer: 'Priya Sharma',
    detectedDate: '2024-01-15',
    lastUpdated: '2024-01-18',
    evidence: ['Abnormal consumption pattern', 'Tampered meter reading', 'Field inspection photos'],
    description: 'Unusual power consumption detected with bypassed meter connections'
  },
  {
    id: 'FD002',
    caseNumber: 'MSEFC-FD-2024-002',
    consumerName: 'Suresh Gowda',
    consumerNumber: 'KA001234567892',
    location: 'Malleswaram, Bengaluru',
    zone: 'Bengaluru North',
    fraudType: 'Meter Tampering',
    severity: 'Medium',
    status: 'Under Investigation',
    detectionMethod: 'Manual Inspection',
    confidenceScore: 87,
    amountInvolved: 45000,
    assignedEngineer: 'Priya Sharma',
    detectedDate: '2024-01-12',
    lastUpdated: '2024-01-17',
    evidence: ['Physical meter damage', 'Inconsistent readings'],
    description: 'Meter tampering discovered during routine maintenance'
  },
  {
    id: 'FD003',
    caseNumber: 'MSEFC-FD-2024-003',
    consumerName: 'Lakshmi Devi',
    consumerNumber: 'KA001234567893',
    location: 'Vijayanagar, Mysuru',
    zone: 'Mysuru East',
    fraudType: 'Illegal Connection',
    severity: 'High',
    status: 'Resolved',
    detectionMethod: 'Consumer Report',
    confidenceScore: 100,
    amountInvolved: 120000,
    assignedEngineer: 'Rajesh Kumar',
    detectedDate: '2024-01-08',
    lastUpdated: '2024-01-16',
    evidence: ['Unauthorized wiring', 'Witness statements', 'Connection photos'],
    description: 'Illegal direct connection bypassing official meter'
  },
  {
    id: 'FD004',
    caseNumber: 'MSEFC-FD-2024-004',
    consumerName: 'Venkatesh Reddy',
    consumerNumber: 'KA001234567894',
    location: 'Hubli Central',
    zone: 'Hubli Zone',
    fraudType: 'Energy Diversion',
    severity: 'Medium',
    status: 'Active',
    detectionMethod: 'AI Detection',
    confidenceScore: 78,
    amountInvolved: 62000,
    assignedEngineer: 'Site Engineer 2',
    detectedDate: '2024-01-14',
    lastUpdated: '2024-01-18',
    evidence: ['Load pattern analysis', 'Smart meter alerts'],
    description: 'Energy diversion detected through smart meter analytics'
  },
  {
    id: 'FD005',
    caseNumber: 'MSEFC-FD-2024-005',
    consumerName: 'Manjunath S',
    consumerNumber: 'KA001234567895',
    location: 'Davangere Market',
    zone: 'Davangere Zone',
    fraudType: 'Billing Fraud',
    severity: 'Low',
    status: 'Under Investigation',
    detectionMethod: 'Routine Check',
    confidenceScore: 65,
    amountInvolved: 28000,
    detectedDate: '2024-01-13',
    lastUpdated: '2024-01-17',
    evidence: ['Billing discrepancies', 'Payment history analysis'],
    description: 'Inconsistencies found in billing calculations and payments'
  }
];

export const fraudDetectionStats = {
  totalCases: mockFraudCases.length,
  activeCases: mockFraudCases.filter(c => c.status === 'Active').length,
  resolvedCases: mockFraudCases.filter(c => c.status === 'Resolved').length,
  underInvestigation: mockFraudCases.filter(c => c.status === 'Under Investigation').length,
  totalAmountInvolved: mockFraudCases.reduce((sum, c) => sum + c.amountInvolved, 0),
  averageConfidenceScore: Math.round(mockFraudCases.reduce((sum, c) => sum + c.confidenceScore, 0) / mockFraudCases.length),
  highSeverityCases: mockFraudCases.filter(c => c.severity === 'High').length,
  aiDetectedCases: mockFraudCases.filter(c => c.detectionMethod === 'AI Detection').length
};
