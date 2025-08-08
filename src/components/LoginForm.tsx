
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const LoginForm = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowOtp(true);
    setIsLoading(false);
    
    toast({
      title: "OTP Sent",
      description: "Enter 123456 to login (demo)",
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await login(mobile, otp);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid OTP or mobile number",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {currentLanguage === 'kn' ? (
              <img src="/WhatsApp Image 2025-07-04 at 3.04.30 PM.jpeg" alt="HESCOM Logo" className="h-12 w-12" />
            ) : (
              <img src="/WhatsApp Image 2025-07-04 at 3.04.29 PM.jpeg" alt="HESCOM Logo" className="h-12 w-12" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">HESCOM</CardTitle>
          <CardDescription>
            Hubli Electricity Supply Company Limited
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              disabled={showOtp}
            />
          </div>

          {!showOtp ? (
            <Button 
              onClick={handleSendOtp} 
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleLogin} 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Login'}
              </Button>
            </>
          )}

          <div className="text-sm text-gray-600 text-center mt-4">
            <p>Demo Credentials:</p>
            <p>Consumer: 9876543210</p>
            <p>Site Engineer: 9876543211</p>
            <p>Department Head: 9876543212</p>
            <p>OTP: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
