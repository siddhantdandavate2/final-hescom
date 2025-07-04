
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: 'user@example.com',
    phone: user?.mobile || '',
    address: '123 Main Street, Bengaluru, Karnataka 560001',
    alternatePhone: '+91 9876543211',
    emergencyContact: 'Spouse - +91 9876543212'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: user?.name || '',
      email: 'user@example.com',
      phone: user?.mobile || '',
      address: '123 Main Street, Bengaluru, Karnataka 560001',
      alternatePhone: '+91 9876543211',
      emergencyContact: 'Spouse - +91 9876543212'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'Consumer';
      case 'site_engineer':
        return 'Site Engineer';
      case 'department_head':
        return 'Department Head';
      default:
        return 'User';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'bg-blue-100 text-blue-800';
      case 'site_engineer':
        return 'bg-green-100 text-green-800';
      case 'department_head':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        
        {!isEditing ? (
          <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              {isEditing && (
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <Badge className={`mt-2 ${getRoleBadgeColor(user?.role || '')}`}>
              {getRoleDisplayName(user?.role || '')}
            </Badge>
            
            {user?.zone && (
              <p className="text-sm text-gray-600 mt-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                {user.zone}
              </p>
            )}
            
            {user?.consumerNumber && (
              <p className="text-sm text-gray-600 mt-1">
                Consumer: {user.consumerNumber}
              </p>
            )}
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Member since</p>
              <p className="text-sm font-medium">January 2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.email}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Primary Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.phone}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="altPhone">Alternate Phone</Label>
                {isEditing ? (
                  <Input
                    id="altPhone"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.alternatePhone}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.address}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="emergency">Emergency Contact</Label>
              {isEditing ? (
                <Input
                  id="emergency"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded-md">{formData.emergencyContact}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Account Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Not enabled</p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Login History</p>
                <p className="text-sm text-gray-600">View recent logins</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-gray-600">English</p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-600">Email & SMS enabled</p>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-600">Light mode</p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
