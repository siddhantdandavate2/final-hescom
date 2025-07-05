import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Send,
  X
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
  description: string;
  contactNumber: string;
  address: string;
}

const ComplaintTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    issue: '',
    category: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    description: '',
    contactNumber: user?.mobile || '',
    address: user?.address || ''
  });

  useEffect(() => {
    // Load complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Add some demo complaints if none exist
    if (storedComplaints.length === 0) {
      const demoComplaints: Complaint[] = [
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
          area: 'Vijayanagar',
          description: 'Frequent power cuts in our area for the past 3 days. Multiple households affected.',
          contactNumber: '9876543210',
          address: 'Vijayanagar, Mysuru'
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
          area: 'Jayanagar',
          description: 'My electricity bill shows unusually high consumption this month.',
          contactNumber: '9876543211',
          address: 'Jayanagar, Bengaluru'
        }
      ];
      setComplaints(demoComplaints);
      localStorage.setItem('complaints', JSON.stringify(demoComplaints));
    } else {
      setComplaints(storedComplaints);
    }
  }, [user]);

  const filteredComplaints = complaints.filter(complaint => {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newComplaint: Complaint = {
        id: `C${String(Date.now()).slice(-3)}`,
        consumerNumber: user?.consumerNumber || 'N/A',
        customerName: user?.name || 'Anonymous',
        issue: formData.issue,
        category: formData.category,
        priority: formData.priority,
        status: 'Pending',
        submittedDate: new Date().toLocaleDateString(),
        zone: user?.zone || 'Hubli Zone',
        area: 'Hubli Central',
        description: formData.description,
        contactNumber: formData.contactNumber,
        address: formData.address
      };

      // Add to complaints list
      const updatedComplaints = [...complaints, newComplaint];
      setComplaints(updatedComplaints);
      localStorage.setItem('complaints', JSON.stringify(updatedComplaints));

      // Store notification for site engineers and department heads
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: Date.now().toString(),
        type: 'complaint',
        title: 'New Complaint Submitted',
        message: `Complaint ${newComplaint.id}: ${formData.issue}`,
        complaintId: newComplaint.id,
        customerName: user?.name || 'Anonymous',
        priority: formData.priority,
        category: formData.category,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        unread: true,
        targetRoles: ['site_engineer', 'department_head']
      };
      
      existingNotifications.push(newNotification);
      localStorage.setItem('notifications', JSON.stringify(existingNotifications));

      toast({
        title: "Complaint Submitted",
        description: `Your complaint ${newComplaint.id} has been submitted successfully.`,
        duration: 5000,
      });

      // Reset form
      setFormData({
        issue: '',
        category: '',
        priority: 'Medium',
        description: '',
        contactNumber: user?.mobile || '',
        address: user?.address || ''
      });

      setShowNewComplaintForm(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleNewComplaint = () => {
    setShowNewComplaintForm(true);
  };

  const handleUpdateStatus = (complaintId: string, newStatus: string) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus as any }
        : complaint
    );
    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    
    toast({
      title: "Status Updated",
      description: `Complaint ${complaintId} status updated to ${newStatus}`,
    });
  };

  if (showNewComplaintForm) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Complaint</h1>
            <p className="text-gray-600">Submit a new electricity-related complaint</p>
          </div>
          
          <Button onClick={() => setShowNewComplaintForm(false)} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>

        {/* New Complaint Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-red-600" />
              <span>Complaint Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComplaint} className="space-y-6">
              {/* Consumer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user?.name || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="consumerId">Consumer ID</Label>
                  <Input
                    id="consumerId"
                    value={user?.consumerNumber || 'N/A'}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Complaint Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Power Outage">Power Outage</SelectItem>
                      <SelectItem value="Billing">Billing Issue</SelectItem>
                      <SelectItem value="Meter">Meter Problem</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Connection">Connection Issue</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Issue Summary */}
              <div>
                <Label htmlFor="issue">Issue Summary</Label>
                <Input
                  id="issue"
                  placeholder="Brief description of the issue"
                  value={formData.issue}
                  onChange={(e) => handleInputChange('issue', e.target.value)}
                  required
                />
              </div>

              {/* Detailed Description */}
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about the issue..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isSubmitting || !formData.category || !formData.issue || !formData.description}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{complaints.length}</div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {complaints.filter(c => c.status === 'Pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {complaints.filter(c => c.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {complaints.filter(c => c.status === 'Resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
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