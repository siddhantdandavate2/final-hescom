
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation,
  Search,
  Mail
} from 'lucide-react';

interface Office {
  id: string;
  name: string;
  division: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  distance: string;
  services: string[];
  isOpen: boolean;
}

const NearestOffice = () => {
  const [searchLocation, setSearchLocation] = useState('');
  
  const offices: Office[] = [
    {
      id: '1',
      name: 'BESCOM Jayanagar Division',
      division: 'Bengaluru Electricity Supply Company',
      address: '123, 4th Main, Jayanagar 4th Block, Bengaluru - 560011',
      phone: '080-26565656',
      email: 'jayanagar@bescom.co.in',
      timings: '9:00 AM - 6:00 PM (Mon-Sat)',
      distance: '2.5 km',
      services: ['New Connection', 'Bill Payment', 'Complaint Registration', 'Meter Reading'],
      isOpen: true
    },
    {
      id: '2',
      name: 'HESCOM Mysuru Division',
      division: 'Hubli Electricity Supply Company',
      address: '456, Sayyaji Rao Road, Mysuru - 570001',
      phone: '0821-2425252',
      email: 'mysuru@hescom.co.in',
      timings: '9:00 AM - 6:00 PM (Mon-Sat)',
      distance: '5.2 km',
      services: ['New Connection', 'Bill Payment', 'Load Enhancement', 'Solar Connection'],
      isOpen: true
    },
    {
      id: '3',
      name: 'GESCOM Hubli Division',
      division: 'Gulbarga Electricity Supply Company',
      address: '789, Station Road, Hubli - 580020',
      phone: '0836-2345678',
      email: 'hubli@gescom.co.in',
      timings: '9:00 AM - 6:00 PM (Mon-Sat)',
      distance: '8.1 km',
      services: ['Bill Payment', 'Complaint Registration', 'Disconnection/Reconnection'],
      isOpen: false
    },
    {
      id: '4',
      name: 'MESCOM Mangalore Division',
      division: 'Mangalore Electricity Supply Company',
      address: '321, Lalbagh Road, Mangalore - 575001',
      phone: '0824-2987654',
      email: 'mangalore@mescom.co.in',
      timings: '9:00 AM - 6:00 PM (Mon-Sat)',
      distance: '12.3 km',
      services: ['New Connection', 'Bill Payment', 'Complaint Registration', 'Meter Installation'],
      isOpen: true
    }
  ];

  const filteredOffices = offices.filter(office => 
    office.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
    office.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
    office.division.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nearest HESCOM Offices</h1>
        <p className="text-gray-600">Find electricity board offices near you</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by location, office name, or division..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Office List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.map((office) => (
          <Card key={office.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{office.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{office.division}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={office.isOpen ? "default" : "secondary"}>
                    {office.isOpen ? "Open" : "Closed"}
                  </Badge>
                  <Badge variant="outline">{office.distance}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-gray-600">{office.address}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{office.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">{office.email}</p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Timings</p>
                  <p className="text-sm text-gray-600">{office.timings}</p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm font-medium mb-2">Services Available</p>
                <div className="flex flex-wrap gap-2">
                  {office.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Office
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Toll Free</p>
              <p className="text-lg font-bold text-red-600">1912</p>
            </div>
            
            <div className="text-center">
              <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Complaint Helpline</p>
              <p className="text-lg font-bold text-red-600">080-22222222</p>
            </div>
            
            <div className="text-center">
              <Mail className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Email Support</p>
              <p className="text-sm text-red-600">support@hescom.kar.gov.in</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearestOffice;
