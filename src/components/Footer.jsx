
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      e.target.reset();
    }
  };
  
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-600 text-sm">
              ShopZone is your one-stop marketplace for all your shopping needs. 
              Buy and sell products with ease and confidence.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-shopzone transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-shopzone transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-shopzone transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-shopzone transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-shopzone transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-shopzone transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-shopzone transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-shopzone transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-gray-600 hover:text-shopzone transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-shopzone mt-0.5" />
                <span className="text-gray-600">
                  123 Market Street, Suite 456<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-shopzone" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-shopzone" />
                <span className="text-gray-600">support@shopzone.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter to receive updates and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                className="border-gray-300 focus:border-shopzone focus:ring-shopzone"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-shopzone hover:bg-shopzone-dark"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} ShopZone. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-600 hover:text-shopzone text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-shopzone text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-600 hover:text-shopzone text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
