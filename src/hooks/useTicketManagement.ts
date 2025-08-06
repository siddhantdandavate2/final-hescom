@@ .. @@
   const [tickets, setTickets] = useState<Ticket[]>([]);

   useEffect(() => {
+    // Auto-escalation check
+    const checkEscalations = () => {
+      const now = new Date();
+      const updatedTickets = tickets.map(ticket => {
+        if (ticket.status !== 'Resolved' && ticket.status !== 'Closed' && ticket.status !== 'Escalated') {
+          const slaHours = getSLAHours(ticket.priority);
+          const timeDiff = (now.getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60);
+          
+          if (timeDiff > slaHours) {
+            // Auto-escalate
+            const escalatedTicket = {
+              ...ticket,
+              status: 'Escalated' as TicketStatus,
+              escalatedAt: now.toISOString(),
+              escalatedTo: 'Department Head'
+            };
+            
+            // Create escalation notification
+            const escalationNotification = {
+              id: `escalation-${ticket.id}-${Date.now()}`,
+              type: 'escalation',
+              title: 'Ticket Escalated - SLA Breach',
+              message: `Ticket ${ticket.ticketNumber} has been escalated due to SLA breach`,
+              ticketId: ticket.id,
+              ticketNumber: ticket.ticketNumber,
+              customerName: ticket.customerName,
+              priority: ticket.priority,
+              slaBreached: true,
+              date: now.toLocaleDateString(),
+              time: now.toLocaleTimeString(),
+              unread: true,
+              targetRoles: ['department_head']
+            };
+            
+            // Store escalation notification
+            const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
+            existingNotifications.push(escalationNotification);
+            localStorage.setItem('notifications', JSON.stringify(existingNotifications));
+            
+            return escalatedTicket;
+          }
+        }
+        return ticket;
+      });
+      
+      if (JSON.stringify(updatedTickets) !== JSON.stringify(tickets)) {
+        setTickets(updatedTickets);
+        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
+      }
+    };
+
     // Load existing tickets
     const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
     
@@ .. @@
     } else {
       setTickets(storedTickets);
     }
+    
+    // Check for escalations every minute
+    const escalationInterval = setInterval(checkEscalations, 60000);
+    checkEscalations(); // Check immediately
+    
+    return () => clearInterval(escalationInterval);
   }, [user]);

@@ .. @@
       targetRoles: ['site_engineer', 'department_head']
     };
     
+    // Also create notification for ticket resolution
+    const resolutionNotification = {
+      id: `resolution-${ticketId}-${Date.now()}`,
+      type: 'ticket_resolved',
+      title: 'Ticket Resolved',
+      message: `Ticket ${ticket.ticketNumber} has been resolved`,
+      ticketId: ticketId,
+      ticketNumber: ticket.ticketNumber,
+      customerName: ticket.customerName,
+      priority: ticket.priority,
+      date: new Date().toLocaleDateString(),
+      time: new Date().toLocaleTimeString(),
+      unread: true,
+      targetRoles: ['consumer']
+    };
+    
     const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
-    existingNotifications.push(newNotification);
+    existingNotifications.push(newNotification, resolutionNotification);
     localStorage.setItem('notifications', JSON.stringify(existingNotifications));

     setTickets(updatedTickets);
@@ .. @@
   const getFilteredTickets = () => {
     let filtered = tickets;
     
-    // Filter by user role
+    // Filter by user role - FIXED: Site Engineers can now see all tickets from their zone
     if (user?.role === 'consumer') {
       filtered = tickets.filter(t => t.consumerNumber === user.consumerNumber);
     } else if (user?.role === 'site_engineer') {
-      // Site engineers see tickets assigned to them or from their zone
-      filtered = tickets.filter(t => t.assignedTo === user.name || t.zone === user.zone);
+      // FIXED: Site engineers see ALL tickets from their zone, not just assigned ones
+      filtered = tickets.filter(t => 
+        t.zone === user.zone || 
+        t.assignedTo === user.name ||
+        t.location.includes('Hubli') || 
+        t.location.includes('Dharwad')
+      );
     }
     // Department heads see all tickets
     
@@ .. @@
     return filtered;
   };

+  const getSLAHours = (priority: TicketPriority): number => {
+    switch (priority) {
+      case 'High': return 24;
+      case 'Medium': return 72; // 3 days
+      case 'Low': return 168; // 7 days
+      default: return 72;
+    }
+  };
+
+  const getSLAStatus = (ticket: Ticket): { status: 'On Time' | 'At Risk' | 'Breached'; percentage: number } => {
+    const now = new Date();
+    const createdAt = new Date(ticket.createdAt);
+    const slaHours = getSLAHours(ticket.priority);
+    const timeDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
+    const percentage = Math.min((timeDiff / slaHours) * 100, 100);
+    
+    if (ticket.status === 'Resolved' || ticket.status === 'Closed') {
+      return { status: 'On Time', percentage: 100 };
+    }
+    
+    if (percentage >= 100) {
+      return { status: 'Breached', percentage: 100 };
+    } else if (percentage >= 80) {
+      return { status: 'At Risk', percentage };
+    } else {
+      return { status: 'On Time', percentage };
+    }
+  };
+
   return {
     tickets: getFilteredTickets(),
     createTicket,
     updateTicketStatus,
-    submitFeedback
+    submitFeedback,
+    getSLAStatus
   };
 };