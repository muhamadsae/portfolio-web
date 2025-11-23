import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/ui';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after register? default to dashboard, or the page they were trying to access
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      register(name, email);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join specifically designed for office pros.</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="Full Name" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
            
            <Input 
              label="Work Email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
            />

            <Input 
              label="Password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex items-center">
              <input id="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the <a href="#" className="text-slate-900 hover:underline">Terms</a> and <a href="#" className="text-slate-900 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button fullWidth type="submit" size="lg">Create Free Account</Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-semibold text-slate-900 hover:text-slate-700">Log in</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;