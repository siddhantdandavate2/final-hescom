
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  FileText, 
  CreditCard, 
  Folder, 
  Settings, 
  User, 
  LogOut,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  Book,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
  roles: string[];
}

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const currentPath = location.pathname;

  const isCollapsed = state === 'collapsed';
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-red-100 text-red-700 font-medium shadow-md" : "hover:bg-red-50 transition-colors";

  const mainMenuItems: MenuItem[] = [
    { title: "Dashboard", url: '/', icon: Home, roles: ['consumer', 'site_engineer', 'department_head'] },
  ];

  const serviceMenuItems: MenuGroup = {
    title: 'Services',
    roles: ['consumer'],
    items: [
      { title: t('payBill'), url: '/pay-bill', icon: CreditCard, roles: ['consumer'] },
      { title: t('documentVault'), url: '/documents', icon: Folder, roles: ['consumer'] },
      { title: t('solarPumpStatus'), url: '/solar-pump', icon: Settings, roles: ['consumer'] },
    ]
  };

  const supportMenuItems: MenuGroup = {
    title: 'Support & Information',
    roles: ['consumer', 'site_engineer', 'department_head'],
    items: [
      { title: t('nearestOffice'), url: '/nearest-office', icon: MapPin, roles: ['consumer'] },
      { title: t('complaintTracker'), url: '/complaints', icon: FileText, roles: ['consumer', 'site_engineer', 'department_head'] },
      { title: 'Feedback', url: '/feedback', icon: MessageSquare, roles: ['consumer'] },
      { title: 'Feedback Inbox', url: '/feedback-inbox', icon: MessageSquare, roles: ['site_engineer', 'department_head'] },
      { title: t('usefulLinks'), url: '/useful-links', icon: Book, roles: ['consumer'] },
    ]
  };

  const securityMenuItems: MenuGroup = {
    title: 'Security & Monitoring',
    roles: ['site_engineer', 'department_head'],
    items: [
      { title: 'Fraud Detection', url: '/fraud-detection', icon: ShieldAlert, roles: ['site_engineer', 'department_head'] },
      { title: 'Energy Theft', url: '/energy-theft', icon: AlertTriangle, roles: ['site_engineer', 'department_head'] },
    ]
  };

  const accountMenuItems: MenuItem[] = [
    { title: t('profile'), url: '/profile', icon: User, roles: ['consumer', 'site_engineer', 'department_head'] },
    { title: t('settings'), url: '/settings', icon: Settings, roles: ['consumer', 'site_engineer', 'department_head'] },
  ];

  const filteredMainItems = mainMenuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const filteredAccountItems = accountMenuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const shouldShowGroup = (group: MenuGroup) => {
    return user && group.roles.includes(user.role) && group.items.some(item => item.roles.includes(user.role));
  };

  const getFilteredGroupItems = (group: MenuGroup) => {
    return group.items.filter(item => user && item.roles.includes(user.role));
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-gray-100">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              {t('currentLanguage') === 'kn' ? (
                <img src="/WhatsApp Image 2025-07-04 at 3.04.30 PM.jpeg" alt="HESCOM Logo" className="h-8 w-8" />
              ) : (
                <img src="/WhatsApp Image 2025-07-04 at 3.04.29 PM.jpeg" alt="HESCOM Logo" className="h-8 w-8" />
              )}
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-red-700">HESCOM</h2>
                <p className="text-xs text-gray-600">Karnataka</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Services Group */}
        {shouldShowGroup(serviceMenuItems) && (
          <SidebarGroup>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-red-50 rounded px-2 py-1 flex items-center justify-between">
                  <span>{serviceMenuItems.title}</span>
                  {!isCollapsed && <ChevronDown className="h-4 w-4" />}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {getFilteredGroupItems(serviceMenuItems).map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} className={getNavCls}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Support & Information Group */}
        {shouldShowGroup(supportMenuItems) && (
          <SidebarGroup>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-red-50 rounded px-2 py-1 flex items-center justify-between">
                  <span>{supportMenuItems.title}</span>
                  {!isCollapsed && <ChevronDown className="h-4 w-4" />}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {getFilteredGroupItems(supportMenuItems).map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} className={getNavCls}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Security & Monitoring Group */}
        {shouldShowGroup(securityMenuItems) && (
          <SidebarGroup>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-red-50 rounded px-2 py-1 flex items-center justify-between">
                  <span>{securityMenuItems.title}</span>
                  {!isCollapsed && <ChevronDown className="h-4 w-4" />}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {getFilteredGroupItems(securityMenuItems).map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} className={getNavCls}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Account Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredAccountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  {!isCollapsed && <span>{t('logout')}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
