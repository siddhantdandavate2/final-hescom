import { useState, useEffect } from 'react';

interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  customerName: string;
  consumerNumber: string;
  type: 'Complaint' | 'Maintenance' | 'Energy Theft' | 'General Query';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Escalated';
  createdAt: string;
  assignedTo?: string;
  escalatedAt?: string;
  resolutionTime?: number;
  zone: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  attachments?: string[];
}

const mockTickets: Ticket[] = [
  {
    id: 'T001',
    ticketNumber: 'TCKT-2025-0001',
    title: 'Power outage in Sector 7',
    description: 'Complete power failure in residential area',
    customerName: 'Rajesh Kumar',
    consumerNumber: 'HES123456',
    type: 'Complaint',
    priority: 'High',
    status: 'Escalated',
    createdAt: '2025-01-01T10:00:00Z',
    assignedTo: 'Site Engineer 1',
    escalatedAt: '2025-01-01T12:30:00Z',
    zone: 'Hubli-Dharwad'
  },
  {
    id: 'T002',
    ticketNumber: 'TCKT-2025-0002',
    title: 'Billing discrepancy',
    description: 'Incorrect meter reading in monthly bill',
    customerName: 'Priya Sharma',
    consumerNumber: 'HES789012',
    type: 'Complaint',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2025-01-02T09:00:00Z',
    assignedTo: 'Site Engineer 2',
    zone: 'Hubli-Dharwad'
  },
  {
    id: 'T003',
    ticketNumber: 'TCKT-2025-0003',
    title: 'New connection request',
    description: 'Request for new electricity connection',
    customerName: 'Amit Patel',
    consumerNumber: 'HES345678',
    type: 'General Query',
    priority: 'Low',
    status: 'Open',
    createdAt: '2025-01-03T14:00:00Z',
    zone: 'Hubli-Dharwad'
  }
];

export const useTicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : mockTickets;
  });

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const getSLAStatus = (ticket: Ticket) => {
    const createdDate = new Date(ticket.createdAt);
    const now = new Date();
    const diffHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);

    let slaThreshold = 72; // Default SLA for Medium priority (3 days)
    if (ticket.priority === 'High') slaThreshold = 24; // 24 hours
    if (ticket.priority === 'Low') slaThreshold = 168; // 7 days

    if (ticket.status === 'Resolved' || ticket.status === 'Closed') {
      return { status: 'Resolved', percentage: 100, timeRemaining: 0 };
    }

    if (diffHours > slaThreshold) {
      return { 
        status: 'Breached', 
        percentage: 100, 
        timeRemaining: 0,
        isBreached: true 
      };
    } else if (diffHours > slaThreshold * 0.75) {
      return { 
        status: 'At Risk', 
        percentage: (diffHours / slaThreshold) * 100,
        timeRemaining: slaThreshold - diffHours
      };
    } else {
      return { 
        status: 'On Time', 
        percentage: (diffHours / slaThreshold) * 100,
        timeRemaining: slaThreshold - diffHours
      };
    }
  };

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `T${Date.now()}`,
      ticketNumber: `TCKT-2025-${String(tickets.length + 1).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'Open'
    };

    setTickets(prev => [...prev, newTicket]);
    
    // Create notification for Site Engineer and Department Head
    const notification = {
      id: `notif-${Date.now()}`,
      type: 'ticket',
      title: 'New Ticket Submitted',
      message: `${newTicket.customerName} submitted a ${newTicket.priority.toLowerCase()} priority ${newTicket.type.toLowerCase()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ticketId: newTicket.id
    };

    // Add to notifications
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([notification, ...existingNotifications]));

    return newTicket;
  };

  const updateTicketStatus = (id: string, newStatus: Ticket['status'], remarks?: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket => {
        if (ticket.id === id) {
          const updatedTicket = { ...ticket, status: newStatus };
          
          // Check for escalation
          if (newStatus === 'Escalated') {
            updatedTicket.escalatedAt = new Date().toISOString();
            
            // Create escalation notification
            const notification = {
              id: `notif-${Date.now()}`,
              type: 'escalation',
              title: 'Ticket Escalated',
              message: `Ticket ${ticket.ticketNumber} has been escalated due to SLA breach`,
              timestamp: new Date().toISOString(),
              read: false,
              ticketId: ticket.id
            };

            const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
            localStorage.setItem('notifications', JSON.stringify([notification, ...existingNotifications]));
          }

          return updatedTicket;
        }
        return ticket;
      })
    );
  };

  const addFeedback = (ticketId: string, rating: number, comment: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId 
          ? { ...ticket, feedback: { rating, comment } }
          : ticket
      )
    );

    // If rating is low (1-2), notify Department Head
    if (rating <= 2) {
      const notification = {
        id: `notif-${Date.now()}`,
        type: 'feedback',
        title: 'Low Rating Alert',
        message: `Ticket received ${rating} star rating - requires attention`,
        timestamp: new Date().toISOString(),
        read: false,
        ticketId
      };

      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      localStorage.setItem('notifications', JSON.stringify([notification, ...existingNotifications]));
    }
  };

  // Auto-escalation logic
  useEffect(() => {
    const checkForEscalation = () => {
      setTickets(prevTickets =>
        prevTickets.map(ticket => {
          if (ticket.status === 'Open' || ticket.status === 'In Progress') {
            const slaStatus = getSLAStatus(ticket);
            if (slaStatus.isBreached && ticket.status !== 'Escalated') {
              // Auto-escalate
              const escalatedTicket = { 
                ...ticket, 
                status: 'Escalated' as const,
                escalatedAt: new Date().toISOString()
              };

              // Create escalation notification
              const notification = {
                id: `notif-${Date.now()}`,
                type: 'escalation',
                title: 'Auto-Escalated Ticket',
                message: `Ticket ${ticket.ticketNumber} auto-escalated due to SLA breach`,
                timestamp: new Date().toISOString(),
                read: false,
                ticketId: ticket.id
              };

              const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
              localStorage.setItem('notifications', JSON.stringify([notification, ...existingNotifications]));

              return escalatedTicket;
            }
          }
          return ticket;
        })
      );
    };

    // Check every minute for escalations
    const interval = setInterval(checkForEscalation, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTicketsByRole = (role: string, zone?: string) => {
    switch (role) {
      case 'consumer':
        return tickets.filter(ticket => ticket.customerName === userName);
      case 'site_engineer':
        // Site engineers see all tickets from their zone
        return tickets.filter(ticket => 
          ticket.zone === zone || 
          ticket.zone?.includes('Hubli') || 
          ticket.zone?.includes('Dharwad')
        );
      case 'department_head':
        return tickets;
      default:
        return [];
    }
  };

  const getEscalatedTickets = () => {
    return tickets.filter(ticket => ticket.status === 'Escalated');
  };

  const getSLABreachedTickets = () => {
    return tickets.filter(ticket => {
      const slaStatus = getSLAStatus(ticket);
      return slaStatus.isBreached;
    });
  };

  return {
    tickets,
    getSLAStatus,
    createTicket,
    updateTicketStatus,
    addFeedback,
    getTicketsByRole,
    getEscalatedTickets,
    getSLABreachedTickets
  };
};