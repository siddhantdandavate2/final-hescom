
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Upload,
  Eye,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: 'Bill' | 'Receipt' | 'Complaint' | 'Connection' | 'Meter Reading';
  date: string;
  size: string;
  status: 'Active' | 'Archived';
  description: string;
}

const DocumentVault = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const documents: Document[] = [
    {
      id: 'DOC001',
      name: 'Electricity Bill - December 2024',
      type: 'Bill',
      date: '2024-12-31',
      size: '245 KB',
      status: 'Active',
      description: 'Monthly electricity bill for December 2024'
    },
    {
      id: 'DOC002',
      name: 'Payment Receipt - Bill #B001',
      type: 'Receipt',
      date: '2024-12-28',
      size: '156 KB',
      status: 'Active',
      description: 'Payment confirmation for December bill'
    },
    {
      id: 'DOC003',
      name: 'Complaint Receipt - C001',
      type: 'Complaint',
      date: '2025-01-01',
      size: '89 KB',
      status: 'Active',
      description: 'Power outage complaint receipt'
    },
    {
      id: 'DOC004',
      name: 'New Connection Certificate',
      type: 'Connection',
      date: '2024-06-15',
      size: '312 KB',
      status: 'Active',
      description: 'Electricity connection approval certificate'
    },
    {
      id: 'DOC005',
      name: 'Meter Reading - November 2024',
      type: 'Meter Reading',
      date: '2024-11-30',
      size: '78 KB',
      status: 'Active',
      description: 'Submitted meter reading for November'
    },
    {
      id: 'DOC006',
      name: 'Electricity Bill - November 2024',
      type: 'Bill',
      date: '2024-11-30',
      size: '234 KB',
      status: 'Archived',
      description: 'Monthly electricity bill for November 2024'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-red-600" />;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Bill': 'bg-blue-100 text-blue-800',
      'Receipt': 'bg-green-100 text-green-800',
      'Complaint': 'bg-red-100 text-red-800',
      'Connection': 'bg-purple-100 text-purple-800',
      'Meter Reading': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
    );
  };

  const handleDownload = (docId: string, docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleView = (docId: string, docName: string) => {
    toast({
      title: "Opening Document",
      description: `Opening ${docName} in viewer...`,
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Document upload functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-600">Manage and access your electricity-related documents</p>
        </div>
        
        <Button onClick={handleUpload} className="bg-red-600 hover:bg-red-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{documents.length}</p>
            <p className="text-sm text-gray-600">Total Documents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{documents.filter(d => d.status === 'Active').length}</p>
            <p className="text-sm text-gray-600">Active Documents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{documents.filter(d => d.type === 'Bill').length}</p>
            <p className="text-sm text-gray-600">Bills</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{documents.filter(d => d.type === 'Receipt').length}</p>
            <p className="text-sm text-gray-600">Receipts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="Bill">Bills</option>
              <option value="Receipt">Receipts</option>
              <option value="Complaint">Complaints</option>
              <option value="Connection">Connections</option>
              <option value="Meter Reading">Meter Readings</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(doc.type)}
                  <div>
                    <CardTitle className="text-lg">{doc.name}</CardTitle>
                    <p className="text-sm text-gray-600">{doc.date}</p>
                  </div>
                </div>
                <Badge variant={doc.status === 'Active' ? 'default' : 'secondary'}>
                  {doc.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {getTypeBadge(doc.type)}
                <span className="text-sm text-gray-500">{doc.size}</span>
              </div>
              
              <p className="text-sm text-gray-600">{doc.description}</p>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleView(doc.id, doc.name)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => handleDownload(doc.id, doc.name)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-4 h-auto flex-col">
              <FileText className="h-8 w-8 mb-2 text-red-600" />
              <span>Download Latest Bill</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Upload className="h-8 w-8 mb-2 text-red-600" />
              <span>Upload Meter Reading</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Download className="h-8 w-8 mb-2 text-red-600" />
              <span>Bulk Download</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVault;
