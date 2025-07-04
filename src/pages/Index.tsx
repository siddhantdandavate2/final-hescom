
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ConsumerDashboard from './ConsumerDashboard';
import SiteEngineerDashboard from './SiteEngineerDashboard';
import DepartmentHeadDashboard from './DepartmentHeadDashboard';

const Index = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'consumer':
        return <ConsumerDashboard />;
      case 'site_engineer':
        return <SiteEngineerDashboard />;
      case 'department_head':
        return <DepartmentHeadDashboard />;
      default:
        return <ConsumerDashboard />;
    }
  };

  return renderDashboard();
};

export default Index;
