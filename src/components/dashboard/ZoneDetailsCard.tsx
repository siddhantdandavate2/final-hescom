
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MapPin } from 'lucide-react';
import { karnatakaZones } from '@/data/karnatakaData';

interface ZoneDetailsCardProps {
  selectedZone: string;
}

const ZoneDetailsCard: React.FC<ZoneDetailsCardProps> = ({ selectedZone }) => {
  const zone = karnatakaZones.find(z => z.id === selectedZone);
  
  if (!zone) return null;

  // Replace city names as requested
  const updatedCities = zone.cities.map(city => {
    if (city === 'Bengaluru') return 'Dharwad';
    if (city === 'Mysuru') return 'Hubli';
    return city;
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-red-600" />
          <span>Zone Details - {zone.name.replace('Bengaluru', 'Dharwad').replace('Mysuru', 'Hubli')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {updatedCities.map((city) => (
            <div key={city} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg">{city}</h4>
              <p className="text-sm text-gray-600 mb-2">Active Monitoring</p>
              <Progress value={Math.random() * 100} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(Math.random() * 50) + 50}% Efficiency
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneDetailsCard;
