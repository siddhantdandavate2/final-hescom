
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const RealtimeAlertsCard: React.FC = () => {
  const realtimeAlerts = [
    { id: 1, zone: 'Dharwad North', severity: 'High', message: 'Power theft detected in Sector 12', time: '2 mins ago' },
    { id: 2, zone: 'Hubli East', severity: 'Medium', message: 'Unusual consumption pattern', time: '15 mins ago' },
    { id: 3, zone: 'Hubli Central', severity: 'Low', message: 'Meter reading anomaly', time: '45 mins ago' },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Real-time Alerts</span>
          </div>
          <Badge variant="outline" className="text-red-600 animate-pulse">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {realtimeAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'High' ? 'bg-red-500' : 
                  alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <p className="font-semibold">{alert.zone}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={alert.severity === 'High' ? 'destructive' : 'outline'}>
                  {alert.severity}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeAlertsCard;
