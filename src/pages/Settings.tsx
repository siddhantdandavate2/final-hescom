
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Palette,
  Download,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    billReminders: true,
    language: 'english',
    theme: 'light',
    autoRefresh: true,
    dataUsage: 'normal'
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'kannada', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'hindi', name: 'हिंदी (Hindi)' },
    { code: 'tamil', name: 'தமிழ் (Tamil)' },
    { code: 'telugu', name: 'తెలుగు (Telugu)' },
    { code: 'malayalam', name: 'മലയാളം (Malayalam)' },
    { code: 'marathi', name: 'मराठी (Marathi)' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-red-600" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-600">Browser notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="bill-reminders">Bill Reminders</Label>
                <p className="text-sm text-gray-600">Remind me before due date</p>
              </div>
              <Switch
                id="bill-reminders"
                checked={settings.billReminders}
                onCheckedChange={(checked) => handleSettingChange('billReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-red-600" />
              <span>Language & Region</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Display Language</Label>
              <select 
                id="language"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                defaultValue="asia-kolkata"
              >
                <option value="asia-kolkata">Asia/Kolkata (IST)</option>
                <option value="utc">UTC</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="date-format">Date Format</Label>
              <select 
                id="date-format"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                defaultValue="dd-mm-yyyy"
              >
                <option value="dd-mm-yyyy">DD-MM-YYYY</option>
                <option value="mm-dd-yyyy">MM-DD-YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-red-600" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <select 
                id="theme"
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <p className="text-sm text-gray-600">Automatically refresh data</p>
              </div>
              <Switch
                id="auto-refresh"
                checked={settings.autoRefresh}
                onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="data-usage">Data Usage</Label>
              <select 
                id="data-usage"
                value={settings.dataUsage}
                onChange={(e) => handleSettingChange('dataUsage', e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                <option value="low">Low (Save data)</option>
                <option value="normal">Normal</option>
                <option value="high">High (Best quality)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Change Password</Label>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <Button size="sm" variant="outline">Setup</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-600">Auto logout after inactivity</p>
              </div>
              <select className="px-3 py-1 border rounded text-sm">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Download className="h-6 w-6 mb-2 text-green-600" />
              <span className="font-medium">Export Data</span>
              <span className="text-sm text-gray-600">Download your data</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Trash2 className="h-6 w-6 mb-2 text-red-600" />
              <span className="font-medium">Clear Cache</span>
              <span className="text-sm text-gray-600">Free up storage space</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <HelpCircle className="h-6 w-6 mb-2 text-blue-600" />
              <span className="font-medium">Help & Support</span>
              <span className="text-sm text-gray-600">Get assistance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end">
        <Button className="bg-red-600 hover:bg-red-700">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
