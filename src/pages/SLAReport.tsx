import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useTicketManagement } from '@/hooks/useTicketManagement';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/utils/localization';

const SLAReport = () => {
  const { user } = useAuth();
  const { tickets, getSLAStatus } = useTicketManagement();
  const { formatPercentage, formatNumber } = useLocalization();
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedZone, setSelectedZone] = useState('all');

  // Filter tickets based on user role
  const getFilteredTickets = () => {
    if (user?.role === 'consumer') {
      return tickets.filter(ticket => 
        ticket.customerName === user.name || ticket.consumerNumber === user.consumerNumber
      );
    } else if (user?.role === 'site_engineer') {
      return tickets.filter(ticket => 
        ticket.zone?.includes('Hubli') || ticket.zone?.includes('Dharwad') || !ticket.zone
      );
    }
    return tickets;
  };

  const filteredTickets = getFilteredTickets();

  // Calculate SLA metrics
  const slaMetrics = {
    totalTickets: filteredTickets.length,
    onTime: filteredTickets.filter(ticket => {
      const slaStatus = getSLAStatus(ticket);
      return slaStatus.status === 'On Time' || slaStatus.status === 'Resolved';
    }).length,
    atRisk: filteredTickets.filter(ticket => {
      const slaStatus = getSLAStatus(ticket);
      return slaStatus.status === 'At Risk';
    }).length,
    breached: filteredTickets.filter(ticket => {
      const slaStatus = getSLAStatus(ticket);
      return slaStatus.status === 'Breached';
    }).length,
    escalated: filteredTickets.filter(ticket => ticket.status === 'Escalated').length
  };

  const slaComplianceRate = slaMetrics.totalTickets > 0 
    ? Math.round((slaMetrics.onTime / slaMetrics.totalTickets) * 100)
    : 0;

  // Priority distribution data
  const priorityData = [
    { 
      name: 'High', 
      value: filteredTickets.filter(t => t.priority === 'High').length,
      color: '#ef4444'
    },
    { 
      name: 'Medium', 
      value: filteredTickets.filter(t => t.priority === 'Medium').length,
      color: '#f59e0b'
    },
    { 
      name: 'Low', 
      value: filteredTickets.filter(t => t.priority === 'Low').length,
      color: '#10b981'
    }
  ];

  // Monthly trend data (mock data for demonstration)
  const monthlyTrendData = [
    { month: 'Jul', compliance: 85, tickets: 45, breached: 7 },
    { month: 'Aug', compliance: 88, tickets: 52, breached: 6 },
    { month: 'Sep', compliance: 92, tickets: 38, breached: 3 },
    { month: 'Oct', compliance: 87, tickets: 61, breached: 8 },
    { month: 'Nov', compliance: 91, tickets: 47, breached: 4 },
    { month: 'Dec', compliance: 89, tickets: 42, breached: 5 }
  ];

  // SLA performance by type
  const typePerformanceData = [
    { type: 'Complaint', compliance: 85, total: filteredTickets.filter(t => t.type === 'Complaint').length },
    { type: 'Maintenance', compliance: 92, total: filteredTickets.filter(t => t.type === 'Maintenance').length },
    { type: 'Energy Theft', compliance: 78, total: filteredTickets.filter(t => t.type === 'Energy Theft').length },
    { type: 'General Query', compliance: 95, total: filteredTickets.filter(t => t.type === 'General Query').length }
  ];

  const exportReport = () => {
    const reportData = {
      period: selectedPeriod,
      zone: selectedZone,
      generatedAt: new Date().toISOString(),
      metrics: slaMetrics,
      complianceRate: slaComplianceRate,
      tickets: filteredTickets.map(ticket => ({
        ticketNumber: ticket.ticketNumber,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        slaStatus: getSLAStatus(ticket).status,
        createdAt: ticket.createdAt
      }))
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sla-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SLA Report</h1>
          <p className="text-gray-600">Service Level Agreement compliance and performance metrics</p>
        </div>
        
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={exportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* SLA Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{formatNumber(slaMetrics.totalTickets)}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{formatNumber(slaMetrics.onTime)}</div>
            <div className="text-sm text-gray-600">On Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{formatNumber(slaMetrics.atRisk)}</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{formatNumber(slaMetrics.breached)}</div>
            <div className="text-sm text-gray-600">Breached</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{formatPercentage(slaComplianceRate)}</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Compliance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <span>SLA Compliance Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number, name: string) => {
                  if (name === 'compliance') return [`${value}%`, 'Compliance Rate'];
                  return [formatNumber(value), name];
                }} />
                <Line type="monotone" dataKey="compliance" stroke="#dc2626" strokeWidth={2} name="compliance" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-red-600" />
              <span>Priority Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Performance by Ticket Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typePerformanceData.map((type) => (
              <div key={type.type} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{type.type}</h4>
                    <p className="text-sm text-gray-600">{formatNumber(type.total)} tickets</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{type.compliance}%</p>
                    <p className="text-sm text-gray-600">Compliance</p>
                  </div>
                  <Progress value={type.compliance} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent SLA Breaches */}
      {slaMetrics.breached > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Recent SLA Breaches</span>
              <Badge variant="destructive">{slaMetrics.breached} Breached</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTickets
                .filter(ticket => getSLAStatus(ticket).status === 'Breached')
                .slice(0, 5)
                .map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-semibold">{ticket.ticketNumber}</p>
                        <p className="text-sm text-gray-600">{ticket.title}</p>
                        <p className="text-xs text-gray-500">Customer: {ticket.customerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">SLA Breached</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SLAReport;