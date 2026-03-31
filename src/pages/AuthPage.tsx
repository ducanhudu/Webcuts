import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scissors } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (!isLogin) {
      if (!form.name) { toast.error('Name is required'); return; }
      if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
      register(form.name, form.email, form.password);
      toast.success('Account created!');
    } else {
      login(form.email, form.password);
      toast.success('Welcome back!');
    }
    navigate('/');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Scissors className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-muted-foreground text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Join the Blade & Co family'}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          {!isLogin && (
            <Input placeholder="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" />
          )}
          <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="bg-secondary border-border" />
          <Input type="password" placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="bg-secondary border-border" />
          {!isLogin && (
            <Input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} className="bg-secondary border-border" />
          )}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
