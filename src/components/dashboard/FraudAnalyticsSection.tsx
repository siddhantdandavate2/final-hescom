
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import FraudDetectionCard from '@/components/FraudDetectionCard';

interface FraudAnalyticsSectionProps {
  fraudData: any;
  onViewFraudDetails: (caseId: string) => void;
}

const FraudAnalyticsSection: React.FC<FraudAnalyticsSectionProps> = ({
  fraudData,
  onViewFraudDetails
}) => {
  const fraudTrendData = [
    { month: 'Jul', detected: 12, resolved: 10, amount: 450000 },
    { month: 'Aug', detected: 15, resolved: 12, amount: 680000 },
    { month: 'Sep', detected: 8, resolved: 8, amount: 320000 },
    { month: 'Oct', detected: 18, resolved: 14, amount: 920000 },
    { month: 'Nov', detected: 11, resolved: 9, amount: 540000 },
    { month: 'Dec', detected: 9, resolved: 8, amount: 380000 },
  ];

  return (
    <>
      {/* Fraud Trend Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span>Fraud Detection Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={fraudTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="detected" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} name="Detected" />
              <Area type="monotone" dataKey="resolved" stackId="2" stroke="#16A34A" fill="#16A34A" fillOpacity={0.6} name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent High Priority Fraud Cases */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <span>High Priority Fraud Cases</span>
            </span>
            <Badge variant="destructive">
              {fraudData.highPriorityCases.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fraudData.highPriorityCases.slice(0, 4).map((fraudCase: any) => (
              <FraudDetectionCard
                key={fraudCase.id}
                fraudCase={fraudCase}
                onViewDetails={onViewFraudDetails}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FraudAnalyticsSection;
