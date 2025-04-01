
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";

type Service = {
  id: number;
  name: string;
  duration: string;
  price: number;
  category: string;
};

type Stylist = {
  id: number;
  name: string;
  image: string;
  specialties: string[];
};

type TimeSlot = {
  time: string;
  available: boolean;
};

const services: Service[] = [
  { id: 1, name: "Women's Haircut", duration: "45 min", price: 45, category: "hair" },
  { id: 2, name: "Men's Haircut", duration: "30 min", price: 35, category: "hair" },
  { id: 3, name: "Root Touch-Up", duration: "60 min", price: 65, category: "color" },
  { id: 4, name: "Full Color", duration: "90 min", price: 85, category: "color" },
  { id: 5, name: "Partial Highlights", duration: "75 min", price: 90, category: "color" },
  { id: 6, name: "Blowout", duration: "45 min", price: 45, category: "styling" },
  { id: 7, name: "Deep Conditioning", duration: "30 min", price: 35, category: "treatments" },
  { id: 8, name: "Special Occasion Style", duration: "60 min", price: 80, category: "styling" },
];

const stylists: Stylist[] = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Balayage", "Fashion Color", "Precision Cuts"]
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Men's Styling", "Textured Cuts", "Creative Direction"]
  },
  { 
    id: 3, 
    name: "Sophia Rodriguez", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    specialties: ["Bridal Styling", "Updos", "Formal Styling"]
  },
];

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "5:00 PM", available: false },
  { time: "6:00 PM", available: true },
];

type BookingStep = 'service' | 'stylist' | 'date' | 'time' | 'contact' | 'confirmation';

const Booking = () => {
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handleStylistSelect = (stylistId: number) => {
    setSelectedStylist(stylistId);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the booking data to a server
    toast.success("Appointment booked successfully!", {
      description: "You will receive a confirmation email shortly."
    });
    
    // Move to confirmation step
    setStep('confirmation');
  };
  
  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };
  
  const nextStep = () => {
    if (step === 'service' && selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }
    
    if (step === 'stylist' && selectedStylist === null) {
      toast.error("Please select a stylist");
      return;
    }
    
    if (step === 'date' && !selectedDate) {
      toast.error("Please select a date");
      return;
    }
    
    if (step === 'time' && !selectedTime) {
      toast.error("Please select a time");
      return;
    }
    
    const steps: BookingStep[] = ['service', 'stylist', 'date', 'time', 'contact', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };
  
  const prevStep = () => {
    const steps: BookingStep[] = ['service', 'stylist', 'date', 'time', 'contact', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 'service':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-medium">Select Services</h2>
            <p className="text-salon-tertiary">Choose one or more services for your appointment:</p>
            
            <div className="space-y-6 mt-6">
              <h3 className="font-medium">Hair Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'hair').map(service => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    selected={selectedServices.includes(service.id)}
                    onToggle={() => handleServiceToggle(service.id)}
                  />
                ))}
              </div>
              
              <h3 className="font-medium pt-4">Color Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'color').map(service => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    selected={selectedServices.includes(service.id)}
                    onToggle={() => handleServiceToggle(service.id)}
                  />
                ))}
              </div>
              
              <h3 className="font-medium pt-4">Styling & Treatments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'styling' || s.category === 'treatments').map(service => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    selected={selectedServices.includes(service.id)}
                    onToggle={() => handleServiceToggle(service.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'stylist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-medium">Choose Your Stylist</h2>
            <p className="text-salon-tertiary">Select a stylist for your appointment:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {stylists.map(stylist => (
                <div 
                  key={stylist.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedStylist === stylist.id 
                      ? 'border-salon-primary ring-2 ring-salon-primary/20' 
                      : 'hover:border-salon-primary/50'
                  }`}
                  onClick={() => handleStylistSelect(stylist.id)}
                >
                  <div className="relative">
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      className="w-full h-48 object-cover"
                    />
                    {selectedStylist === stylist.id && (
                      <div className="absolute top-2 right-2 bg-salon-primary text-white p-1 rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{stylist.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {stylist.specialties.map((specialty, index) => (
                        <span key={index} className="text-xs bg-salon-light px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-medium">Select a Date</h2>
            <p className="text-salon-tertiary">Choose your preferred appointment date:</p>
            
            <div className="mt-6 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 || // Sunday
                  date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                }
                className="border rounded-lg p-3 pointer-events-auto"
              />
            </div>
          </div>
        );
        
      case 'time':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-medium">Select a Time</h2>
            <p className="text-salon-tertiary">
              Choose your preferred appointment time for {selectedDate && format(selectedDate, "MMMM d, yyyy")}:
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`py-3 px-4 rounded-md text-center transition-colors ${
                    !slot.available 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : selectedTime === slot.time
                      ? 'bg-salon-primary text-white' 
                      : 'bg-white border hover:border-salon-primary'
                  }`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-medium">Your Information</h2>
            <p className="text-salon-tertiary">Please provide your contact details:</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={contactInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={contactInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={contactInfo.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-salon-primary"
                />
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-salon-primary hover:bg-salon-primary/90"
                >
                  Complete Booking
                </Button>
              </div>
            </form>
          </div>
        );
        
      case 'confirmation':
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-serif font-medium">Booking Confirmed!</h2>
            <p className="text-salon-tertiary">
              Thank you for booking with Beautify Salon. A confirmation has been sent to {contactInfo.email}.
            </p>
            
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-medium">Appointment Details</span>
                    <span className="text-salon-primary">#{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-salon-tertiary">Date & Time</h4>
                      <p className="font-medium">
                        {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-salon-tertiary">Stylist</h4>
                      <p className="font-medium">
                        {selectedStylist && stylists.find(s => s.id === selectedStylist)?.name}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-salon-tertiary">Client</h4>
                      <p className="font-medium">
                        {contactInfo.firstName} {contactInfo.lastName}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-salon-tertiary">Contact</h4>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <h4 className="text-sm text-salon-tertiary mb-2">Services</h4>
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return (
                        <div key={serviceId} className="flex justify-between py-1">
                          <span>{service?.name}</span>
                          <span>${service?.price}</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between pt-2 border-t mt-2 font-medium">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="pt-6">
              <Button
                onClick={() => {
                  // Reset form and go back to first step
                  setSelectedServices([]);
                  setSelectedStylist(null);
                  setSelectedDate(undefined);
                  setSelectedTime(null);
                  setContactInfo({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    notes: ''
                  });
                  setStep('service');
                }}
                variant="outline"
              >
                Book Another Appointment
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-light py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-semibold mb-4">Book Your Appointment</h1>
          <p className="text-salon-tertiary max-w-2xl mx-auto">
            Schedule your visit to Beautify Salon in a few simple steps.
          </p>
        </div>
      </section>
      
      {/* Booking Process */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            <ProgressStep 
              number={1} 
              title="Services" 
              active={step === 'service'} 
              completed={['stylist', 'date', 'time', 'contact', 'confirmation'].includes(step)}
            />
            <ProgressStep 
              number={2} 
              title="Stylist" 
              active={step === 'stylist'} 
              completed={['date', 'time', 'contact', 'confirmation'].includes(step)}
            />
            <ProgressStep 
              number={3} 
              title="Date" 
              active={step === 'date'} 
              completed={['time', 'contact', 'confirmation'].includes(step)}
            />
            <ProgressStep 
              number={4} 
              title="Time" 
              active={step === 'time'} 
              completed={['contact', 'confirmation'].includes(step)}
            />
            <ProgressStep 
              number={5} 
              title="Details" 
              active={step === 'contact'} 
              completed={['confirmation'].includes(step)}
            />
          </div>
          
          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons */}
          {step !== 'confirmation' && step !== 'contact' && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 'service'}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="bg-salon-primary hover:bg-salon-primary/90 flex items-center gap-2"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {step === 'contact' && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

interface ProgressStepProps {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}

const ProgressStep = ({ number, title, active, completed }: ProgressStepProps) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          active 
            ? 'bg-salon-primary text-white' 
            : completed 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? <Check className="h-4 w-4" /> : number}
      </div>
      <span className={`text-xs mt-2 ${active ? 'text-salon-primary font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ service, selected, onToggle }: ServiceCardProps) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected ? 'border-salon-primary ring-2 ring-salon-primary/20' : 'hover:border-salon-primary/50'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={selected} 
          onCheckedChange={onToggle}
          className="mt-1 data-[state=checked]:bg-salon-primary data-[state=checked]:text-white"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <h3 className="font-medium">{service.name}</h3>
            <span className="text-salon-primary font-medium">${service.price}</span>
          </div>
          <span className="text-sm text-salon-tertiary">{service.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
