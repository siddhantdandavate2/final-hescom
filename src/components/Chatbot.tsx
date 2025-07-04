
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Camera, 
  Download, 
  CreditCard,
  FileText,
  Phone,
  MapPin,
  Settings,
  User,
  Minimize2,
  Maximize2,
  Upload,
  Calculator,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t('chatbotWelcome'), [
        {
          label: '💳 Pay Bill',
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: '📄 View Bill',
          action: () => handleViewBill(),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📝 Submit Complaint',
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📍 Nearest Office',
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        },
        {
          label: '🧮 Bill Calculator',
          action: () => handleBillCalculator(),
          icon: <Calculator className="h-4 w-4" />
        },
        {
          label: '⚡ Emergency Help',
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    }
  }, [isOpen]);

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, actions?: Message['actions']) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        actions
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('bill') || lowerInput.includes('payment')) {
      if (lowerInput.includes('pay')) {
        addBotMessage('I can help you pay your bill. Here are your options:', [
          {
            label: '💳 Pay Current Bill (₹2,450)',
            action: () => navigate('/pay-bill'),
            icon: <CreditCard className="h-4 w-4" />
          },
          {
            label: '📄 View Bill Details',
            action: () => handleViewBill(),
            icon: <FileText className="h-4 w-4" />
          },
          {
            label: '📥 Download Bill PDF',
            action: () => handleDownloadBill(),
            icon: <Download className="h-4 w-4" />
          },
          {
            label: '🧮 Calculate Usage',
            action: () => handleBillCalculator(),
            icon: <Calculator className="h-4 w-4" />
          }
        ]);
      } else if (lowerInput.includes('view') || lowerInput.includes('show')) {
        handleViewBill();
      } else if (lowerInput.includes('calculate')) {
        handleBillCalculator();
      } else {
        addBotMessage('Your current bill amount is ₹2,450. Due date: Jan 15, 2025. Would you like to pay now?', [
          {
            label: '💳 Pay Now',
            action: () => navigate('/pay-bill'),
            icon: <CreditCard className="h-4 w-4" />
          },
          {
            label: '📄 View Details',
            action: () => handleViewBill(),
            icon: <FileText className="h-4 w-4" />
          }
        ]);
      }
    } else if (lowerInput.includes('complaint') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      addBotMessage('I can help you with complaints. What would you like to do?', [
        {
          label: '📝 Submit New Complaint',
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '🔍 Track Existing Complaint',
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '⚡ Emergency Contact',
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    } else if (lowerInput.includes('meter') || lowerInput.includes('reading')) {
      addBotMessage('Let me help you with meter reading:', [
        {
          label: '📷 Upload Meter Photo',
          action: () => handleCameraCapture(),
          icon: <Camera className="h-4 w-4" />
        },
        {
          label: '✏️ Manual Entry',
          action: () => navigate('/'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📊 View Usage History',
          action: () => navigate('/'),
          icon: <FileText className="h-4 w-4" />
        }
      ]);
    } else if (lowerInput.includes('office') || lowerInput.includes('location')) {
      addBotMessage('Finding nearest offices for you...', [
        {
          label: '📍 View Nearest Offices',
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        },
        {
          label: '⚡ Emergency Contact',
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    } else if (lowerInput.includes('profile') || lowerInput.includes('account')) {
      addBotMessage('Account management options:', [
        {
          label: '👤 View Profile',
          action: () => navigate('/profile'),
          icon: <User className="h-4 w-4" />
        },
        {
          label: '⚙️ Settings',
          action: () => navigate('/settings'),
          icon: <Settings className="h-4 w-4" />
        }
      ]);
    } else if (lowerInput.includes('document') || lowerInput.includes('vault')) {
      addBotMessage('Access your documents:', [
        {
          label: '🗂️ Document Vault',
          action: () => navigate('/documents'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📥 Download Bills',
          action: () => handleDownloadBill(),
          icon: <Download className="h-4 w-4" />
        }
      ]);
    } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
      addBotMessage('Here are all the ways I can help you:', [
        {
          label: '💳 Pay Bills',
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: '📝 Submit Complaint',
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📷 Upload Meter Reading',
          action: () => handleCameraCapture(),
          icon: <Camera className="h-4 w-4" />
        },
        {
          label: '📍 Find Offices',
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        },
        {
          label: '⚡ Emergency Help',
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    } else {
      addBotMessage('I can help you with various services. Choose an option:', [
        {
          label: '💳 Pay Bills',
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: '📝 Submit Complaint',
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: '📷 Upload Meter Reading',
          action: () => handleCameraCapture(),
          icon: <Camera className="h-4 w-4" />
        },
        {
          label: '📍 Find Offices',
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        }
      ]);
    }
  };

  const handleViewBill = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addBotMessage(`Here are your bill details:\n\n💰 Amount: ₹2,450\n📅 Due Date: Jan 15, 2025\n⚡ Units: 640 kWh\n🔢 Consumer ID: ${user?.consumerNumber}\n🏠 Address: ${user?.address || 'Bengaluru, Karnataka'}`, [
        {
          label: '📥 Download PDF',
          action: () => handleDownloadBill(),
          icon: <Download className="h-4 w-4" />
        },
        {
          label: '💳 Pay Now',
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: '📊 View Usage History',
          action: () => navigate('/'),
          icon: <FileText className="h-4 w-4" />
        }
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDownloadBill = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate bill download
      const link = document.createElement('a');
      const billContent = `
MSEFC ELECTRICITY BILL
======================
Consumer Name: ${user?.name}
Consumer Number: ${user?.consumerNumber}
Address: ${user?.address || 'Bengaluru, Karnataka'}

Bill Period: December 2024
Bill Date: Jan 01, 2025
Due Date: Jan 15, 2025

Previous Reading: 1200 kWh
Current Reading: 1840 kWh
Units Consumed: 640 kWh

Charges Breakdown:
- Energy Charges: ₹1,850
- Fixed Charges: ₹200
- Taxes & Duties: ₹400
- Total Amount: ₹2,450

Payment Status: Pending
      `;
      
      const blob = new Blob([billContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `electricity-bill-${user?.consumerNumber}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      
      addBotMessage('✅ Your bill has been downloaded successfully!');
      toast({
        title: "Bill Downloaded",
        description: "Your electricity bill has been saved to your downloads folder.",
      });
      setIsProcessing(false);
    }, 1000);
  };

  const handleBillCalculator = () => {
    addBotMessage('💡 Bill Calculator - Estimate your electricity costs:', [
      {
        label: '🧮 Calculate Bill',
        action: () => {
          const units = prompt('Enter units consumed (kWh):');
          if (units) {
            const amount = parseFloat(units) * 3.5 + 200; // Simple calculation
            addBotMessage(`📊 Estimated Bill for ${units} kWh: ₹${amount.toFixed(2)}\n\nThis includes:\n• Energy Charges: ₹${(parseFloat(units) * 3.5).toFixed(2)}\n• Fixed Charges: ₹200\n• Taxes (approx): ₹${(amount * 0.15).toFixed(2)}`);
          }
        },
        icon: <Calculator className="h-4 w-4" />
      }
    ]);
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsProcessing(true);
        addBotMessage('📷 Meter reading photo captured! Processing...');
        
        setTimeout(() => {
          const randomReading = Math.floor(Math.random() * 1000) + 1500;
          addBotMessage(`✅ Meter reading processed successfully!\n\n📊 Reading: ${randomReading} kWh\n📅 Date: ${new Date().toLocaleDateString()}\n\nThank you for submitting your meter reading!`, [
            {
              label: '📄 View History',
              action: () => navigate('/'),
              icon: <FileText className="h-4 w-4" />
            },
            {
              label: '🧮 Calculate Bill',
              action: () => handleBillCalculator(),
              icon: <Calculator className="h-4 w-4" />
            }
          ]);
          setIsProcessing(false);
          
          toast({
            title: "Meter Reading Submitted",
            description: `Reading of ${randomReading} kWh has been recorded successfully.`,
          });
        }, 2000);
      }
    };
    input.click();
  };

  const handleEmergencyContact = () => {
    addBotMessage('🚨 Emergency Contacts & Help:\n\n📞 Toll Free: 1912\n📞 Helpline: 080-22222222\n📱 WhatsApp: +91-9876543210\n📧 Email: help@msefc.karnataka.gov.in\n\n⚡ For power outages, theft, or urgent issues', [
      {
        label: '📞 Call Now',
        action: () => window.open('tel:1912'),
        icon: <Phone className="h-4 w-4" />
      },
      {
        label: '📱 WhatsApp',
        action: () => window.open('https://wa.me/919876543210'),
        icon: <Phone className="h-4 w-4" />
      }
    ]);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addUserMessage(inputText);
      processUserInput(inputText);
      setInputText('');
    }
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-2xl flex items-center justify-center animate-pulse"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white animate-bounce px-2 py-1">
          AI Assistant
        </Badge>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-96'} ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300 shadow-2xl`}>
      <Card className="h-full flex flex-col border-2 border-red-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">MSEFC Assistant</CardTitle>
                <p className="text-sm opacity-90">AI-Powered Smart Help</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-red-500 p-2 rounded-full"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-red-500 p-2 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    {message.actions && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={action.action}
                            className="w-full justify-start text-sm py-2 px-3 hover:bg-gray-100 transition-colors"
                          >
                            {action.icon}
                            <span className="ml-2">{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {(isTyping || isProcessing) && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {isProcessing ? 'Processing...' : 'Typing...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('chatbotPlaceholder')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-full border-2 border-gray-200 focus:border-red-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className={`rounded-full ${isListening ? 'bg-red-100 border-red-300' : 'hover:bg-gray-100'}`}
                >
                  {isListening ? <MicOff className="h-4 w-4 text-red-600" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;
