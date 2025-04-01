
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-light py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-semibold mb-4">Our Services</h1>
          <p className="text-salon-tertiary max-w-2xl mx-auto">
            Browse our comprehensive range of beauty and hair services, all tailored to enhance your natural beauty.
          </p>
        </div>
      </section>
      
      {/* Services Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="hair" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="hair">Hair</TabsTrigger>
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hair" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem 
                  title="Women's Haircut"
                  description="Precision cut tailored to your face shape and personal style, includes consultation, shampoo, and styling."
                  duration="45 min"
                  price={45}
                />
                
                <ServiceItem 
                  title="Men's Haircut"
                  description="Classic cut with attention to detail, includes consultation, shampoo, and styling."
                  duration="30 min"
                  price={35}
                />
                
                <ServiceItem 
                  title="Children's Haircut"
                  description="Gentle approach for ages 12 and under, creating a positive salon experience."
                  duration="30 min"
                  price={25}
                />
                
                <ServiceItem 
                  title="Bang Trim"
                  description="Quick refresh between full haircuts to maintain your style."
                  duration="15 min"
                  price={15}
                />
                
                <ServiceItem 
                  title="Beard Trim"
                  description="Professional shaping and maintenance for your facial hair."
                  duration="20 min"
                  price={20}
                />
                
                <ServiceItem 
                  title="Luxury Haircut Package"
                  description="Premium experience includes deep conditioning treatment, extended massage, and premium styling."
                  duration="75 min"
                  price={75}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="color" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem 
                  title="Root Touch-Up"
                  description="Refresh your color at the roots to maintain a seamless look."
                  duration="60 min"
                  price={65}
                />
                
                <ServiceItem 
                  title="Full Color"
                  description="Complete color application for a fresh, vibrant look."
                  duration="90 min"
                  price={85}
                />
                
                <ServiceItem 
                  title="Partial Highlights"
                  description="Add dimension and depth to targeted areas of your hair."
                  duration="75 min"
                  price={90}
                />
                
                <ServiceItem 
                  title="Full Highlights"
                  description="Comprehensive highlighting to transform your entire look."
                  duration="120 min"
                  price={120}
                />
                
                <ServiceItem 
                  title="Balayage"
                  description="Hand-painted highlights for a natural, sun-kissed effect."
                  duration="150 min"
                  price={150}
                />
                
                <ServiceItem 
                  title="Fashion Color"
                  description="Vivid, creative colors for a bold statement."
                  duration="180 min"
                  price={160}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="treatments" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem 
                  title="Deep Conditioning"
                  description="Intensive moisture treatment to restore and revitalize dry or damaged hair."
                  duration="30 min"
                  price={35}
                />
                
                <ServiceItem 
                  title="Scalp Treatment"
                  description="Therapeutic treatment to address scalp concerns and promote healthy hair growth."
                  duration="45 min"
                  price={50}
                />
                
                <ServiceItem 
                  title="Keratin Smoothing"
                  description="Reduce frizz and enhance manageability with this smoothing treatment."
                  duration="120 min"
                  price={175}
                />
                
                <ServiceItem 
                  title="Hair Mask"
                  description="Customized mask to address specific hair concerns."
                  duration="30 min"
                  price={40}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="styling" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem 
                  title="Blowout"
                  description="Professional blow dry styling to achieve a smooth, polished look."
                  duration="45 min"
                  price={45}
                />
                
                <ServiceItem 
                  title="Special Occasion Style"
                  description="Elegant updo or styling for weddings, proms, and special events."
                  duration="60 min"
                  price={80}
                />
                
                <ServiceItem 
                  title="Bridal Trial"
                  description="Consultation and styling rehearsal to perfect your wedding day look."
                  duration="90 min"
                  price={100}
                />
                
                <ServiceItem 
                  title="Bridal Style"
                  description="Premium styling service for your wedding day, includes touchups."
                  duration="90 min"
                  price={150}
                />
                
                <ServiceItem 
                  title="Hair Extensions"
                  description="Add length and volume with professional extension application."
                  duration="180 min"
                  price={250}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Booking CTA */}
      <section className="py-16 bg-salon-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-4">Ready to Book Your Service?</h2>
          <p className="text-salon-tertiary max-w-2xl mx-auto mb-8">
            Our expert stylists are ready to help you look and feel your best. Book your appointment today.
          </p>
          <Button size="lg" className="bg-salon-primary hover:bg-salon-primary/90" asChild>
            <Link to="/booking">Book an Appointment</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

interface ServiceItemProps {
  title: string;
  description: string;
  duration: string;
  price: number;
}

const ServiceItem = ({ title, description, duration, price }: ServiceItemProps) => {
  return (
    <div className="service-card">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <span className="font-medium text-salon-primary">${price}</span>
      </div>
      <p className="text-salon-tertiary mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-salon-tertiary">Duration: {duration}</span>
        <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90" asChild>
          <Link to="/booking">Book Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default Services;
