
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users } from 'lucide-react';

const CityPerformanceCard: React.FC = () => {
  const cityPerformance = [
    { city: 'Bengaluru', theft: 25, resolved: 92, efficiency: 95, fraudCases: 8 },
    { city: 'Mysuru', theft: 18, resolved: 88, efficiency: 94, fraudCases: 5 },
    { city: 'Hubli', theft: 15, resolved: 90, efficiency: 92, fraudCases: 3 },
    { city: 'Mangalore', theft: 12, resolved: 85, efficiency: 89, fraudCases: 2 },
    { city: 'Davangere', theft: 10, resolved: 87, efficiency: 91, fraudCases: 1 },
    { city: 'Bellary', theft: 8, resolved: 89, efficiency: 93, fraudCases: 1 },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-red-600" />
          <span>City Performance Ranking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cityPerformance.map((city, index) => (
            <div key={city.city} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{city.city}</h4>
                  <p className="text-sm text-gray-600">{city.theft} theft cases • {city.fraudCases} fraud cases</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{city.resolved}%</p>
                  <p className="text-xs text-gray-600">Resolved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{city.efficiency}%</p>
                  <p className="text-xs text-gray-600">Efficiency</p>
                </div>
                <Progress value={city.efficiency} className="w-20 h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CityPerformanceCard;
