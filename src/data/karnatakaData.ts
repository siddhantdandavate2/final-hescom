
export const karnatakaZones = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    company: 'BESCOM',
    cities: ['Bengaluru', 'Devanahalli', 'Hoskote', 'Nelamangala', 'Doddaballapur'],
    population: 12500000,
    powerDemand: 2800,
    theftRate: 8.5,
    resolutionRate: 92
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    company: 'CHESCOM',
    cities: ['Mysuru', 'Mandya', 'Hassan', 'Chamarajanagar', 'Kodagu'],
    population: 3200000,
    powerDemand: 1200,
    theftRate: 6.2,
    resolutionRate: 89
  },
  {
    id: 'hubli',
    name: 'Hubli-Dharwad',
    company: 'HESCOM',
    cities: ['Hubli', 'Dharwad', 'Gadag', 'Haveri', 'Ranebennur'],
    population: 2800000,
    powerDemand: 950,
    theftRate: 7.8,
    resolutionRate: 87
  },
  {
    id: 'mangalore',
    name: 'Mangalore',
    company: 'MESCOM',
    cities: ['Mangalore', 'Udupi', 'Karwar', 'Sirsi', 'Bhatkal'],
    population: 2100000,
    powerDemand: 780,
    theftRate: 5.4,
    resolutionRate: 94
  },
  {
    id: 'belagavi',
    name: 'Belagavi',
    company: 'HESCOM',
    cities: ['Belagavi', 'Bagalkot', 'Vijayapura', 'Bidar', 'Raichur'],
    population: 4200000,
    powerDemand: 1400,
    theftRate: 9.1,
    resolutionRate: 85
  },
  {
    id: 'gulbarga',
    name: 'Gulbarga',
    company: 'GESCOM',
    cities: ['Gulbarga', 'Bidar', 'Raichur', 'Koppal', 'Yadgir'],
    population: 3800000,
    powerDemand: 1100,
    theftRate: 8.9,
    resolutionRate: 83
  },
  {
    id: 'davangere',
    name: 'Davangere',
    company: 'HESCOM',
    cities: ['Davangere', 'Chitradurga', 'Shivamogga', 'Chikmagalur', 'Tumkur'],
    population: 3500000,
    powerDemand: 1300,
    theftRate: 7.3,
    resolutionRate: 88
  },
  {
    id: 'ballari',
    name: 'Ballari',
    company: 'HESCOM',
    cities: ['Ballari', 'Hospet', 'Sandur', 'Kudligi', 'Harapanahalli'],
    population: 1800000,
    powerDemand: 850,
    theftRate: 8.7,
    resolutionRate: 86
  }
];

export const generateZoneData = (zoneId: string) => {
  const zone = karnatakaZones.find(z => z.id === zoneId);
  if (!zone) return null;

  const baseTheft = Math.round(zone.theftRate * 10);
  const baseResolution = zone.resolutionRate;
  
  return {
    powerTheft: baseTheft + Math.floor(Math.random() * 5) - 2,
    resolutionRate: baseResolution + Math.floor(Math.random() * 6) - 3,
    revenueRecovered: Math.round((zone.powerDemand * 1000) + (Math.random() * 500000)),
    detectionAccuracy: 88 + Math.floor(Math.random() * 10),
    totalComplaints: Math.round(zone.population / 10000) + Math.floor(Math.random() * 20),
    pendingComplaints: Math.floor(Math.random() * 15) + 5,
    lastUpdated: new Date()
  };
};

export const aiForecasting = {
  nextSixMonths: [
    {
      month: 'February 2025',
      zones: karnatakaZones.map(zone => ({
        zone: zone.name,
        predictedTheft: Math.round(zone.theftRate * 8) + Math.floor(Math.random() * 10),
        confidence: 85 + Math.floor(Math.random() * 10),
        threatLevel: zone.theftRate > 8 ? 'High' : zone.theftRate > 6 ? 'Medium' : 'Low',
        recommendation: zone.theftRate > 8 ? 'Increase patrolling' : 'Continue monitoring'
      }))
    },
    {
      month: 'March 2025',
      zones: karnatakaZones.map(zone => ({
        zone: zone.name,
        predictedTheft: Math.round(zone.theftRate * 7.5) + Math.floor(Math.random() * 8),
        confidence: 82 + Math.floor(Math.random() * 12),
        threatLevel: zone.theftRate > 8 ? 'High' : zone.theftRate > 6 ? 'Medium' : 'Low',
        recommendation: 'Implement smart metering'
      }))
    }
  ]
};
