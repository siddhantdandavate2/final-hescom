import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useLocalization } from '@/utils/localization';

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
  const { formatCurrency, formatNumber } = useLocalization();

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
      addBotMessage(t('chatbot.welcome'), [
        {
          label: `💳 ${t('chatbot.payBill')}`,
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: `📄 ${t('chatbot.viewBill')}`,
          action: () => handleViewBill(),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: `📝 ${t('chatbot.submitComplaint')}`,
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: `📍 ${t('chatbot.nearestOffice')}`,
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        },
        {
          label: `🧮 ${t('chatbot.billCalculator')}`,
          action: () => handleBillCalculator(),
          icon: <Calculator className="h-4 w-4" />
        },
        {
          label: `⚡ ${t('chatbot.emergencyHelp')}`,
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    }
  }, [isOpen, t, navigate]);

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
        addBotMessage(`${t('bills.currentBill')}: ${formatCurrency(2450)}`, [
          {
            label: `💳 ${t('bills.payNow')} (${formatCurrency(2450)})`,
            action: () => navigate('/pay-bill'),
            icon: <CreditCard className="h-4 w-4" />
          },
          {
            label: `📄 ${t('bills.viewBill')}`,
            action: () => handleViewBill(),
            icon: <FileText className="h-4 w-4" />
          },
          {
            label: `📥 ${t('bills.downloadBill')}`,
            action: () => handleDownloadBill(),
            icon: <Download className="h-4 w-4" />
          }
        ]);
      } else {
        addBotMessage(`${t('bills.billAmount')}: ${formatCurrency(2450)}\n${t('bills.dueDate')}: Jan 15, 2025\n${t('bills.unitsConsumed')}: ${formatNumber(640)} kWh`, [
          {
            label: `💳 ${t('bills.payNow')}`,
            action: () => navigate('/pay-bill'),
            icon: <CreditCard className="h-4 w-4" />
          },
          {
            label: `📄 ${t('bills.viewBill')}`,
            action: () => handleViewBill(),
            icon: <FileText className="h-4 w-4" />
          }
        ]);
      }
    } else if (lowerInput.includes('complaint') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      addBotMessage(t('complaints.newComplaint'), [
        {
          label: `📝 ${t('complaints.newComplaint')}`,
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: `🔍 ${t('complaints.status')}`,
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: `⚡ ${t('chatbot.emergencyHelp')}`,
          action: () => handleEmergencyContact(),
          icon: <Phone className="h-4 w-4" />
        }
      ]);
    } else {
      addBotMessage(t('chatbot.welcome'), [
        {
          label: `💳 ${t('chatbot.payBill')}`,
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          label: `📝 ${t('chatbot.submitComplaint')}`,
          action: () => navigate('/complaints'),
          icon: <FileText className="h-4 w-4" />
        },
        {
          label: `📍 ${t('chatbot.nearestOffice')}`,
          action: () => navigate('/nearest-office'),
          icon: <MapPin className="h-4 w-4" />
        }
      ]);
    }
  };

  const handleViewBill = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addBotMessage(`${t('bills.billAmount')}: ${formatCurrency(2450)}\n${t('bills.dueDate')}: Jan 15, 2025\n${t('bills.unitsConsumed')}: ${formatNumber(640)} kWh\n${t('profile.address')}: ${user?.address || 'Bengaluru, Karnataka'}`, [
        {
          label: `📥 ${t('bills.downloadBill')}`,
          action: () => handleDownloadBill(),
          icon: <Download className="h-4 w-4" />
        },
        {
          label: `💳 ${t('bills.payNow')}`,
          action: () => navigate('/pay-bill'),
          icon: <CreditCard className="h-4 w-4" />
        }
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDownloadBill = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const billContent = `
MSEFC ELECTRICITY BILL
======================
${t('profile.fullName')}: ${user?.name}
${t('fraud.consumerNumber')}: ${user?.consumerNumber}
${t('profile.address')}: ${user?.address || 'Bengaluru, Karnataka'}

${t('bills.billPeriod')}: December 2024
${t('bills.dueDate')}: Jan 15, 2025

${t('bills.unitsConsumed')}: ${formatNumber(640)} kWh
${t('bills.totalAmount')}: ${formatCurrency(2450)}
      `;
      
      const blob = new Blob([billContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `electricity-bill-${user?.consumerNumber}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      
      addBotMessage(`✅ ${t('bills.downloadBill')} ${t('common.ok')}!`);
      toast({
        title: t('bills.downloadBill'),
        description: t('bills.downloadBill'),
      });
      setIsProcessing(false);
    }, 1000);
  };

  const handleBillCalculator = () => {
    addBotMessage(`💡 ${t('chatbot.billCalculator')}:`, [
      {
        label: `🧮 ${t('chatbot.billCalculator')}`,
        action: () => {
          const units = prompt(`${t('bills.unitsConsumed')} (kWh):`);
          if (units) {
            const amount = parseFloat(units) * 3.5 + 200;
            addBotMessage(`📊 ${t('bills.billAmount')}: ${formatCurrency(amount)}\n${t('bills.unitsConsumed')}: ${formatNumber(parseFloat(units))} kWh`);
          }
        },
        icon: <Calculator className="h-4 w-4" />
      }
    ]);
  };

  const handleEmergencyContact = () => {
    addBotMessage(`🚨 ${t('chatbot.emergencyHelp')}:\n\n📞 Toll Free: 1912\n📞 Helpline: 080-22222222\n📱 WhatsApp: +91-9876543210`, [
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
                        {isProcessing ? t('common.loading') : 'Typing...'}
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
                  placeholder={t('chatbot.placeholder')}
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