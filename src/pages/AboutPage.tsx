import { barbers } from '@/data/mockData';
import BarberCard from '@/components/BarberCard';
import { Scissors, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AboutPage = () => (
  <div className="pt-24 pb-20">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">About <span className="text-gradient-gold">Blade & Co</span></h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Where tradition meets modern grooming excellence</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Scissors, title: 'Our Story', text: 'Founded in 2010, Blade & Co started as a single-chair barbershop with a vision to bring premium grooming to everyone. Today, we\'re the city\'s most trusted destination for style and grooming.' },
          { icon: Award, title: 'Our Mission', text: 'We believe every client deserves a tailored experience. Our barbers combine years of training with genuine passion to deliver cuts that reflect your personality.' },
          { icon: Heart, title: 'Our Values', text: 'Quality, craftsmanship, and community. We use only premium products, invest in continuous education, and give back through free haircuts for those in need.' },
        ].map((item, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold mb-3">Our <span className="text-gradient-gold">Team</span></h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto">
        {barbers.map((b, i) => (
          <motion.div key={b.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
            <BarberCard barber={b} />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
