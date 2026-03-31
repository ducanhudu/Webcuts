import { useState } from 'react';
import { services, products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, CalendarDays, Package, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const mockBookings = [
  { id: '1', client: 'John Doe', service: 'Skin Fade', barber: 'Marcus Cole', date: '2024-04-01', time: '10:00 AM', status: 'Confirmed' },
  { id: '2', client: 'Mike Smith', service: 'Beard Trim', barber: 'Jake Rivera', date: '2024-04-01', time: '11:30 AM', status: 'Pending' },
  { id: '3', client: 'Alex Johnson', service: 'Hair Coloring', barber: 'Sofia Chen', date: '2024-04-02', time: '2:00 PM', status: 'Confirmed' },
];

const AdminPage = () => {
  const [tab, setTab] = useState('bookings');

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-1">Admin <span className="text-gradient-gold">Dashboard</span></h1>
          <p className="text-muted-foreground">Manage your barbershop</p>
        </motion.div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-card border border-border mb-6">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarDays className="h-4 w-4 mr-2" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scissors className="h-4 w-4 mr-2" /> Services
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="h-4 w-4 mr-2" /> Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Client</TableHead><TableHead>Service</TableHead><TableHead>Barber</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map(b => (
                    <TableRow key={b.id} className="border-border">
                      <TableCell className="font-medium">{b.client}</TableCell>
                      <TableCell>{b.service}</TableCell>
                      <TableCell>{b.barber}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell>{b.time}</TableCell>
                      <TableCell><span className={`px-2 py-1 rounded-full text-xs ${b.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{b.status}</span></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => toast.info('Edit booking')}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => toast.info('Delete booking')} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="flex justify-end mb-4">
              <Button size="sm" className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add Service</Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Duration</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map(s => (
                    <TableRow key={s.id} className="border-border">
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="capitalize">{s.category}</TableCell>
                      <TableCell>${s.price}</TableCell>
                      <TableCell>{s.duration} min</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => toast.info('Edit service')}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="flex justify-end mb-4">
              <Button size="sm" className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add Product</Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Rating</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>{p.rating}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => toast.info('Edit product')}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
