import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/utils/localization';

const RevenueAnalyticsCard: React.FC = () => {
  const { t } = useLanguage();
  const { formatCurrency } = useLocalization();
  
  const monthlyData = [
    { month: 'Jul', revenue: 2400000 },
    { month: 'Aug', revenue: 2800000 },
    { month: 'Sep', revenue: 2200000 },
    { month: 'Oct', revenue: 3100000 },
    { month: 'Nov', revenue: 2600000 },
    { month: 'Dec', revenue: 2850000 },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span>{t('dashboard.revenueRecovered')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [formatCurrency(value), t('dashboard.revenueRecovered')]} />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueAnalyticsCard;