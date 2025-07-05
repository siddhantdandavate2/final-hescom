import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, AlertTriangle, PieChart } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Cell, Tooltip, Legend } from 'recharts';

interface TheftCase {
  caseId: string;
  zone: string;
  consumerId: string;
  amountLost: number;
  recoveryStatus: 'Recovered' | 'Pending' | 'Partial' | 'Legal Action';
  date: string;
}

const EnergyTheft = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const theftCases: TheftCase[] = [
    {
      caseId: 'TH001',
      zone: 'Hubli',
      consumerId: 'HES789',
      amountLost: 120000,
      recoveryStatus: 'Recovered',
      date: 'May 5'
    },
    {
      caseId: 'TH002',
      zone: 'Dharwad',
      consumerId: 'HES321',
      amountLost: 89000,
      recoveryStatus: 'Pending',
      date: 'Jun 2'
    },
    {
      caseId: 'TH003',
      zone: 'Hubli',
      consumerId: 'HES456',
      amountLost: 67000,
      recoveryStatus: 'Partial',
      date: 'Apr 28'
    },
    {
      caseId: 'TH004',
      zone: 'Dharwad',
      consumerId: 'HES123',
      amountLost: 145000,
      recoveryStatus: 'Legal Action',
      date: 'Mar 15'
    }
  ];

  const filteredCases = theftCases.filter(theftCase => {
    const matchesSearch = theftCase.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theftCase.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theftCase.consumerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || theftCase.recoveryStatus === statusFilter;
    const matchesZone = zoneFilter === 'all' || theftCase.zone === zoneFilter;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Recovered': return 'default';
      case 'Pending': return 'secondary';
      case 'Partial': return 'outline';
      case 'Legal Action': return 'destructive';
      default: return 'default';
    }
  };

  // Chart data
  const recoveryData = [
    { name: 'Recovered', value: theftCases.filter(c => c.recoveryStatus === 'Recovered').length, color: '#10b981' },
    { name: 'Pending', value: theftCases.filter(c => c.recoveryStatus === 'Pending').length, color: '#f59e0b' },
    { name: 'Partial', value: theftCases.filter(c => c.recoveryStatus === 'Partial').length, color: '#3b82f6' },
    { name: 'Legal Action', value: theftCases.filter(c => c.recoveryStatus === 'Legal Action').length, color: '#ef4444' }
  ];

  const totalAmount = theftCases.reduce((sum, c) => sum + c.amountLost, 0);
  const recoveredAmount = theftCases
    .filter(c => c.recoveryStatus === 'Recovered')
    .reduce((sum, c) => sum + c.amountLost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Energy Theft Detection</h2>
            <p className="opacity-90">Track and manage energy theft incidents and recovery</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{theftCases.length}</div>
            <div className="text-sm text-gray-600">Total Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₹{(recoveredAmount / 100000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Amount Recovered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">₹{((totalAmount - recoveredAmount) / 100000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Pending Recovery</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{Math.round((recoveredAmount / totalAmount) * 100)}%</div>
            <div className="text-sm text-gray-600">Recovery Rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recovery Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-red-600" />
              <span>Recovery Status Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPie data={recoveryData} innerRadius={40} outerRadius={80}>
                {recoveryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Tooltip />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Energy Theft Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Case ID, Zone, or Consumer ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Recovered">Recovered</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Legal Action">Legal Action</SelectItem>
                </SelectContent>
              </Select>
              <Select value={zoneFilter} onValueChange={setZoneFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="Hubli">Hubli</SelectItem>
                  <SelectItem value="Dharwad">Dharwad</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Consumer ID</TableHead>
                    <TableHead>Amount Lost (₹)</TableHead>
                    <TableHead>Recovery Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((theftCase, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{theftCase.caseId}</TableCell>
                      <TableCell>{theftCase.zone}</TableCell>
                      <TableCell>{theftCase.consumerId}</TableCell>
                      <TableCell>₹{theftCase.amountLost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(theftCase.recoveryStatus)}>
                          {theftCase.recoveryStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{theftCase.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No energy theft cases found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnergyTheft;