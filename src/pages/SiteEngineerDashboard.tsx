import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  MapPin,
  User,
  Shield,
  ShieldAlert,
  Bell,
  MessageSquare
} from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useFraudDetection } from '@/hooks/useFraudDetection';
import KPICard from '@/components/KPICard';
import FraudDetectionCard from '@/components/FraudDetectionCard';

const SiteEngineerDashboard = () => {
  const kpiData = useRealTimeData();
  const fraudData = useFraudDetection();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    // Load notifications
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const engineerNotifications = storedNotifications.filter((notif: any) => 
      notif.targetRoles?.includes('site_engineer') && notif.unread
    );
    setNotifications(engineerNotifications);

    // Load complaints
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);
  }, []);

  const theftAlerts = [
    { id: 1, location: 'Sector 12, Hubli', severity: 'High', time: '2 mins ago', status: 'pending' },
    { id: 2, location: 'Jayanagar, Dharwad', severity: 'Medium', time: '15 mins ago', status: 'investigating' },
    { id: 3, location: 'Malleswaram, Dharwad', severity: 'Low', time: '1 hour ago', status: 'resolved' }
  ];

  const assignedComplaints = complaints.filter(complaint => 
    complaint.status === 'Pending' || complaint.status === 'In Progress'
  ).slice(0, 3);

  const handleInvestigateFraud = (caseId: string) => {
    console.log('Investigating fraud case:', caseId);
    // Implementation for investigation workflow
  };

  const handleViewFraudDetails = (caseId: string) => {
    console.log('Viewing fraud case details:', caseId);
    // Implementation for viewing detailed case information
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
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Site Engineer Dashboard</h2>
            <p className="opacity-90">Real-time monitoring and field operations</p>
          </div>
          {notifications.length > 0 && (
            <Badge variant="secondary" className="bg-white text-red-600">
              {notifications.length} New Notifications
            </Badge>
          )}
        </div>
      </div>

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
              {notifications.slice(0, 3).map((notification) => (
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

      {/* Enhanced KPI Cards with Fraud Detection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Power Theft Cases"
          value={kpiData.powerTheft}
          icon={AlertTriangle}
          trend="up"
          trendValue="3 new today"
          className="kpi-update"
        />
        <KPICard
          title="Fraud Cases Assigned"
          value={fraudData.stats.activeCases}
          icon={Shield}
          trend="up"
          trendValue={`${fraudData.assignedCases.length} active`}
          className="border-l-4 border-l-orange-500"
        />
        <KPICard
          title="Resolution Rate"
          value={`${kpiData.resolutionRate}%`}
          icon={CheckCircle}
          trend="up"
          trendValue="2% this week"
        />
        <KPICard
          title="New Complaints"
          value={complaints.filter(c => c.status === 'Pending').length}
          icon={MessageSquare}
          trend="up"
          trendValue={`${notifications.filter(n => n.type === 'complaint').length} today`}
          className="border-l-4 border-l-blue-500"
        />
      </div>

      {/* High Priority Fraud Cases */}
      {fraudData.highPriorityCases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <ShieldAlert className="h-5 w-5 text-red-600" />
                <span>High Priority Fraud Cases</span>
              </span>
              <Badge variant="destructive" className="animate-pulse">
                {fraudData.highPriorityCases.length} Cases
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fraudData.highPriorityCases.slice(0, 3).map((fraudCase) => (
                <FraudDetectionCard
                  key={fraudCase.id}
                  fraudCase={fraudCase}
                  onInvestigate={handleInvestigateFraud}
                  onViewDetails={handleViewFraudDetails}
                  compact={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Real-time Power Theft Alerts</span>
            <Badge variant="outline" className="text-red-600">Live Feed</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {theftAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'High' ? 'text-red-600' : 
                    alert.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`} />
                  <div>
                    <p className="font-semibold">{alert.location}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={alert.severity === 'High' ? 'destructive' : 'outline'}>
                    {alert.severity}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-red-600" />
            <span>Recent Complaints</span>
            <Badge variant="outline">{assignedComplaints.length} Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignedComplaints.length > 0 ? (
              assignedComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold">{complaint.customerName}</p>
                      <p className="text-sm text-gray-600">{complaint.issue}</p>
                      <p className="text-xs text-gray-500">Complaint ID: {complaint.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={complaint.priority === 'High' ? 'destructive' : 'outline'}>
                      {complaint.priority}
                    </Badge>
                    <span className="text-sm text-gray-600">{complaint.submittedDate}</span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Visit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active complaints assigned</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Fraud Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Assigned Fraud Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fraudData.assignedCases.slice(0, 4).map((fraudCase) => (
              <FraudDetectionCard
                key={fraudCase.id}
                fraudCase={fraudCase}
                onInvestigate={handleInvestigateFraud}
                onViewDetails={handleViewFraudDetails}
              />
            ))}
          </div>
          {fraudData.assignedCases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No fraud cases currently assigned</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteEngineerDashboard;