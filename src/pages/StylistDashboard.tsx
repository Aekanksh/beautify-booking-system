
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  User, Users, Scissors, Clock, Calendar as CalendarIcon, 
  ChevronLeft, ChevronRight, Check, X 
} from "lucide-react";

// Dummy data for the stylist dashboard
const stylistData = {
  id: 1,
  name: "Emma Johnson",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
  appointments: 24,
  clients: 18,
  rating: 4.8,
};

const appointments = [
  {
    id: 1,
    clientName: "Emily Wilson",
    service: "Women's Haircut, Color",
    date: new Date(2023, 6, 15, 10, 0),
    status: "confirmed",
    duration: 105,
    price: 110,
  },
  {
    id: 3,
    clientName: "Jessica Lee",
    service: "Balayage, Blowout",
    date: new Date(2023, 6, 15, 13, 0),
    status: "pending",
    duration: 150,
    price: 195,
  },
  {
    id: 6,
    clientName: "Laura Miller",
    service: "Hair Trim, Deep Conditioning",
    date: new Date(2023, 6, 17, 11, 0),
    status: "confirmed",
    duration: 75,
    price: 80,
  },
  {
    id: 7,
    clientName: "Rachel Green",
    service: "Full Highlights, Blowout",
    date: new Date(2023, 6, 17, 14, 0),
    status: "confirmed",
    duration: 165,
    price: 165,
  },
  {
    id: 8,
    clientName: "Olivia Park",
    service: "Women's Haircut",
    date: new Date(2023, 6, 18, 9, 0),
    status: "confirmed",
    duration: 45,
    price: 45,
  },
];

const clients = [
  {
    id: 1,
    name: "Emily Wilson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    visits: 5,
    lastVisit: "Jul 15, 2023",
    preferredServices: ["Women's Haircut", "Color"],
  },
  {
    id: 2,
    name: "Jessica Lee",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    visits: 3,
    lastVisit: "Jul 15, 2023",
    preferredServices: ["Balayage", "Blowout"],
  },
  {
    id: 3,
    name: "Laura Miller",
    image: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    visits: 2,
    lastVisit: "Jul 17, 2023",
    preferredServices: ["Hair Trim", "Deep Conditioning"],
  },
  {
    id: 4,
    name: "Rachel Green",
    image: "https://images.unsplash.com/photo-1549351512-c5e12b11e283?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    visits: 1,
    lastVisit: "Jul 17, 2023",
    preferredServices: ["Full Highlights", "Blowout"],
  },
];

const StylistDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' or 'clients'
  
  // Filter appointments for the selected date
  const dailyAppointments = selectedDate 
    ? appointments.filter(app => 
        app.date.getDate() === selectedDate.getDate() && 
        app.date.getMonth() === selectedDate.getMonth() && 
        app.date.getFullYear() === selectedDate.getFullYear()
      ).sort((a, b) => a.date.getTime() - b.date.getTime())
    : [];
  
  // Helper function to calculate total scheduled hours
  const getTotalScheduledHours = () => {
    return appointments.reduce((total, app) => total + app.duration / 60, 0);
  };
  
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-primary py-10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <img 
              src={stylistData.image} 
              alt={stylistData.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-3xl font-serif font-semibold">Welcome, {stylistData.name.split(' ')[0]}</h1>
              <p className="text-white/80 mt-1">
                Your stylist dashboard
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Total Appointments" 
              value={stylistData.appointments} 
              icon={<CalendarIcon className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Total Clients" 
              value={stylistData.clients} 
              icon={<Users className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Scheduled Hours" 
              value={`${getTotalScheduledHours()} hrs`} 
              icon={<Clock className="h-6 w-6 text-salon-primary" />}
            />
            <StatCard 
              title="Rating" 
              value={stylistData.rating} 
              icon={<Scissors className="h-6 w-6 text-salon-primary" />}
            />
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b mb-8">
            <button
              className={`py-2 px-1 font-medium ${activeTab === 'schedule' 
                ? 'text-salon-primary border-b-2 border-salon-primary' 
                : 'text-salon-tertiary hover:text-salon-primary'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule
            </button>
            <button
              className={`py-2 px-1 font-medium ${activeTab === 'clients' 
                ? 'text-salon-primary border-b-2 border-salon-primary' 
                : 'text-salon-tertiary hover:text-salon-primary'
              }`}
              onClick={() => setActiveTab('clients')}
            >
              Clients
            </button>
          </div>
          
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
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
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Legend</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-salon-tertiary">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm text-salon-tertiary">Pending</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium">
                        Your Schedule for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                      </h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => {
                            if (selectedDate) {
                              const newDate = new Date(selectedDate);
                              newDate.setDate(newDate.getDate() - 1);
                              setSelectedDate(newDate);
                            }
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            if (selectedDate) {
                              const newDate = new Date(selectedDate);
                              newDate.setDate(newDate.getDate() + 1);
                              setSelectedDate(newDate);
                            }
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {dailyAppointments.length === 0 ? (
                      <div className="text-center py-16 text-salon-tertiary">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-salon-primary/30" />
                        <h3 className="text-xl font-medium mb-2">No appointments scheduled</h3>
                        <p>Your schedule is clear for this day.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dailyAppointments.map(appointment => (
                          <Card key={appointment.id} className="overflow-hidden">
                            <div className={`w-full h-1 ${
                              appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
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
                                        <span>{appointment.duration} min</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  {appointment.status === 'pending' && (
                                    <>
                                      <Button variant="outline" size="sm" className="border-green-500 hover:bg-green-50 text-green-600">
                                        <Check className="h-4 w-4 mr-1" />
                                        Confirm
                                      </Button>
                                      <Button variant="outline" size="sm" className="border-red-500 hover:bg-red-50 text-red-600">
                                        <X className="h-4 w-4 mr-1" />
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                  {appointment.status === 'confirmed' && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                      Confirmed
                                    </span>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Your Clients</h3>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search clients..." 
                      className="pl-8 pr-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                    />
                    <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-salon-tertiary" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clients.map(client => (
                    <Card key={client.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={client.image} 
                            alt={client.name} 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{client.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="text-sm text-salon-tertiary">
                                <span className="font-medium">{client.visits}</span> visits
                              </div>
                              <div className="text-sm text-salon-tertiary">
                                Last: {client.lastVisit}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {client.preferredServices.map((service, index) => (
                                <span key={index} className="text-xs bg-salon-light px-2 py-1 rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="self-start text-salon-primary"
                          >
                            Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
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

const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default StylistDashboard;
