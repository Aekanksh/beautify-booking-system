
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { 
  User, Clock, Calendar as CalendarIcon, 
  Scissors, Star, Phone, Mail, PenSquare, 
  CreditCard, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for the client dashboard
const clientData = {
  id: 1,
  name: "Emily Wilson",
  email: "emily.wilson@example.com",
  phone: "(555) 123-4567",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  appointments: 5,
};

const appointments = [
  {
    id: 1,
    service: "Women's Haircut, Color",
    stylist: "Emma Johnson",
    stylistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    date: new Date(2023, 6, 25, 10, 0),
    status: "upcoming",
    duration: 105,
    price: 110,
  },
  {
    id: 2,
    service: "Balayage, Blowout",
    stylist: "Emma Johnson",
    stylistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    date: new Date(2023, 5, 15, 13, 0),
    status: "completed",
    duration: 150,
    price: 195,
    rating: 5,
  },
  {
    id: 3,
    service: "Hair Trim, Deep Conditioning",
    stylist: "Michael Chen",
    stylistImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    date: new Date(2023, 4, 12, 11, 0),
    status: "completed",
    duration: 75,
    price: 80,
    rating: 4,
  },
  {
    id: 4,
    service: "Women's Haircut",
    stylist: "Sophia Rodriguez",
    stylistImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    date: new Date(2023, 3, 5, 9, 0),
    status: "completed",
    duration: 45,
    price: 45,
    rating: 5,
  },
];

const favoriteServices = [
  { id: 1, name: "Women's Haircut", count: 3 },
  { id: 3, name: "Color", count: 2 },
  { id: 6, name: "Balayage", count: 1 },
];

const ClientPortal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: clientData.name,
    email: clientData.email,
    phone: clientData.phone,
  });
  
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'completed');
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCancelAppointment = (id: number) => {
    toast.success("Appointment cancelled successfully");
  };
  
  const handleRescheduleAppointment = (id: number) => {
    toast.success("Rescheduling request sent");
  };
  
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-primary py-10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <img 
              src={clientData.image} 
              alt={clientData.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-3xl font-serif font-semibold">Welcome, {clientData.name.split(' ')[0]}</h1>
              <p className="text-white/80 mt-1">
                Your client portal at Beautify Salon
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-medium">Upcoming Appointments</h3>
                        <Button className="bg-salon-primary hover:bg-salon-primary/90" asChild>
                          <a href="/booking">Book New</a>
                        </Button>
                      </div>
                      
                      {upcomingAppointments.length === 0 ? (
                        <div className="text-center py-16 text-salon-tertiary">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-salon-primary/30" />
                          <h3 className="text-xl font-medium mb-2">No upcoming appointments</h3>
                          <p className="mb-4">You don't have any appointments scheduled.</p>
                          <Button className="bg-salon-primary hover:bg-salon-primary/90" asChild>
                            <a href="/booking">Book Now</a>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {upcomingAppointments.map(appointment => (
                            <Card key={appointment.id} className="overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-4">
                                    <div className="bg-salon-light p-2 rounded-full">
                                      <CalendarIcon className="h-5 w-5 text-salon-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{appointment.service}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <img 
                                          src={appointment.stylistImage} 
                                          alt={appointment.stylist} 
                                          className="w-5 h-5 rounded-full object-cover"
                                        />
                                        <span className="text-sm">{appointment.stylist}</span>
                                      </div>
                                      <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1 text-xs text-salon-tertiary">
                                          <Clock className="h-3 w-3" />
                                          <span>{format(appointment.date, "h:mm a")}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-salon-tertiary">
                                          <CalendarIcon className="h-3 w-3" />
                                          <span>{format(appointment.date, "MMMM d, yyyy")}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col gap-2">
                                    <div className="text-right mb-2">
                                      <div className="font-medium">${appointment.price}</div>
                                      <div className="text-xs text-salon-tertiary">{appointment.duration} min</div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleRescheduleAppointment(appointment.id)}
                                      >
                                        Reschedule
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="border-red-500 hover:bg-red-50 text-red-600"
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
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
                
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Your Quick Stats</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-salon-light p-2 rounded-full">
                            <CalendarIcon className="h-5 w-5 text-salon-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-salon-tertiary">Total Visits</div>
                            <div className="font-medium">{clientData.appointments}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-salon-light p-2 rounded-full">
                            <Scissors className="h-5 w-5 text-salon-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-salon-tertiary">Favorite Stylist</div>
                            <div className="font-medium">Emma Johnson</div>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <h4 className="text-sm font-medium mb-3">Favorite Services</h4>
                          <div className="space-y-2">
                            {favoriteServices.map(service => (
                              <div key={service.id} className="flex justify-between items-center">
                                <span className="text-sm">{service.name}</span>
                                <span className="text-xs bg-salon-light px-2 py-1 rounded-full">
                                  {service.count} {service.count === 1 ? 'time' : 'times'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button className="w-full bg-salon-primary hover:bg-salon-primary/90" asChild>
                            <a href="/booking">Book Appointment</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-6">Appointment History</h3>
                  
                  {pastAppointments.length === 0 ? (
                    <div className="text-center py-16 text-salon-tertiary">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-salon-primary/30" />
                      <h3 className="text-xl font-medium mb-2">No appointment history</h3>
                      <p>You haven't had any appointments with us yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pastAppointments.map(appointment => (
                        <div key={appointment.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-4">
                              <div className="bg-salon-light p-2 rounded-full">
                                <CalendarIcon className="h-5 w-5 text-salon-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{appointment.service}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <img 
                                    src={appointment.stylistImage} 
                                    alt={appointment.stylist} 
                                    className="w-5 h-5 rounded-full object-cover"
                                  />
                                  <span className="text-sm">{appointment.stylist}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                  <div className="text-xs text-salon-tertiary">
                                    {format(appointment.date, "MMMM d, yyyy")} at {format(appointment.date, "h:mm a")}
                                  </div>
                                </div>
                                
                                {appointment.rating && (
                                  <div className="flex items-center gap-1 mt-3">
                                    {[...Array(5)].map((_, index) => (
                                      <Star 
                                        key={index} 
                                        className={`h-4 w-4 ${
                                          index < appointment.rating! 
                                            ? 'text-yellow-400 fill-yellow-400' 
                                            : 'text-gray-300'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-medium">${appointment.price}</div>
                              <Button 
                                variant="link" 
                                className="text-salon-primary p-0 h-auto text-sm"
                                asChild
                              >
                                <a href="/booking">Book Again</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-medium">Your Profile</h3>
                        {!isEditing && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleEditProfile}
                            className="flex items-center gap-1"
                          >
                            <PenSquare className="h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        {!isEditing ? (
                          <>
                            <div className="flex items-center gap-4">
                              <img 
                                src={clientData.image} 
                                alt={clientData.name} 
                                className="w-24 h-24 rounded-full object-cover"
                              />
                              <div>
                                <h2 className="text-xl font-medium">{profileData.name}</h2>
                                <div className="flex items-center gap-2 mt-1 text-salon-tertiary">
                                  <Mail className="h-4 w-4" />
                                  <span>{profileData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-salon-tertiary">
                                  <Phone className="h-4 w-4" />
                                  <span>{profileData.phone}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="font-medium mb-4">Notification Preferences</h3>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">Email Notifications</div>
                                    <div className="text-sm text-salon-tertiary">
                                      Receive appointment confirmations and reminders
                                    </div>
                                  </div>
                                  <div className="w-12 h-6 bg-salon-primary rounded-full relative">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">SMS Notifications</div>
                                    <div className="text-sm text-salon-tertiary">
                                      Receive text message reminders for appointments
                                    </div>
                                  </div>
                                  <div className="w-12 h-6 bg-salon-primary rounded-full relative">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">Marketing Updates</div>
                                    <div className="text-sm text-salon-tertiary">
                                      Receive special offers and promotions
                                    </div>
                                  </div>
                                  <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="font-medium mb-4">Payment Methods</h3>
                              <div className="flex items-center justify-between border p-4 rounded-md">
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-5 w-5 text-salon-primary" />
                                  <div>
                                    <div className="font-medium">Visa ending in 4242</div>
                                    <div className="text-sm text-salon-tertiary">Expires 12/25</div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  Manage
                                </Button>
                              </div>
                              <Button variant="outline" size="sm" className="mt-4">
                                Add Payment Method
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                              <img 
                                src={clientData.image} 
                                alt={clientData.name} 
                                className="w-24 h-24 rounded-full object-cover"
                              />
                              <Button variant="outline" size="sm">
                                Change Photo
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={profileData.name}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={profileData.email}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="phone" className="block text-sm font-medium">
                                Phone
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                              />
                            </div>
                            
                            <div className="pt-4 flex gap-3">
                              <Button 
                                className="bg-salon-primary hover:bg-salon-primary/90"
                                onClick={handleSaveProfile}
                              >
                                Save Changes
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setIsEditing(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Account Settings</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-between">
                          Change Password
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          Privacy Settings
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          Notification Preferences
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          Payment Methods
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="pt-6 mt-6 border-t">
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                          Log Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default ClientPortal;
