
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { karnatakaZones } from '@/data/karnatakaData';

const PerformanceChartsSection: React.FC = () => {
  const monthlyData = [
    { month: 'Jul', theft: 45, resolved: 38, revenue: 2400000, efficiency: 84, fraud: 12 },
    { month: 'Aug', theft: 52, resolved: 45, revenue: 2800000, efficiency: 87, fraud: 15 },
    { month: 'Sep', theft: 38, resolved: 35, revenue: 2200000, efficiency: 92, fraud: 8 },
    { month: 'Oct', theft: 61, resolved: 55, revenue: 3100000, efficiency: 90, fraud: 18 },
    { month: 'Nov', theft: 47, resolved: 42, revenue: 2600000, efficiency: 89, fraud: 11 },
    { month: 'Dec', theft: 42, resolved: 39, revenue: 2850000, efficiency: 93, fraud: 9 },
  ];

  const zoneDistribution = karnatakaZones.map((zone, index) => ({
    name: zone.name,
    value: zone.theftRate,
    color: `hsl(${index * 45}, 70%, 50%)`
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="theft" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} name="Theft Cases" />
              <Area type="monotone" dataKey="resolved" stackId="2" stroke="#16A34A" fill="#16A34A" fillOpacity={0.6} name="Resolved" />
              <Area type="monotone" dataKey="fraud" stackId="3" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Fraud Cases" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Zone Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={zoneDistribution}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              >
                {zoneDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Theft Rate']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChartsSection;
