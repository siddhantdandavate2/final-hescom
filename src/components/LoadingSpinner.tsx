import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const { currentLanguage } = useLanguage();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4">
            {currentLanguage === 'kn' ? (
              <img src="/WhatsApp Image 2025-07-04 at 3.04.30 PM.jpeg" alt="HESCOM Logo" className="h-full w-full" />
            ) : (
              <img src="/WhatsApp Image 2025-07-04 at 3.04.29 PM.jpeg" alt="HESCOM Logo" className="h-full w-full" />
            )}
          </div>
        </div>
        {message && (
          <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;