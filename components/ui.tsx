import React from 'react';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- BADGE ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'gray' | 'purple' }> = ({ children, color = 'gray' }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- CARD ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  );
};

// --- INPUT ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <input 
        className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors text-sm text-gray-900 placeholder:text-gray-400 bg-white ${className}`}
        {...props}
      />
    </div>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);