import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Clock, Globe } from 'lucide-react';
import { karnatakaZones } from '@/data/karnatakaData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/utils/localization';

interface DashboardHeaderProps {
  selectedZone: string;
  selectedView: string;
  onZoneChange: (value: string) => void;
  onViewChange: (value: string) => void;
  onExportReport: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedZone,
  selectedView,
  onZoneChange,
  onViewChange,
  onExportReport
}) => {
  const { t } = useLanguage();
  const { formatDate } = useLocalization();
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">{t('dashboard.departmentHead')}</h2>
          <p className="opacity-90 text-lg">{t('dashboard.stateWideAnalytics')}</p>
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">{t('dashboard.liveData')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {t('dashboard.lastUpdated')}: {formatDate(new Date())}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedZone} onValueChange={onZoneChange}>
            <SelectTrigger className="w-52 bg-white text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-zones"><Globe className="h-4 w-4 mr-2 inline" /> {t('dashboard.allZones')}</SelectItem>
              {karnatakaZones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  📍 {t(`zones.${zone.id}`, zone.name)} ({zone.company})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedView} onValueChange={onViewChange}>
            <SelectTrigger className="w-48 bg-white text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">📊 {t('dashboard.overview')}</SelectItem>
              <SelectItem value="fraud">🛡️ {t('dashboard.fraudAnalytics')}</SelectItem>
              <SelectItem value="forecast">🔮 {t('dashboard.aiForecast')}</SelectItem>
              <SelectItem value="alerts">🚨 {t('dashboard.liveAlerts')}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={onExportReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>{t('common.export')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;