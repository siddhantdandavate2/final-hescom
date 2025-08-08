import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'consumer' | 'site_engineer' | 'department_head';

export interface User {
  id: string;
  mobile: string;
  name: string;
  role: UserRole;
  zone?: string;
  consumerNumber?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string, otp: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    mobile: '9876543210',
    name: 'Rajesh Kumar',
    role: 'consumer',
    consumerNumber: 'KA001234567890',
    address: 'Jayanagar, Bengaluru, Karnataka'
  },
  {
    id: '2',
    mobile: '9876543211',
    name: 'Priya Sharma',
    role: 'site_engineer',
    zone: 'Mysuru Zone',
    address: 'Vijayanagar, Mysuru, Karnataka'
  },
  {
    id: '3',
    mobile: '9876543212',
    name: 'Dr. Suresh Reddy',
    role: 'department_head',
    zone: 'Karnataka State',
    address: 'Rajajinagar, Bengaluru, Karnataka'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('msefc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (mobile: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock OTP validation (accept 123456 for demo)
    if (otp === '123456') {
      const mockUser = mockUsers.find(u => u.mobile === mobile);
      if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('msefc_user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('msefc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
