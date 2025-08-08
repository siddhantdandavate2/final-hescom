
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/config/firebase';

const LoginForm = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
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

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (!success) {
      toast({
        title: "Google Login Failed",
        description: "Please try again or use mobile login.",
        variant: "destructive"
      });
    }
  };

  const handleFacebookLogin = async () => {
    const success = await loginWithFacebook();
    if (!success) {
      toast({
        title: "Facebook Login Failed",
        description: "Please try again or use mobile login.",
        variant: "destructive"
      });
    }
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

          <Separator className="my-4" />
          
          {/* Social Login Options */}
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-600">Or continue with</p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleFacebookLogin}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
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
