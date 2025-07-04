import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Phone, 
  Globe, 
  FileText, 
  Zap,
  Building,
  HelpCircle,
  Download
} from 'lucide-react';

interface LinkCategory {
  title: string;
  icon: React.ReactNode;
  links: {
    name: string;
    url: string;
    description: string;
    type: 'website' | 'phone' | 'document';
  }[];
}

const UsefulLinks = () => {
  const linkCategories: LinkCategory[] = [
    {
      title: "Karnataka Electricity Boards",
      icon: <Zap className="h-6 w-6 text-red-600" />,
      links: [
        {
          name: "BESCOM",
          url: "https://bescom.karnataka.gov.in/",
          description: "Bangalore Electricity Supply Company Limited",
          type: "website"
        },
        {
          name: "HESCOM",
          url: "https://hescom.karnataka.gov.in/",
          description: "Hubli Electricity Supply Company Limited",
          type: "website"
        },
        {
          name: "GESCOM",
          url: "https://gescom.karnataka.gov.in/",
          description: "Gulbarga Electricity Supply Company Limited",
          type: "website"
        },
        {
          name: "MESCOM",
          url: "https://mescom.karnataka.gov.in/",
          description: "Mangalore Electricity Supply Company Limited",
          type: "website"
        },
        {
          name: "CESC",
          url: "https://cesc.karnataka.gov.in/",
          description: "Chamundeshwari Electricity Supply Corporation",
          type: "website"
        }
      ]
    },
    {
      title: "Regulatory Bodies",
      icon: <Building className="h-6 w-6 text-blue-600" />,
      links: [
        {
          name: "KERC",
          url: "https://kerc.karnataka.gov.in/",
          description: "Karnataka Electricity Regulatory Commission",
          type: "website"
        },
        {
          name: "KPTCL",
          url: "https://kptcl.karnataka.gov.in/",
          description: "Karnataka Power Transmission Corporation Limited",
          type: "website"
        },
        {
          name: "KREDL",
          url: "https://kredl.karnataka.gov.in/",
          description: "Karnataka Renewable Energy Development Limited",
          type: "website"
        }
      ]
    },
    {
      title: "Online Services",
      icon: <Globe className="h-6 w-6 text-green-600" />,
      links: [
        {
          name: "Online Bill Payment",
          url: "https://paybill.karnataka.gov.in/",
          description: "Pay electricity bills online",
          type: "website"
        },
        {
          name: "New Connection Portal",
          url: "https://newconnection.karnataka.gov.in/",
          description: "Apply for new electricity connection",
          type: "website"
        },
        {
          name: "Complaint Portal",
          url: "https://complaints.karnataka.gov.in/",
          description: "Register electricity related complaints",
          type: "website"
        },
        {
          name: "Solar Rooftop Portal",
          url: "https://solarrooftop.karnataka.gov.in/",
          description: "Apply for solar rooftop installations",
          type: "website"
        }
      ]
    },
    {
      title: "Emergency Contacts",
      icon: <Phone className="h-6 w-6 text-red-600" />,
      links: [
        {
          name: "Emergency Helpline",
          url: "tel:1912",
          description: "24/7 Electricity Emergency Service",
          type: "phone"
        },
        {
          name: "BESCOM Helpline",
          url: "tel:08022330000",
          description: "BESCOM Customer Care",
          type: "phone"
        },
        {
          name: "HESCOM Helpline",
          url: "tel:08362202745",
          description: "HESCOM Customer Care",
          type: "phone"
        },
        {
          name: "GESCOM Helpline",
          url: "tel:08472263444",
          description: "GESCOM Customer Care",
          type: "phone"
        },
        {
          name: "MESCOM Helpline",
          url: "tel:08242205252",
          description: "MESCOM Customer Care",
          type: "phone"
        }
      ]
    },
    {
      title: "Forms & Documents",
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      links: [
        {
          name: "New Connection Form",
          url: "#",
          description: "Download form for new electricity connection",
          type: "document"
        },
        {
          name: "Load Enhancement Form",
          url: "#",
          description: "Form to increase electricity load",
          type: "document"
        },
        {
          name: "Solar Connection Form",
          url: "#",
          description: "Application form for solar grid connection",
          type: "document"
        },
        {
          name: "Complaint Form",
          url: "#",
          description: "Offline complaint registration form",
          type: "document"
        }
      ]
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="h-6 w-6 text-orange-600" />,
      links: [
        {
          name: "FAQ Portal",
          url: "https://faq.karnataka.gov.in/electricity",
          description: "Frequently Asked Questions",
          type: "website"
        },
        {
          name: "User Manual",
          url: "#",
          description: "Complete guide to using MSEFC portal",
          type: "document"
        },
        {
          name: "Video Tutorials",
          url: "https://youtube.com/karnataka-electricity",
          description: "How-to videos for common tasks",
          type: "website"
        },
        {
          name: "Contact Support",
          url: "mailto:support@hescom.kar.gov.in",
          description: "Email support for technical issues",
          type: "website"
        }
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'document':
        return <Download className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const handleLinkClick = (url: string, type: string) => {
    if (type === 'phone') {
      window.location.href = url;
    } else if (type === 'document') {
      // Handle document download
      console.log('Download document:', url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Useful Links</h1>
        <p className="text-gray-600">Quick access to important electricity-related resources</p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-red-700">Emergency</h3>
            <p className="text-2xl font-bold text-red-600">1912</p>
            <p className="text-sm text-red-600">24/7 Helpline</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-700">Bill Payment</h3>
            <p className="text-sm text-blue-600">Pay Online</p>
            <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
              Pay Now
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-700">New Connection</h3>
            <p className="text-sm text-green-600">Apply Online</p>
            <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
              Apply
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Link Categories */}
      <div className="space-y-6">
        {linkCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {category.icon}
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.links.map((link, linkIndex) => (
                  <div 
                    key={linkIndex}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleLinkClick(link.url, link.type)}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{link.name}</h4>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {getIcon(link.type)}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="p-4 h-auto flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Tariff Schedule</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Globe className="h-6 w-6 mb-2" />
              <span className="text-sm">Load Forecasting</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <Zap className="h-6 w-6 mb-2" />
              <span className="text-sm">Power Quality</span>
            </Button>
            
            <Button variant="outline" className="p-4 h-auto flex-col">
              <HelpCircle className="h-6 w-6 mb-2" />
              <span className="text-sm">Technical Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsefulLinks;