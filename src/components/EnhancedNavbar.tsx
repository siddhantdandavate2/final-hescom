import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  LogOut, 
  Globe,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/utils/localization';

const EnhancedNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastUpdate] = useState(new Date());
  const { currentLanguage, changeLanguage, t, languages } = useLanguage();
  const { user, logout } = useAuth();
  const { formatDate } = useLocalization();

  const notifications = [
    { 
      id: 1, 
      type: 'bill', 
      title: t('notifications.billDue'), 
      message: t('bills.billAmount') + ': ₹2,450', 
      time: '2 hours ago', 
      unread: true 
    },
    { 
      id: 2, 
      type: 'complaint', 
      title: t('notifications.complaintResolved'), 
      message: t('complaints.complaintId') + ': #C001', 
      time: '1 day ago', 
      unread: true 
    },
    { 
      id: 3, 
      type: 'system', 
      title: t('notifications.systemMaintenance'), 
      message: formatDate(new Date('2025-01-20')), 
      time: '2 days ago', 
      unread: false 
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getLanguageFlag = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    return language?.flag || '🇮🇳';
  };

  const getLanguageName = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    return language?.name || 'English';
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                {currentLanguage === 'kn' ? (
                  <img src="/WhatsApp Image 2025-07-04 at 3.04.30 PM.jpeg" alt="HESCOM Logo" className="h-8 w-8" />
                ) : (
                  <img src="/WhatsApp Image 2025-07-04 at 3.04.29 PM.jpeg" alt="HESCOM Logo" className="h-8 w-8" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold">HESCOM</h1>
                <p className="text-xs opacity-90">Hubli Electricity Supply Company</p>
              </div>
            </div>
          </div>

          {/* Center - Live Updates */}
          <div className="hidden md:flex items-center space-x-4 bg-red-500/30 px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">{t('dashboard.liveData')}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <Clock className="h-3 w-3" />
              <span>{formatDate(lastUpdate, { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{getLanguageFlag(currentLanguage)}</span>
                    <span className="text-sm truncate">{getLanguageName(currentLanguage).split(' ')[0]}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 max-h-60 overflow-y-auto">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="flex items-center space-x-2">
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white hover:bg-white/20 relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs min-w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{t('notifications.notifications')}</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <Button variant="ghost" size="sm" className="w-full text-center">
                      {t('common.view')} {t('notifications.notifications')}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <span className="text-sm hidden md:block">{user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-white hover:bg-white/20"
                title={t('navigation.logout')}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;