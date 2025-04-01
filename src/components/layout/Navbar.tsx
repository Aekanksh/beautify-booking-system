
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-salon-primary" />
          <span className="text-xl font-serif font-semibold">Beautify</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-salon-dark hover:text-salon-primary transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-salon-dark hover:text-salon-primary transition-colors">
            Services
          </Link>
          <Link to="/stylists" className="text-salon-dark hover:text-salon-primary transition-colors">
            Our Stylists
          </Link>
          <Link to="/booking" className="text-salon-dark hover:text-salon-primary transition-colors">
            Book Now
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
            <Link to="/client">
              <User className="h-4 w-4" />
              <span>Client Login</span>
            </Link>
          </Button>
          <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90 flex items-center gap-2" asChild>
            <Link to="/booking">
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-salon-dark" />
          ) : (
            <Menu className="h-6 w-6 text-salon-dark" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-6 space-y-3 bg-white border-t mt-4">
          <Link 
            to="/" 
            className="block py-2 text-salon-dark hover:text-salon-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className="block py-2 text-salon-dark hover:text-salon-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/stylists" 
            className="block py-2 text-salon-dark hover:text-salon-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Stylists
          </Link>
          <Link 
            to="/booking" 
            className="block py-2 text-salon-dark hover:text-salon-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Now
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 w-full" asChild>
              <Link to="/client">
                <User className="h-4 w-4" />
                <span>Client Login</span>
              </Link>
            </Button>
            <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90 flex items-center justify-center gap-2 w-full" asChild>
              <Link to="/booking">
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
