import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
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
  X,
  Upload,
  Download,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTicketManagement } from '@/hooks/useTicketManagement';

const TicketManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { tickets, getSLAStatus, createTicket, updateTicketStatus, addFeedback } = useTicketManagement();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  const [formData, setFormData] = useState({
    customerName: '',
    consumerNumber: '',
    title: '',
    description: '',
    type: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low'
  });

  // Filter tickets based on user role
  const getFilteredTickets = () => {
    let roleFilteredTickets = tickets;
    
    if (user?.role === 'consumer') {
      roleFilteredTickets = tickets.filter(ticket => 
        ticket.customerName === user.name || ticket.consumerNumber === user.consumerNumber
      );
    } else if (user?.role === 'site_engineer') {
      roleFilteredTickets = tickets.filter(ticket => 
        ticket.zone?.includes('Hubli') || ticket.zone?.includes('Dharwad') || !ticket.zone
      );
    }
    
    return roleFilteredTickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };

  const filteredTickets = getFilteredTickets();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newTicket = createTicket({
        customerName: formData.customerName,
        consumerNumber: formData.consumerNumber,
        title: formData.title,
        description: formData.description,
        type: formData.type as any,
        priority: formData.priority,
        zone: user?.zone || 'Hubli-Dharwad'
      });

      toast({
        title: "Ticket Created Successfully",
        description: `Ticket ${newTicket.ticketNumber} has been submitted.`,
      });

      // Reset form
      setFormData({
        customerName: '',
        consumerNumber: '',
        title: '',
        description: '',
        type: '',
        priority: 'Medium'
      });

      setShowNewTicketForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ticket. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = (ticketId: string, newStatus: any) => {
    updateTicketStatus(ticketId, newStatus);
    toast({
      title: "Status Updated",
      description: `Ticket status updated to ${newStatus}`,
    });
  };

  const handleSubmitFeedback = () => {
    if (selectedTicket && feedbackRating > 0) {
      addFeedback(selectedTicket.id, feedbackRating, feedbackComment);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      setShowFeedbackForm(false);
      setSelectedTicket(null);
      setFeedbackRating(0);
      setFeedbackComment('');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Open': 'secondary',
      'In Progress': 'default',
      'Resolved': 'outline',
      'Closed': 'outline',
      'Escalated': 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'High': 'destructive',
      'Medium': 'default',
      'Low': 'secondary'
    } as const;
    
    return <Badge variant={variants[priority as keyof typeof variants] || 'outline'}>{priority}</Badge>;
  };

  const getSLABadge = (ticket: any) => {
    const slaStatus = getSLAStatus(ticket);
    
    if (slaStatus.status === 'Breached') {
      return <Badge variant="destructive" className="animate-pulse">SLA Breached</Badge>;
    } else if (slaStatus.status === 'At Risk') {
      return <Badge variant="secondary">At Risk</Badge>;
    } else {
      return <Badge variant="outline">On Time</Badge>;
    }
  };

  if (showNewTicketForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Ticket</h1>
            <p className="text-gray-600">Submit a new support ticket</p>
          </div>
          
          <Button onClick={() => setShowNewTicketForm(false)} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-red-600" />
              <span>Ticket Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="consumerNumber">Consumer Number *</Label>
                  <Input
                    id="consumerNumber"
                    value={formData.consumerNumber}
                    onChange={(e) => handleInputChange('consumerNumber', e.target.value)}
                    placeholder="Enter consumer number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Ticket Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Complaint">Complaint</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Energy Theft">Energy Theft</SelectItem>
                      <SelectItem value="General Query">General Query</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High (24 hours)</SelectItem>
                      <SelectItem value="Medium">Medium (3 days)</SelectItem>
                      <SelectItem value="Low">Low (7 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Ticket Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about the issue..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="attachment">Attachment (Optional)</Label>
                <Input
                  id="attachment"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isSubmitting || !formData.type || !formData.title || !formData.description || !formData.customerName || !formData.consumerNumber}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Ticket...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Ticket
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
          <p className="text-gray-600">
            {user?.role === 'consumer' ? 'Track your submitted tickets' : 
             user?.role === 'site_engineer' ? 'Manage assigned tickets' :
             'Monitor all tickets across zones'}
          </p>
        </div>
        
        {user?.role === 'consumer' && (
          <Button onClick={() => setShowNewTicketForm(true)} className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredTickets.length}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {filteredTickets.filter(t => t.status === 'Open').length}
            </div>
            <div className="text-sm text-gray-600">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredTickets.filter(t => t.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredTickets.filter(t => t.status === 'Resolved').length}
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
                  placeholder="Search tickets..."
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
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
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

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === 'consumer' ? 'Your Tickets' : 
             user?.role === 'site_engineer' ? 'Assigned Tickets' :
             'All Tickets'}
            <Badge variant="outline" className="ml-2">
              {filteredTickets.length} Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const slaStatus = getSLAStatus(ticket);
                return (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                    <TableCell>{ticket.customerName}</TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.title}</TableCell>
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getSLABadge(ticket)}</TableCell>
                    <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user?.role !== 'consumer' && ticket.status !== 'Closed' && (
                          <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleUpdateStatus(ticket.id, 'In Progress')}
                          >
                            Update
                          </Button>
                        )}
                        {user?.role === 'consumer' && ticket.status === 'Resolved' && !ticket.feedback && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowFeedbackForm(true);
                            }}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tickets found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Modal */}
      {showFeedbackForm && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setFeedbackRating(star)}
                      className={feedbackRating >= star ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedbackComment">Comments (Optional)</Label>
                <Textarea
                  id="feedbackComment"
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Share your feedback..."
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitFeedback}
                  disabled={feedbackRating === 0}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;