
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  Calculator,
  Phone
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const usageData = [
  { month: 'Jan', units: 420 },
  { month: 'Feb', units: 380 },
  { month: 'Mar', units: 460 },
  { month: 'Apr', units: 520 },
  { month: 'May', units: 580 },
  { month: 'Jun', units: 640 },
];

const ConsumerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome to MSEFC Portal</h2>
        <p className="opacity-90">Manage your electricity connection efficiently</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold">Pay Bill</h3>
            <p className="text-sm text-gray-600">Quick payment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold">Submit Reading</h3>
            <p className="text-sm text-gray-600">Upload meter</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold">Report Issue</h3>
            <p className="text-sm text-gray-600">Lodge complaint</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold">Bill Calculator</h3>
            <p className="text-sm text-gray-600">Estimate usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Bill & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Bill
              <Badge variant="outline" className="text-red-600">Pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Bill Amount:</span>
                <span className="font-bold text-xl">₹2,450</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="text-red-600">15 Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Units Consumed:</span>
                <span>640 kWh</span>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="units" stroke="#DC2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Go Green Initiative</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Join our green energy program and save on your electricity bills.
            </p>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact MSEFC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span>1912 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span>080-22222222</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                WhatsApp Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
