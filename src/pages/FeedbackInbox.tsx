
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, EyeOff, MessageSquare } from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  consumerId: string;
  subject: string;
  message: string;
  type: string;
  date: string;
  status: 'Read' | 'Unread';
}

const FeedbackInbox = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Load feedback from localStorage (in real app, would fetch from API)
    const storedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    // Add some demo feedback if none exists
    if (storedFeedback.length === 0) {
      const demoFeedback: FeedbackItem[] = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          consumerId: 'HES001',
          subject: 'Billing Issue',
          message: 'I have been charged incorrectly for the last two months. Please review my bill.',
          type: 'Complaint',
          date: '2025-01-15',
          status: 'Unread' as 'Unread'
        },
        {
          id: '2',
          name: 'Priya Sharma',
          consumerId: 'HES002',
          subject: 'Service Appreciation',
          message: 'Thank you for the quick resolution of my power outage issue.',
          type: 'Appreciation',
          date: '2025-01-14',
          status: 'Read' as 'Read'
        },
        {
          id: '3',
          name: 'Suresh Gowda',
          consumerId: 'HES003',
          subject: 'Online Portal Suggestion',
          message: 'It would be great to have a mobile app for bill payments.',
          type: 'Suggestion',
          date: '2025-01-13',
          status: 'Unread' as 'Unread'
        }
      ];
      setFeedback(demoFeedback);
      localStorage.setItem('feedback', JSON.stringify(demoFeedback));
    } else {
      setFeedback(storedFeedback);
    }
  }, []);

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.consumerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleReadStatus = (id: string) => {
    const updatedFeedback = feedback.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Read' ? 'Unread' : 'Read' as 'Read' | 'Unread' }
        : item
    );
    setFeedback(updatedFeedback);
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Complaint': return 'destructive';
      case 'Suggestion': return 'default';
      case 'Query': return 'secondary';
      case 'Appreciation': return 'outline';
      default: return 'default';
    }
  };

  const unreadCount = feedback.filter(item => item.status === 'Unread').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Feedback Inbox</h2>
              <p className="opacity-90">Manage consumer feedback and queries</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-white text-red-600">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{feedback.length}</div>
            <div className="text-sm text-gray-600">Total Feedback</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {feedback.filter(f => f.type === 'Complaint').length}
            </div>
            <div className="text-sm text-gray-600">Complaints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {feedback.filter(f => f.type === 'Appreciation').length}
            </div>
            <div className="text-sm text-gray-600">Appreciations</div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>Consumer Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, subject, or consumer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Complaint">Complaint</SelectItem>
                <SelectItem value="Suggestion">Suggestion</SelectItem>
                <SelectItem value="Query">Query</SelectItem>
                <SelectItem value="Appreciation">Appreciation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Read">Read</SelectItem>
                <SelectItem value="Unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Consumer ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedback.map((item) => (
                  <TableRow key={item.id} className={item.status === 'Unread' ? 'bg-blue-50' : ''}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.consumerId}</TableCell>
                    <TableCell className="max-w-48 truncate">{item.subject}</TableCell>
                    <TableCell className="max-w-64 truncate">{item.message}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(item.type)}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Unread' ? 'default' : 'outline'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadStatus(item.id)}
                      >
                        {item.status === 'Read' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFeedback.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No feedback found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackInbox;
