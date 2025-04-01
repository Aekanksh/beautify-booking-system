
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Stylists = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-salon-light py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-semibold mb-4">Our Expert Stylists</h1>
          <p className="text-salon-tertiary max-w-2xl mx-auto">
            Meet our team of professional stylists, each bringing unique talents and expertise to create your perfect look.
          </p>
        </div>
      </section>
      
      {/* Stylists Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StylistCard 
              name="Emma Johnson"
              title="Senior Stylist & Color Specialist"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="With 8 years of experience, Emma specializes in creative color and precision cutting. Her attention to detail ensures each client leaves feeling confident and beautiful."
              specialties={["Balayage", "Fashion Color", "Precision Cuts"]}
            />
            
            <StylistCard 
              name="Michael Chen"
              title="Master Stylist"
              image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="Michael brings 12 years of international styling experience to our salon. His innovative techniques and artistic vision have made him a favorite among clients seeking transformative styles."
              specialties={["Men's Styling", "Textured Cuts", "Creative Direction"]}
            />
            
            <StylistCard 
              name="Sophia Rodriguez"
              title="Bridal Specialist"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="Sophia's passion for special occasion styling has made her our go-to expert for bridal and event hair. Her elegant updos and romantic styles will make your special day unforgettable."
              specialties={["Bridal Styling", "Updos", "Formal Styling"]}
            />
            
            <StylistCard 
              name="James Wilson"
              title="Color Technician"
              image="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="James is known for his exceptional color work, from subtle highlights to dramatic transformations. His technical expertise ensures beautiful, long-lasting results."
              specialties={["Highlights", "Color Correction", "Dimensional Color"]}
            />
            
            <StylistCard 
              name="Olivia Kim"
              title="Style Director"
              image="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="As our Style Director, Olivia keeps our team at the forefront of industry trends. Her innovative vision and leadership inspire our stylists to deliver exceptional results."
              specialties={["Trend Setting", "Editorial Styling", "Education"]}
            />
            
            <StylistCard 
              name="David Thompson"
              title="Texture Specialist"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              bio="David's expertise in curly and textured hair makes him invaluable to clients seeking specialized care. His customized approach ensures your natural texture shines."
              specialties={["Curly Hair", "Natural Texture", "Curl Definition"]}
            />
          </div>
        </div>
      </section>
      
      {/* Booking CTA */}
      <section className="py-16 bg-salon-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-4">Ready to Meet Our Stylists?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Book an appointment with one of our talented professionals and experience the Beautify difference.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-salon-primary hover:bg-gray-100" asChild>
            <Link to="/booking">Book an Appointment</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

interface StylistCardProps {
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
}

const StylistCard = ({ name, title, image, bio, specialties }: StylistCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-80 object-cover object-center"
      />
      <div className="p-6">
        <h3 className="text-xl font-medium mb-1">{name}</h3>
        <p className="text-salon-primary text-sm mb-3">{title}</p>
        <p className="text-salon-tertiary mb-4 text-sm">{bio}</p>
        
        <h4 className="font-medium text-sm mb-2">Specialties:</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((specialty, index) => (
            <span key={index} className="text-xs bg-salon-light px-3 py-1 rounded-full">
              {specialty}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-3">
            <a href="#" className="text-salon-tertiary hover:text-salon-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-salon-tertiary hover:text-salon-primary">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <Button size="sm" className="bg-salon-primary hover:bg-salon-primary/90" asChild>
            <Link to="/booking">Book With {name.split(' ')[0]}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stylists;
