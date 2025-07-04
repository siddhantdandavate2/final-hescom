
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Clock } from 'lucide-react';
import { karnatakaZones } from '@/data/karnatakaData';

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
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Department Head Dashboard</h2>
          <p className="opacity-90 text-lg">State-wide analytics and strategic insights</p>
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedZone} onValueChange={onZoneChange}>
            <SelectTrigger className="w-52 bg-white text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-zones">🌐 All Zones</SelectItem>
              {karnatakaZones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  📍 {zone.name} ({zone.company})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedView} onValueChange={onViewChange}>
            <SelectTrigger className="w-48 bg-white text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">📊 Overview</SelectItem>
              <SelectItem value="fraud">🛡️ Fraud Analytics</SelectItem>
              <SelectItem value="forecast">🔮 AI Forecast</SelectItem>
              <SelectItem value="alerts">🚨 Live Alerts</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={onExportReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
