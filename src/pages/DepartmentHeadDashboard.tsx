import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Shield,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useFraudDetection } from '@/hooks/useFraudDetection';
import { karnatakaZones, generateZoneData } from '@/data/karnatakaData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/utils/localization';
import KPICard from '@/components/KPICard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FraudAnalyticsSection from '@/components/dashboard/FraudAnalyticsSection';
import ZoneDetailsCard from '@/components/dashboard/ZoneDetailsCard';
import RealtimeAlertsCard from '@/components/dashboard/RealtimeAlertsCard';
import PerformanceChartsSection from '@/components/dashboard/PerformanceChartsSection';
import CityPerformanceCard from '@/components/dashboard/CityPerformanceCard';
import RevenueAnalyticsCard from '@/components/dashboard/RevenueAnalyticsCard';
import AIForecastingCard from '@/components/dashboard/AIForecastingCard';

const DepartmentHeadDashboard = () => {
  const [selectedZone, setSelectedZone] = useState('all-zones');
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [selectedView, setSelectedView] = useState('overview');
  const kpiData = useRealTimeData();
  const fraudData = useFraudDetection();
  const { t } = useLanguage();
  const { formatCurrency, formatNumber, formatPercentage } = useLocalization();

  const currentZoneData = selectedZone === 'all-zones' ? kpiData : generateZoneData(selectedZone) || kpiData;

  const exportReport = () => {
    const reportData = {
      date: new Date().toISOString(),
      zone: selectedZone,
      kpis: currentZoneData,
      fraudStats: fraudData.stats,
      alerts: []
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `msefc-fraud-report-${selectedZone}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewFraudDetails = (caseId: string) => {
    console.log('Viewing fraud case details:', caseId);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Filters */}
      <DashboardHeader
        selectedZone={selectedZone}
        selectedView={selectedView}
        onZoneChange={setSelectedZone}
        onViewChange={setSelectedView}
        onExportReport={exportReport}
      />

      {/* Enhanced KPIs with Fraud Detection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard
          title={t('dashboard.totalTheftCases')}
          value={currentZoneData.powerTheft}
          icon={AlertTriangle}
          trend="up"
          trendValue={`12% ${t('dashboard.vsLastMonth')}`}
          className="kpi-update border-l-4 border-l-red-500"
        />
        <KPICard
          title={t('dashboard.fraudCases')}
          value={fraudData.stats.totalCases}
          icon={Shield}
          trend="up"
          trendValue={`${fraudData.stats.activeCases} ${t('dashboard.activeCases')}`}
          className="border-l-4 border-l-orange-500"
        />
        <KPICard
          title={t('dashboard.resolvedCases')}
          value={formatPercentage(Math.round((fraudData.stats.resolvedCases / fraudData.stats.totalCases) * 100))}
          icon={ShieldCheck}
          trend="up"
          trendValue={`5% ${t('dashboard.improvement')}`}
          className="border-l-4 border-l-green-500"
        />
        <KPICard
          title={t('dashboard.amountRecovered')}
          value={formatCurrency(fraudData.stats.totalAmountInvolved)}
          icon={DollarSign}
          trend="up"
          trendValue={`${formatCurrency(240000)} ${t('dashboard.thisMonth')}`}
          className="border-l-4 border-l-blue-500"
          type="currency"
        />
        <KPICard
          title={t('dashboard.aiDetection')}
          value={formatPercentage(Math.round((fraudData.stats.aiDetectedCases / fraudData.stats.totalCases) * 100))}
          icon={Brain}
          trend="stable"
          trendValue={t('dashboard.aiEnhanced')}
          className="border-l-4 border-l-purple-500"
          type="percentage"
        />
        <KPICard
          title={t('dashboard.highPriority')}
          value={formatNumber(fraudData.stats.highSeverityCases)}
          icon={ShieldAlert}
          trend="down"
          trendValue={`2 ${t('dashboard.resolvedToday')}`}
          className="border-l-4 border-l-red-500"
        />
      </div>

      {/* Fraud Analytics View */}
      {selectedView === 'fraud' && (
        <FraudAnalyticsSection
          fraudData={fraudData}
          onViewFraudDetails={handleViewFraudDetails}
        />
      )}

      {/* Zone Information Card */}
      {selectedZone !== 'all-zones' && (
        <ZoneDetailsCard selectedZone={selectedZone} />
      )}

      {/* Real-time Alerts */}
      <RealtimeAlertsCard />

      {/* Enhanced Charts */}
      <PerformanceChartsSection />

      {/* Enhanced AI Forecasting */}
      <AIForecastingCard />

      {/* City Performance Ranking */}
      <CityPerformanceCard />

      {/* Revenue Recovery Analytics */}
      <RevenueAnalyticsCard />
    </div>
  );
};

export default DepartmentHeadDashboard;