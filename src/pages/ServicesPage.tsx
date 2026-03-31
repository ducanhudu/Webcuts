import { useState } from 'react';
import { services } from '@/data/mockData';
import ServiceCard from '@/components/ServiceCard';
import { motion } from 'framer-motion';

const categories = ['all', 'haircut', 'styling', 'coloring', 'grooming'] as const;

const ServicesPage = () => {
  const [category, setCategory] = useState<string>('all');
  const filtered = category === 'all' ? services : services.filter(s => s.category === category);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Our <span className="text-gradient-gold">Services</span></h1>
          <p className="text-muted-foreground max-w-md mx-auto">Premium grooming services for the modern gentleman</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
