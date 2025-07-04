
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import EnhancedNavbar from './EnhancedNavbar';
import Chatbot from './Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/utils/localization';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { formatDate } = useLocalization();
  const currentLanguage = t('currentLanguage');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <EnhancedNavbar />
        
        <div className="flex flex-1">
          <AppSidebar />
          
          <main className="flex-1 flex flex-col">
            <header className="h-16 flex items-center justify-between border-b bg-white px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-red-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {user?.role === 'consumer' && "Dashboard"}
                    {user?.role === 'site_engineer' && 'Site Engineer Dashboard'}
                    {user?.role === 'department_head' && 'Department Head Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600">{t('welcome')}, {user?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {user?.zone && <span>Zone: {user.zone}</span>}
                  {user?.consumerNumber && <span>Consumer: {user.consumerNumber}</span>}
                </div>
              </div>
            </header>
            
            <div className="flex-1 p-6 overflow-auto">
              {children}
            </div>
          </main>
        </div>
        
        <Chatbot />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
