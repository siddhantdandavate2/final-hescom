
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Complaint {
  id: string;
  consumerNumber?: string;
  customerName: string;
  issue: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  submittedDate: string;
  assignedTo?: string;
  zone?: string;
  area: string;
}

const ComplaintTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  
  // Mock complaints data based on user role
  const mockComplaints: Complaint[] = [
    {
      id: 'C001',
      consumerNumber: user?.role === 'consumer' ? user.consumerNumber : 'KA001234567890',
      customerName: user?.role === 'consumer' ? user.name : 'Ramesh Kumar',
      issue: 'Power outage in residential area',
      category: 'Power Outage',
      priority: 'High',
      status: 'In Progress',
      submittedDate: '2025-01-01',
      assignedTo: user?.role === 'department_head' ? 'Priya Sharma' : undefined,
      zone: 'Mysuru Zone',
      area: 'Vijayanagar'
    },
    {
      id: 'C002',
      consumerNumber: user?.role === 'consumer' ? user.consumerNumber : 'KA001234567891',
      customerName: user?.role === 'consumer' ? user.name : 'Lakshmi Devi',
      issue: 'Meter reading discrepancy',
      category: 'Billing',
      priority: 'Medium',
      status: 'Pending',
      submittedDate: '2025-01-02',
      zone: 'Bengaluru Zone',
      area: 'Jayanagar'
    },
    {
      id: 'C003',
      consumerNumber: user?.role === 'consumer' ? user.consumerNumber : 'KA001234567892',
      customerName: user?.role === 'consumer' ? user.name : 'Suresh Gowda',
      issue: 'Street light not working',
      category: 'Infrastructure',
      priority: 'Low',
      status: 'Resolved',
      submittedDate: '2024-12-28',
      zone: 'Hubli Zone',
      area: 'Vidyanagar'
    }
  ];

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    
    // Filter by user role
    if (user?.role === 'consumer') {
      return matchesSearch && matchesStatus && matchesPriority;
    }
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Pending':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Resolved': 'default',
      'In Progress': 'secondary',
      'Pending': 'destructive',
      'Closed': 'outline'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const handleNewComplaint = () => {
    setShowNewComplaintForm(true);
  };

  const handleUpdateStatus = (complaintId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Complaint ${complaintId} status updated to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complaint Tracker</h1>
          <p className="text-gray-600">
            {user?.role === 'consumer' ? 'Track your submitted complaints' : 
             user?.role === 'site_engineer' ? 'Manage assigned complaints' :
             'Monitor all complaints across zones'}
          </p>
        </div>
        
        {user?.role === 'consumer' && (
          <Button onClick={handleNewComplaint} className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            New Complaint
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === 'consumer' ? 'Your Complaints' : 
             user?.role === 'site_engineer' ? 'Assigned Complaints' :
             'All Complaints'}
            <Badge variant="outline" className="ml-2">
              {filteredComplaints.length} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                {user?.role !== 'consumer' && <TableHead>Zone/Area</TableHead>}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.id}</TableCell>
                  <TableCell>{complaint.customerName}</TableCell>
                  <TableCell className="max-w-xs truncate">{complaint.issue}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>
                    <Badge variant={complaint.priority === 'High' ? 'destructive' : 'outline'}>
                      {complaint.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(complaint.status)}
                      {getStatusBadge(complaint.status)}
                    </div>
                  </TableCell>
                  <TableCell>{complaint.submittedDate}</TableCell>
                  {user?.role !== 'consumer' && (
                    <TableCell>
                      <div className="text-sm">
                        <div>{complaint.zone}</div>
                        <div className="text-gray-500">{complaint.area}</div>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {user?.role !== 'consumer' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateStatus(complaint.id, 'In Progress')}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintTracker;
