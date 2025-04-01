
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Scissors, Clock, Calendar, Award, ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-salon-light to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
                Experience Beauty <br />
                <span className="text-salon-primary">Transformed</span>
              </h1>
              <p className="text-lg text-salon-tertiary max-w-md">
                Book your next appointment at our premium salon and discover a new level of care and style.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-salon-primary hover:bg-salon-primary/90" asChild>
                  <Link to="/booking">Book an Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
                alt="Salon interior" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-semibold mb-4">Why Choose Us</h2>
            <p className="text-salon-tertiary max-w-2xl mx-auto">
              At Beautify, we blend artistry with expertise to deliver exceptional results that exceed your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-salon-light rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Scissors className="h-7 w-7 text-salon-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Expert Stylists</h3>
              <p className="text-salon-tertiary">
                Our team of professional stylists brings years of experience and continuous education to every service.
              </p>
            </div>
            
            <div className="bg-salon-light rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Calendar className="h-7 w-7 text-salon-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Easy Booking</h3>
              <p className="text-salon-tertiary">
                Book appointments with ease using our intuitive online system, available 24/7 for your convenience.
              </p>
            </div>
            
            <div className="bg-salon-light rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Award className="h-7 w-7 text-salon-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Premium Products</h3>
              <p className="text-salon-tertiary">
                We use only the highest quality products to ensure outstanding results and protect the health of your hair.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-4">Featured Services</h2>
              <p className="text-salon-tertiary max-w-2xl">
                Discover our most popular services, crafted to enhance your natural beauty.
              </p>
            </div>
            <Button variant="link" className="text-salon-primary flex items-center" asChild>
              <Link to="/services">
                View All Services
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
                alt="Haircut & Styling" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Haircut & Styling</h3>
              <p className="text-salon-tertiary mb-4">
                Transform your look with a precision cut and professional styling.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-salon-primary">From $35</span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
                alt="Color & Highlights" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Color & Highlights</h3>
              <p className="text-salon-tertiary mb-4">
                Add dimension and vibrancy with our custom color treatments.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-salon-primary">From $65</span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1550172268-9a48af98ac5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
                alt="Special Occasion" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Special Occasion</h3>
              <p className="text-salon-tertiary mb-4">
                Look your best for weddings, proms, and other special events.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-salon-primary">From $80</span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking CTA */}
      <section className="py-16 bg-salon-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-4">Ready for a New Look?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Book your appointment today and let our expert stylists help you look and feel your best.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-salon-primary hover:bg-gray-100" asChild>
            <Link to="/booking">Book an Appointment</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
