@@ .. @@
   const [formData, setFormData] = useState({
     title: '',
     description: '',
     type: 'Complaint' as TicketType,
     priority: 'Medium' as TicketPriority,
-    customerName: user?.name || '',
-    consumerNumber: user?.consumerNumber || '',
+    customerName: '',
+    consumerNumber: '',
     contactNumber: user?.mobile || '',
     location: user?.address || ''
   });
@@ .. @@
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <Label htmlFor="customerName">Customer Name *</Label>
                   <Input
                     id="customerName"
                     value={formData.customerName}
                     onChange={(e) => handleInputChange('customerName', e.target.value)}
-                    disabled
-                    className="bg-gray-50"
+                    placeholder="Enter your full name"
                     required
                   />
                 </div>
                 <div>
                   <Label htmlFor="consumerNumber">Consumer Number *</Label>
                   <Input
                     id="consumerNumber"
                     value={formData.consumerNumber}
                     onChange={(e) => handleInputChange('consumerNumber', e.target.value)}
-                    disabled
-                    className="bg-gray-50"
+                    placeholder="Enter your consumer number"
                     required
                   />
                 </div>
@@ .. @@
                   <SelectContent>
                     <SelectItem value="Complaint">Complaint</SelectItem>
                     <SelectItem value="Maintenance">Maintenance Request</SelectItem>
+                    <SelectItem value="Energy Theft">Energy Theft Report</SelectItem>
                     <SelectItem value="General Query">General Query</SelectItem>
                   </SelectContent>
@@ .. @@
               {tickets.map((ticket) => (
                 <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-3">
                     <div>
                       <h3 className="font-semibold text-lg">{ticket.title}</h3>
                       <p className="text-sm text-gray-600">Ticket #{ticket.ticketNumber}</p>
                       <p className="text-sm text-gray-600">Customer: {ticket.customerName}</p>
                     </div>
                     <div className="flex flex-col items-end space-y-2">
-                      <Badge variant={getStatusVariant(ticket.status)}>
+                      <Badge variant={getStatusVariant(ticket.status)} className={ticket.status === 'Escalated' ? 'bg-red-600 text-white animate-pulse' : ''}>
                         {ticket.status}
+                        {ticket.status === 'Escalated' && ' ⚠️'}
                       </Badge>
                       <Badge variant={getPriorityVariant(ticket.priority)}>
                         {ticket.priority}
                       </Badge>
+                      {ticketManagement.getSLAStatus && (
+                        <div className="text-right">
+                          {(() => {
+                            const slaStatus = ticketManagement.getSLAStatus(ticket);
+                            return (
+                              <Badge variant={slaStatus.status === 'Breached' ? 'destructive' : slaStatus.status === 'At Risk' ? 'secondary' : 'outline'}>
+                                SLA: {slaStatus.status}
+                              </Badge>
+                            );
+                          })()}
+                        </div>
+                      )}
                     </div>
                   </div>