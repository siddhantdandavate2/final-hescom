
import { useState, useEffect } from 'react';
import { mockFraudCases, fraudDetectionStats, FraudCase } from '@/data/fraudDetectionData';
import { useAuth } from '@/contexts/AuthContext';

interface FraudDetectionData {
  cases: FraudCase[];
  stats: typeof fraudDetectionStats;
  assignedCases: FraudCase[];
  recentCases: FraudCase[];
  highPriorityCases: FraudCase[];
}

export const useFraudDetection = (): FraudDetectionData => {
  const { user } = useAuth();
  const [fraudData, setFraudData] = useState<FraudDetectionData>({
    cases: mockFraudCases,
    stats: fraudDetectionStats,
    assignedCases: [],
    recentCases: [],
    highPriorityCases: []
  });

  useEffect(() => {
    // Filter cases based on user role and zone
    let filteredCases = mockFraudCases;
    
    if (user?.role === 'site_engineer' && user.zone) {
      // Site engineers see cases from their zone and assigned to them
      filteredCases = mockFraudCases.filter(c => 
        c.zone.includes(user.zone!) || c.assignedEngineer === user.name
      );
    }

    const assignedCases = user?.role === 'site_engineer' 
      ? filteredCases.filter(c => c.assignedEngineer === user.name || c.status === 'Active')
      : filteredCases.filter(c => c.status === 'Active');

    const recentCases = filteredCases
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 5);

    const highPriorityCases = filteredCases.filter(c => 
      c.severity === 'High' && (c.status === 'Active' || c.status === 'Under Investigation')
    );

    // Update stats based on filtered cases
    const updatedStats = {
      ...fraudDetectionStats,
      totalCases: filteredCases.length,
      activeCases: filteredCases.filter(c => c.status === 'Active').length,
      resolvedCases: filteredCases.filter(c => c.status === 'Resolved').length,
      underInvestigation: filteredCases.filter(c => c.status === 'Under Investigation').length,
      totalAmountInvolved: filteredCases.reduce((sum, c) => sum + c.amountInvolved, 0),
      highSeverityCases: filteredCases.filter(c => c.severity === 'High').length,
      aiDetectedCases: filteredCases.filter(c => c.detectionMethod === 'AI Detection').length
    };

    setFraudData({
      cases: filteredCases,
      stats: updatedStats,
      assignedCases,
      recentCases,
      highPriorityCases
    });
  }, [user]);

  return fraudData;
};
