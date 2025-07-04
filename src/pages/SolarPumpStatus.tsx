
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sun, 
  Zap, 
  Droplets, 
  Settings, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SolarPumpApplication {
  id: string;
  farmerName: string;
  surveyNumber: string;
  village: string;
  taluk: string;
  district: string;
  capacity: string;
  status: 'Applied' | 'Under Review' | 'Approved' | 'Installation Pending' | 'Installed' | 'Rejected';
  applicationDate: string;
  expectedCompletion: string;
  progress: number;
  subsidy: string;
  estimatedCost: string;
}

interface SolarPumpStatus {
  id: string;
  pumpId: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  dailyOutput: string;
  monthlyOutput: string;
  lastMaintenance: string;
  nextMaintenance: string;
  efficiency: number;
}

const SolarPumpStatus = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'applications' | 'status' | 'new'>('applications');
  
  const applications: SolarPumpApplication[] = [
    {
      id: 'SPP001',
      farmerName: 'Rajesh Kumar',
      surveyNumber: '123/4A',
      village: 'Kanakapura',
      taluk: 'Kanakapura',
      district: 'Ramanagara',
      capacity: '5 HP',
      status: 'Installed',
      applicationDate: '2024-08-15',
      expectedCompletion: '2024-12-15',
      progress: 100,
      subsidy: '₹85,000',
      estimatedCost: '₹1,25,000'
    },
    {
      id: 'SPP002',
      farmerName: 'Lakshmi Devi',
      surveyNumber: '456/2B',
      village: 'Malur',
      taluk: 'Malur',
      district: 'Kolar',
      capacity: '3 HP',
      status: 'Installation Pending',
      applicationDate: '2024-10-20',
      expectedCompletion: '2025-02-20',
      progress: 75,
      subsidy: '₹65,000',
      estimatedCost: '₹95,000'
    },
    {
      id: 'SPP003',
      farmerName: 'Suresh Gowda',
      surveyNumber: '789/1C',
      village: 'Tumkur',
      taluk: 'Tumkur',
      district: 'Tumkur',
      capacity: '7.5 HP',
      status: 'Under Review',
      applicationDate: '2024-12-01',
      expectedCompletion: '2025-04-01',
      progress: 25,
      subsidy: '₹1,05,000',
      estimatedCost: '₹1,55,000'
    }
  ];

  const pumpStatuses: SolarPumpStatus[] = [
    {
      id: 'SP001',
      pumpId: 'SPP001',
      status: 'Active',
      dailyOutput: '8.5 kWh',
      monthlyOutput: '255 kWh',
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2025-02-15',
      efficiency: 92
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Applied': 'secondary',
      'Under Review': 'secondary',
      'Approved': 'default',
      'Installation Pending': 'secondary',
      'Installed': 'default',
      'Rejected': 'destructive',
      'Active': 'default',
      'Inactive': 'secondary',
      'Maintenance': 'secondary'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Installed':
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Under Review':
      case 'Installation Pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'Rejected':
      case 'Inactive':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleNewApplication = () => {
    setActiveTab('new');
  };

  const handleSubmitApplication = () => {
    toast({
      title: "Application Submitted",
      description: "Your solar pump application has been submitted successfully.",
    });
    setActiveTab('applications');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solar Pump Status</h1>
          <p className="text-gray-600">Track your solar pump applications and monitor installed pumps</p>
        </div>
        
        <Button onClick={handleNewApplication} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button 
          variant={activeTab === 'applications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('applications')}
          className="flex-1"
        >
          Applications
        </Button>
        <Button 
          variant={activeTab === 'status' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('status')}
          className="flex-1"
        >
          Pump Status
        </Button>
        <Button 
          variant={activeTab === 'new' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('new')}
          className="flex-1"
        >
          New Application
        </Button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Application #{app.id}</span>
                      {getStatusIcon(app.status)}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{app.farmerName}</p>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-600">{app.village}, {app.taluk}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-sm text-gray-600">{app.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Subsidy</p>
                    <p className="text-sm text-gray-600">{app.subsidy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Applied Date</p>
                    <p className="text-sm text-gray-600">{app.applicationDate}</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Progress</p>
                    <span className="text-sm text-gray-600">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Track Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pump Status Tab */}
      {activeTab === 'status' && (
        <div className="space-y-4">
          {pumpStatuses.length > 0 ? (
            pumpStatuses.map((pump) => (
              <Card key={pump.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center space-x-2">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <span>Solar Pump #{pump.pumpId}</span>
                    </CardTitle>
                    {getStatusBadge(pump.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Daily Output</p>
                      <p className="text-lg font-bold">{pump.dailyOutput}</p>
                    </div>
                    <div className="text-center">
                      <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Monthly Output</p>
                      <p className="text-lg font-bold">{pump.monthlyOutput}</p>
                    </div>
                    <div className="text-center">
                      <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Efficiency</p>
                      <p className="text-lg font-bold">{pump.efficiency}%</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Last Maintenance</p>
                      <p className="text-sm">{pump.lastMaintenance}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Next Maintenance Due</p>
                    <p className="text-sm text-gray-600">{pump.nextMaintenance}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Sun className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">No Solar Pumps Installed</p>
                <p className="text-sm text-gray-500">Apply for a new solar pump to see status here</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* New Application Tab */}
      {activeTab === 'new' && (
        <Card>
          <CardHeader>
            <CardTitle>New Solar Pump Application</CardTitle>
            <p className="text-sm text-gray-600">Fill in the details to apply for a new solar pump</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmerName">Farmer Name</Label>
                <Input id="farmerName" placeholder="Enter farmer name" />
              </div>
              <div>
                <Label htmlFor="surveyNumber">Survey Number</Label>
                <Input id="surveyNumber" placeholder="Enter survey number" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="village">Village</Label>
                <Input id="village" placeholder="Enter village" />
              </div>
              <div>
                <Label htmlFor="taluk">Taluk</Label>
                <Input id="taluk" placeholder="Enter taluk" />
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input id="district" placeholder="Enter district" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Pump Capacity</Label>
                <select id="capacity" className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select capacity</option>
                  <option value="3 HP">3 HP</option>
                  <option value="5 HP">5 HP</option>
                  <option value="7.5 HP">7.5 HP</option>
                  <option value="10 HP">10 HP</option>
                </select>
              </div>
              <div>
                <Label htmlFor="landArea">Land Area (Acres)</Label>
                <Input id="landArea" placeholder="Enter land area" />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setActiveTab('applications')}>
                Cancel
              </Button>
              <Button onClick={handleSubmitApplication} className="bg-red-600 hover:bg-red-700">
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SolarPumpStatus;
