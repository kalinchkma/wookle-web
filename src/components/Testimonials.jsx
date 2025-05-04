
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with ShopZone.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
              
              <div className="flex items-center">
                <div className="mr-3">
                  <img  
                    alt={`${testimonial.name}'s profile picture`}
                    className="w-12 h-12 rounded-full object-cover"
                   src="https://images.unsplash.com/photo-1616985480957-a0547263ae1d" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
