import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bell,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const [notifications, setNotifications] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  
  const kpiData = useRealTimeData();
  const fraudData = useFraudDetection();
  const { t } = useLanguage();
  const { formatCurrency, formatNumber, formatPercentage } = useLocalization();

  useEffect(() => {
    // Load notifications
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const deptNotifications = storedNotifications.filter((notif: any) => 
      notif.targetRoles?.includes('department_head') && notif.unread
    );
    setNotifications(deptNotifications);

    // Load complaints
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);

    // Load feedback
    const storedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    setFeedback(storedFeedback);
  }, []);

  const currentZoneData = selectedZone === 'all-zones' ? kpiData : generateZoneData(selectedZone) || kpiData;

  const exportReport = () => {
    const reportData = {
      date: new Date().toISOString(),
      zone: selectedZone,
      kpis: currentZoneData,
      fraudStats: fraudData.stats,
      complaints: complaints.length,
      feedback: feedback.length,
      alerts: []
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hescom-report-${selectedZone}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewFraudDetails = (caseId: string) => {
    console.log('Viewing fraud case details:', caseId);
  };

  const markNotificationAsRead = (notificationId: string) => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = storedNotifications.map((notif: any) => 
      notif.id === notificationId ? { ...notif, unread: false } : notif
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
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

      {/* New Notifications */}
      {notifications.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <span>New Notifications</span>
              <Badge variant="default">{notifications.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.date} at {notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {notification.priority && (
                      <Badge variant={notification.priority === 'High' ? 'destructive' : 'outline'}>
                        {notification.priority}
                      </Badge>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced KPIs with Fraud Detection and Complaints */}
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
          title="Total Complaints"
          value={formatNumber(complaints.length)}
          icon={MessageSquare}
          trend="up"
          trendValue={`${complaints.filter(c => c.status === 'Pending').length} pending`}
          className="border-l-4 border-l-blue-500"
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
          icon={IndianRupee}
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