import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, barbers, reviews } from '@/data/mockData';
import BarberCard from '@/components/BarberCard';
import ReviewCard from '@/components/ReviewCard';
import heroImage from '@/assets/hero-barber.jpg';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  const featured = services.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Blade & Co Barber Shop" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Est. 2010</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Style<br />
              <span className="text-gradient-gold">Meets Craft</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Premium grooming experience crafted by expert barbers. Walk in confident, walk out transformed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                <Link to="/booking">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 text-base">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Happy Clients', value: '5,000+' },
              { label: 'Expert Barbers', value: '3' },
              { label: 'Years Experience', value: '14+' },
              { label: 'Average Rating', value: '4.9' },
            ].map(s => (
              <motion.div key={s.label} {...fadeUp}>
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Our <span className="text-gradient-gold">Services</span></h2>
            <p className="text-muted-foreground max-w-md mx-auto">Premium grooming services tailored to your unique style</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((s, i) => (
              <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">${s.price}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {s.duration}min</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Barbers */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Meet Our <span className="text-gradient-gold">Barbers</span></h2>
            <p className="text-muted-foreground">Skilled craftsmen dedicated to your look</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto">
            {barbers.map((b, i) => (
              <motion.div key={b.id} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <BarberCard barber={b} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">What Our <span className="text-gradient-gold">Clients Say</span></h2>
          </motion.div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {reviews.map(r => (
              <div key={r.id} className="snap-start shrink-0">
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Our <span className="text-gradient-gold">Work</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
              'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
              'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
              'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
            ].map((img, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="aspect-square overflow-hidden rounded-lg">
                <img src={img} alt="Hairstyle" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/gallery">View Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center bg-card border border-border rounded-2xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-gradient opacity-5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready for a <span className="text-gradient-gold">Fresh Look?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Book your appointment today and experience the Blade & Co difference.</p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10">
                <Link to="/booking">Book Your Appointment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
