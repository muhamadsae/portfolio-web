import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Check, ShieldCheck, User as UserIcon, BookOpen, Target } from 'lucide-react';
import { Button, Card, Input } from '../components/ui';
import { COURSES } from '../constants';
import { useAuth } from '../context/AuthContext';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const course = COURSES.find(c => c.id === id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) return <div>Course not found</div>;

  const handleRegisterRedirect = () => {
    navigate('/register', { state: { from: location } });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Midtrans process
    setTimeout(() => {
        setIsSubmitting(false);
        alert('Redirecting to Midtrans Payment Gateway mock...');
        navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Hero */}
      <div className="bg-slate-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-medium mb-6 border border-indigo-500/30">
                    {course.level} Level
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{course.title}</h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2"><BookOpen size={16}/> {course.modules.length} Modules</div>
                    <div className="flex items-center gap-2"><UserIcon size={16}/> Office Professionals</div>
                </div>
            </div>
            {/* Mobile/Tablet image hidden on small, visible on large */}
            <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
                 <img src={course.image} alt="Course Preview" className="relative rounded-xl border border-slate-700 shadow-2xl" />
            </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 lg:p-12 mt-8 lg:mt-0">
                
                <section>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">What You Will Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.modules.map((mod, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                                <Check className="text-indigo-600 mt-1 shrink-0" size={18} />
                                <span className="text-gray-700 font-medium">{mod}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Who Is This For?</h3>
                    <div className="flex flex-wrap gap-3">
                        {course.audience.map((aud, idx) => (
                             <span key={idx} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm">
                                 {aud}
                             </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Why This Course?</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Most AI courses are too technical or too generic. This curriculum is built strictly for office environments. 
                        We don't talk about "LLM architecture"; we talk about how to finish your Monthly Report by 2 PM on Friday instead of 6 PM.
                    </p>
                </section>
            </div>

            {/* Sticky Sidebar / Checkout */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="p-6 border-t-4 border-t-indigo-500 shadow-lg">
                        <div className="text-center mb-6">
                            <p className="text-gray-500 text-sm mb-1">One-time payment</p>
                            <div className="text-3xl font-bold text-slate-900">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(course.price)}
                            </div>
                        </div>

                        {!isAuthenticated ? (
                            <div className="text-center space-y-4">
                                <div className="bg-amber-50 text-amber-800 text-sm p-3 rounded-lg border border-amber-100">
                                    You must have an account to purchase this course.
                                </div>
                                <Button onClick={handleRegisterRedirect} fullWidth size="lg">
                                    Register to Purchase
                                </Button>
                                <p className="text-xs text-gray-400">Already have an account? <Link to="/login" state={{ from: location }} className="underline hover:text-gray-600">Login here</Link></p>
                            </div>
                        ) : (
                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div className="border-b border-gray-100 pb-4 mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Secure Checkout</h4>
                                    <p className="text-xs text-gray-500">Confirm your details for the invoice.</p>
                                </div>
                                
                                <Input 
                                    label="Full Name" 
                                    defaultValue={user?.name} 
                                    readOnly 
                                    className="bg-gray-50 cursor-not-allowed" 
                                />
                                <Input 
                                    label="Email Address" 
                                    defaultValue={user?.email} 
                                    readOnly 
                                    className="bg-gray-50 cursor-not-allowed" 
                                />
                                <Input 
                                    label="WhatsApp Number" 
                                    placeholder="e.g. 0812..." 
                                    required 
                                    type="tel"
                                />

                                <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                                </Button>
                                
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                                    <ShieldCheck size={14} />
                                    <span>Payment processed securely via Midtrans</span>
                                </div>
                            </form>
                        )}
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;