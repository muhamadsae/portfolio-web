import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/ui';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Access your courses and saved prompts.</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="Email Address" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <Input 
              label="Password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-slate-900 hover:text-slate-700">Forgot password?</a>
              </div>
            </div>

            <Button fullWidth type="submit" size="lg">Log In</Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-slate-900 hover:text-slate-700">Register free</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;