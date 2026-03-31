import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services, barbers, timeSlots } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: preselectedService,
    barber: '',
  });
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone.trim())) e.phone = 'Invalid phone number';
    if (!form.service) e.service = 'Select a service';
    if (!form.barber) e.barber = 'Select a barber';
    if (!date) e.date = 'Select a date';
    if (!time) e.time = 'Select a time';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast.success('Booking confirmed!');
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-3">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Thank you, {form.name}.</p>
          <p className="text-muted-foreground mb-6">
            {date && format(date, 'MMMM d, yyyy')} at {time}
          </p>
          <Button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: '', barber: '' }); setDate(undefined); setTime(''); }} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Book Another
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Book an <span className="text-gradient-gold">Appointment</span></h1>
          <p className="text-muted-foreground">Choose your service, barber, and preferred time</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <Input placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="bg-secondary border-border" />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Service</label>
              <Select value={form.service} onValueChange={v => setForm(p => ({ ...p, service: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select service" /></SelectTrigger>
                <SelectContent>{services.map(s => <SelectItem key={s.id} value={s.id}>{s.name} - ${s.price}</SelectItem>)}</SelectContent>
              </Select>
              {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Barber</label>
              <Select value={form.barber} onValueChange={v => setForm(p => ({ ...p, barber: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select barber" /></SelectTrigger>
                <SelectContent>{barbers.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
              </Select>
              {errors.barber && <p className="text-destructive text-xs mt-1">{errors.barber}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-full justify-start bg-secondary border-border', !date && 'text-muted-foreground')}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date()} className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Time</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={cn(
                    'py-2 px-1 rounded-md text-xs font-medium transition-all',
                    time === slot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.time && <p className="text-destructive text-xs mt-1">{errors.time}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6">
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
