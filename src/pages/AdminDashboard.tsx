
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { User, Calendar as CalendarIcon, Clock, Users, DollarSign, Scissors, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Dummy data for the admin dashboard
const appointments = [
  {
    id: 1,
    clientName: "Emily Wilson",
    service: "Women's Haircut, Color",
    stylist: "Emma Johnson",
    date: new Date(2023, 6, 15, 10, 0),
    status: "confirmed",
    price: 110,
  },
  {
    id: 2,
    clientName: "Michael Brown",
    service: "Men's Haircut",
    stylist: "Michael Chen",
    date: new Date(2023, 6, 15, 11, 30),
    status: "confirmed",
    price: 35,
  },
  {
    id: 3,
    clientName: "Jessica Lee",
    service: "Balayage, Blowout",
    stylist: "Emma Johnson",
    date: new Date(2023, 6, 15, 13, 0),
    status: "pending",
    price: 195,
  },
  {
    id: 4,
    clientName: "David Rodriguez",
    service: "Beard Trim, Men's Haircut",
    stylist: "Michael Chen",
    date: new Date(2023, 6, 16, 14, 0),
    status: "confirmed",
    price: 55,
  },
  {
    id: 5,
    clientName: "Sarah Thompson",
    service: "Special Occasion Style",
    stylist: "Sophia Rodriguez",
    date: new Date(2023, 6, 16, 16, 0),
    status: "confirmed",
    price: 80,
  },
];

const services = [
  { id: 1, name: "Women's Haircut", duration: "45 min", price: 45, category: "hair" },
  { id: 2, name: "Men's Haircut", duration: "30 min", price: 35, category: "hair" },
  { id: 3, name: "Root Touch-Up", duration: "60 min", price: 65, category: "color" },
  { id: 4, name: "Full Color", duration: "90 min", price: 85, category: "color" },
  { id: 5, name: "Partial Highlights", duration: "75 min", price: 90, category: "color" },
  { id: 6, name: "Blowout", duration: "45 min", price: 45, category: "styling" },
  { id: 7, name: "Deep Conditioning", duration: "30 min", price: 35, category: "treatments" },
  { id: 8, name: "Special Occasion Style", duration: "60 min", price: 80, category: "styling" },
];

const stylists = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Balayage", "Fashion Color", "Precision Cuts"],
    appointments: 24
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Men's Styling", "Textured Cuts", "Creative Direction"],
    appointments: 18
  },
  { 
    id: 3, 
    name: "Sophia Rodriguez", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Bridal Styling", "Updos", "Formal Styling"],
    appointments: 15
  },
];

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  
  const totalRevenue = appointments.reduce((total, app) => total + app.price, 0);
  const totalClients = new Set(appointments.map(app => app.clientName)).size;
  const totalAppointments = appointments.length;
  
  const filteredAppointments = selectedDate 
    ? appointments.filter(app => 
        app.date.getDate() === selectedDate.getDate() && 
        app.date.getMonth() === selectedDate.getMonth() && 
        app.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  const handleEditAppointment = (appointment: any) => {
    setCurrentAppointment(appointment);
    setEditDialogOpen(true);
  };
  
  const handleAppointmentAction = (action: string) => {
    if (action === 'update') {
      toast.success("Appointment updated successfully");
    } else if (action === 'delete') {
      toast.success("Appointment deleted successfully");
    }
    setEditDialogOpen(false);
  };
  
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-primary py-10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-serif font-semibold">Admin Dashboard</h1>
          <p className="text-white/80 mt-2">
            Manage your salon's appointments, services, and staff.
          </p>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Total Appointments" 
              value={totalAppointments} 
              icon={<CalendarIcon className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Total Clients" 
              value={totalClients} 
              icon={<Users className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Active Stylists" 
              value={stylists.length} 
              icon={<Scissors className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${totalRevenue}`} 
              icon={<DollarSign className="h-6 w-6 text-salon-primary" />}
            />
          </div>
          
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="stylists">Stylists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Select Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="border rounded-lg p-3 pointer-events-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">
                          Appointments for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                        </h3>
                        <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90">
                          Add Appointment
                        </Button>
                      </div>
                      
                      {filteredAppointments.length === 0 ? (
                        <div className="text-center py-10 text-salon-tertiary">
                          No appointments scheduled for this date.
                        </div>
                      ) : (
                        <div className="divide-y">
                          {filteredAppointments.map(appointment => (
                            <div key={appointment.id} className="py-4 flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="bg-salon-light p-2 rounded-full">
                                  <User className="h-5 w-5 text-salon-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{appointment.clientName}</h4>
                                  <p className="text-sm text-salon-tertiary">{appointment.service}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1 text-xs text-salon-tertiary">
                                      <Clock className="h-3 w-3" />
                                      <span>{format(appointment.date, "h:mm a")}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-salon-tertiary">
                                      <Scissors className="h-3 w-3" />
                                      <span>{appointment.stylist}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditAppointment(appointment)}
                                >
                                  <Edit className="h-4 w-4 text-salon-tertiary" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Manage Services</h3>
                    <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90">
                      Add Service
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-left">
                        <tr>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Service Name</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Category</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Duration</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Price</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {services.map(service => (
                          <tr key={service.id}>
                            <td className="px-4 py-3">{service.name}</td>
                            <td className="px-4 py-3 capitalize">{service.category}</td>
                            <td className="px-4 py-3">{service.duration}</td>
                            <td className="px-4 py-3">${service.price}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4 text-salon-tertiary" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stylists" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stylists.map(stylist => (
                  <Card key={stylist.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={stylist.image} 
                          alt={stylist.name} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{stylist.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {stylist.specialties.map((specialty, index) => (
                              <span key={index} className="text-xs bg-salon-light px-2 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <div className="text-sm text-salon-tertiary">Appointments</div>
                          <div className="font-medium">{stylist.appointments}</div>
                        </div>
                        <Button variant="outline" size="sm">View Schedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                  <Button variant="outline" className="mb-2">
                    Add New Stylist
                  </Button>
                  <p className="text-sm text-salon-tertiary">
                    Add a new team member to your salon
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Edit Appointment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          
          {currentAppointment && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client Name</label>
                    <input 
                      type="text" 
                      defaultValue={currentAppointment.clientName} 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stylist</label>
                    <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary">
                      {stylists.map(stylist => (
                        <option 
                          key={stylist.id} 
                          value={stylist.name}
                          selected={stylist.name === currentAppointment.stylist}
                        >
                          {stylist.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <input 
                      type="date" 
                      defaultValue={format(currentAppointment.date, "yyyy-MM-dd")} 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <input 
                      type="time" 
                      defaultValue={format(currentAppointment.date, "HH:mm")} 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Services</label>
                  <input 
                    type="text" 
                    defaultValue={currentAppointment.service} 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary">
                    <option value="confirmed" selected={currentAppointment.status === 'confirmed'}>Confirmed</option>
                    <option value="pending" selected={currentAppointment.status === 'pending'}>Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => handleAppointmentAction('delete')}
              className="text-red-500"
            >
              Delete
            </Button>
            <Button 
              className="bg-salon-primary hover:bg-salon-primary/90"
              onClick={() => handleAppointmentAction('update')}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-salon-tertiary">{title}</p>
            <h3 className="text-2xl font-medium mt-1">{value}</h3>
          </div>
          <div className="bg-salon-light p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
