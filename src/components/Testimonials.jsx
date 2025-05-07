
    import React from "react";
    import { motion } from "framer-motion";
    import { Star, MessageSquare } from "lucide-react";

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
      if (!testimonials || testimonials.length === 0) {
        return (
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No Testimonials Yet</h2>
              <p className="text-muted-foreground">We're always working to improve. Check back soon for customer stories!</p>
            </div>
          </section>
        );
      }

      return (
        <section className="py-10 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Hear directly from our satisfied shoppers and sellers.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={item}
                  whileHover={{ y: -6, boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.07)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="bg-card p-5 md:p-6 rounded-xl shadow-sm border border-border/70 hover:border-primary/50 flex flex-col"
                >
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/50'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 text-sm mb-5 italic leading-relaxed flex-grow">"{testimonial.comment}"</p>
                  
                  <div className="flex items-center mt-auto">
                    <div className="mr-3">
                      <img 
                        alt={`${testimonial.name}'s profile picture`}
                        className="w-10 h-10 rounded-full object-cover"
                       src="https://images.unsplash.com/photo-1559537696-55ba84f4ded2" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
  