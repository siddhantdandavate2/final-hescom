
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, ShieldAlert } from 'lucide-react';

interface FraudCase {
  consumerId: string;
  location: string;
  fraudType: string;
  date: string;
  status: 'Investigating' | 'Confirmed' | 'Legal' | 'Resolved';
  severity: 'High' | 'Medium' | 'Low';
  remarks: string;
}

const FraudDetection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const fraudCases: FraudCase[] = [
    {
      consumerId: 'HES001',
      location: 'Hubli',
      fraudType: 'Meter Bypass',
      date: '01-Jun-2025',
      status: 'Investigating',
      severity: 'High',
      remarks: 'Field visit required'
    },
    {
      consumerId: 'HES002',
      location: 'Dharwad',
      fraudType: 'False Reading',
      date: '04-Jun-2025',
      status: 'Confirmed',
      severity: 'Medium',
      remarks: 'Amount recovered'
    },
    {
      consumerId: 'HES003',
      location: 'Hubli',
      fraudType: 'Illegal Connection',
      date: '15-May-2025',
      status: 'Legal',
      severity: 'High',
      remarks: 'Case filed in court'
    },
    {
      consumerId: 'HES004',
      location: 'Dharwad',
      fraudType: 'Meter Tampering',
      date: '28-May-2025',
      status: 'Resolved',
      severity: 'Low',
      remarks: 'Fine collected'
    }
  ];

  const filteredCases = fraudCases.filter(fraudCase => {
    const matchesSearch = fraudCase.consumerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fraudCase.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fraudCase.fraudType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fraudCase.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || fraudCase.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'default';
      case 'Investigating': return 'secondary';
      case 'Legal': return 'destructive';
      case 'Resolved': return 'outline';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Fraud Detection</h2>
            <p className="opacity-90">Monitor and investigate fraud cases across all zones</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Cases Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Consumer ID, Location, or Type..."
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
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Hubli">Hubli</SelectItem>
                <SelectItem value="Dharwad">Dharwad</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Cases Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consumer ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type of Fraud</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((fraudCase, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{fraudCase.consumerId}</TableCell>
                    <TableCell>{fraudCase.location}</TableCell>
                    <TableCell>{fraudCase.fraudType}</TableCell>
                    <TableCell>{fraudCase.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(fraudCase.status)}>
                        {fraudCase.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(fraudCase.severity)}`}>
                        {fraudCase.severity}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-48 truncate">{fraudCase.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ShieldAlert className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No fraud cases found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetection;
