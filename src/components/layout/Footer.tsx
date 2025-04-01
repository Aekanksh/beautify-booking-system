import { Link } from "react-router-dom";
import { Scissors, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scissors className="h-6 w-6 text-salon-primary" />
              <span className="text-xl font-serif font-semibold">Beautify</span>
            </div>
            <p className="text-salon-tertiary text-sm">
              Elevating beauty with expert care and professional service since 2010.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-salon-tertiary hover:text-salon-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-salon-tertiary hover:text-salon-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-salon-tertiary hover:text-salon-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-salon-dark mb-4">Salon</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/stylists" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Our Stylists
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-salon-dark mb-4">Booking</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/booking" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/client" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link to="/cancel" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  Cancel Booking
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-salon-tertiary hover:text-salon-primary text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-salon-dark mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-salon-tertiary text-sm">
                123 Beauty Lane, <br />
                New York, NY 10001
              </li>
              <li className="text-salon-tertiary text-sm pt-2">
                <a href="tel:+1234567890" className="hover:text-salon-primary">
                  (123) 456-7890
                </a>
              </li>
              <li className="text-salon-tertiary text-sm">
                <a href="mailto:info@beautify.com" className="hover:text-salon-primary">
                  info@beautify.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-salon-tertiary text-sm text-center md:text-left">
            © 2023 Beautify Salon. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-salon-tertiary hover:text-salon-primary text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-salon-tertiary hover:text-salon-primary text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
