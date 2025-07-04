
import { useState, useEffect } from 'react';

interface KPIData {
  powerTheft: number;
  resolutionRate: number;
  revenueRecovered: number;
  detectionAccuracy: number;
  totalComplaints: number;
  pendingComplaints: number;
  lastUpdated: Date;
}

export const useRealTimeData = () => {
  const [kpiData, setKpiData] = useState<KPIData>({
    powerTheft: 42,
    resolutionRate: 87,
    revenueRecovered: 2845000,
    detectionAccuracy: 94,
    totalComplaints: 156,
    pendingComplaints: 23,
    lastUpdated: new Date()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => ({
        powerTheft: prev.powerTheft + Math.floor(Math.random() * 3) - 1,
        resolutionRate: Math.max(80, Math.min(100, prev.resolutionRate + Math.floor(Math.random() * 3) - 1)),
        revenueRecovered: prev.revenueRecovered + Math.floor(Math.random() * 50000) - 25000,
        detectionAccuracy: Math.max(85, Math.min(100, prev.detectionAccuracy + Math.floor(Math.random() * 2) - 1)),
        totalComplaints: prev.totalComplaints + Math.floor(Math.random() * 2),
        pendingComplaints: Math.max(0, prev.pendingComplaints + Math.floor(Math.random() * 3) - 1),
        lastUpdated: new Date()
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return kpiData;
};
