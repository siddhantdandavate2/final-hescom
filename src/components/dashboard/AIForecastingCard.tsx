
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';
import { aiForecasting } from '@/data/karnatakaData';
import { useLanguage } from '@/contexts/LanguageContext';

const AIForecastingCard: React.FC = () => {
  const { t } = useLanguage();
  const forecastData = aiForecasting.nextSixMonths[0].zones;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-red-600" />
          <span>{t('aiForecasting')}</span>
          <Badge variant="outline" className="text-blue-600 bg-blue-50">AI Enhanced</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">6-Month Threat Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastData.slice(0, 9).map((prediction) => (
              <div key={prediction.zone} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg">{prediction.zone}</h4>
                  <Badge variant={prediction.threatLevel === 'High' ? 'destructive' : 
                               prediction.threatLevel === 'Medium' ? 'default' : 'secondary'}>
                    {prediction.threatLevel}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold text-red-600">{prediction.predictedTheft}</p>
                    <p className="text-sm text-gray-600">{t('predictedTheft')}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('confidence')}: {prediction.confidence}%</span>
                    <span className="text-gray-500">Next 6 months</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">
                    💡 {prediction.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIForecastingCard;
