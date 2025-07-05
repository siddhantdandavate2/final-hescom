import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Eye, Calendar, IndianRupee } from 'lucide-react';
import { FraudCase } from '@/data/fraudDetectionData';

interface FraudDetectionCardProps {
  fraudCase: FraudCase;
  onInvestigate?: (caseId: string) => void;
  onViewDetails?: (caseId: string) => void;
  compact?: boolean;
}

const FraudDetectionCard: React.FC<FraudDetectionCardProps> = ({ 
  fraudCase, 
  onInvestigate, 
  onViewDetails,
  compact = false 
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
        <div className="flex items-center space-x-3">
          <AlertTriangle className={`h-4 w-4 ${
            fraudCase.severity === 'High' ? 'text-red-600' : 
            fraudCase.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
          }`} />
          <div>
            <p className="font-semibold text-sm">{fraudCase.caseNumber}</p>
            <p className="text-xs text-gray-600">{fraudCase.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getSeverityColor(fraudCase.severity)}>
            {fraudCase.severity}
          </Badge>
          <Button size="sm" variant="outline" onClick={() => onViewDetails?.(fraudCase.id)}>
            View
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>{fraudCase.caseNumber}</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Badge className={getSeverityColor(fraudCase.severity)}>
              {fraudCase.severity}
            </Badge>
            <Badge className={getStatusColor(fraudCase.status)}>
              {fraudCase.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">Consumer</p>
              <p className="text-sm">{fraudCase.consumerName}</p>
              <p className="text-xs text-gray-600">{fraudCase.consumerNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Location</p>
              <p className="text-sm">{fraudCase.location}</p>
              <p className="text-xs text-gray-600">{fraudCase.zone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">Fraud Type</p>
              <p className="text-sm">{fraudCase.fraudType}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Detection Method</p>
              <p className="text-sm">{fraudCase.detectionMethod}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Amount Involved</p>
                <p className="text-sm font-bold text-green-600">₹{fraudCase.amountInvolved.toLocaleString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Confidence Score</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${fraudCase.confidenceScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold">{fraudCase.confidenceScore}%</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
            <p className="text-sm text-gray-600">{fraudCase.description}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Last updated: {new Date(fraudCase.lastUpdated).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onViewDetails?.(fraudCase.id)}>
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
              {fraudCase.status === 'Active' && (
                <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => onInvestigate?.(fraudCase.id)}>
                  Investigate
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudDetectionCard;