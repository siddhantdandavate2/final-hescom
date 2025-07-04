
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PayBill = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPaymentSuccess(true);
    setIsProcessing(false);
    
    toast({
      title: "Payment Successful",
      description: "Your electricity bill has been paid successfully.",
    });
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Transaction ID: TXN123456789</p>
            <p className="text-gray-600 mb-6">Amount Paid: ₹2,450</p>
            <div className="flex space-x-4 justify-center">
              <Button variant="outline">Download Receipt</Button>
              <Button onClick={() => setPaymentSuccess(false)}>Make Another Payment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pay Your Bill</h1>
        <p className="text-gray-600">Quick and secure payment options</p>
      </div>

      {/* Current Bill */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Bill Details
            <Badge variant="outline" className="text-red-600">Due: 15 Jan 2025</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Consumer Number</Label>
                <p className="font-semibold">KA001234567890</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Bill Period</Label>
                <p className="font-semibold">Dec 2024</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Energy Charges:</span>
                <span>₹1,850</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Fixed Charges:</span>
                <span>₹200</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Taxes & Duties:</span>
                <span>₹400</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-red-600">₹2,450</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* UPI Payment */}
            <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-red-500 bg-red-50' : ''}`}
                 onClick={() => setPaymentMethod('upi')}>
              <div className="flex items-center space-x-3">
                <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                <div>
                  <h3 className="font-semibold">UPI Payment</h3>
                  <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm, etc.</p>
                </div>
              </div>
            </div>

            {/* Card Payment */}
            <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-red-500 bg-red-50' : ''}`}
                 onClick={() => setPaymentMethod('card')}>
              <div className="flex items-center space-x-3">
                <input type="radio" checked={paymentMethod === 'card'} readOnly />
                <div>
                  <h3 className="font-semibold">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
                </div>
              </div>
            </div>

            {/* Net Banking */}
            <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'netbanking' ? 'border-red-500 bg-red-50' : ''}`}
                 onClick={() => setPaymentMethod('netbanking')}>
              <div className="flex items-center space-x-3">
                <input type="radio" checked={paymentMethod === 'netbanking'} readOnly />
                <div>
                  <h3 className="font-semibold">Net Banking</h3>
                  <p className="text-sm text-gray-600">Pay directly from your bank account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'upi' && (
            <div className="mt-6 space-y-4">
              <Label htmlFor="upi-id">Enter UPI ID</Label>
              <Input 
                id="upi-id" 
                placeholder="yourname@paytm / yourname@googlepay" 
                className="text-center"
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" />
                </div>
              </div>
            </div>
          )}

          <Button 
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-lg py-3"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹2,450`}
          </Button>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🔒 Your payment is secured with 256-bit SSL encryption. We never store your payment information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayBill;
