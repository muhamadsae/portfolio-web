import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, TrendingUp, Users } from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/ui';
import { COURSES } from '../constants';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 -z-30 w-full"
          style={{
            height: '140%', // Taller than container to allow movement
            top: '-20%',    // Start higher up
            transform: `translateY(${scrollY * 0.5}px)`, // Move slower than scroll
            backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Heavy White Overlay to maintain minimalist aesthetic */}
        <div className="absolute inset-0 -z-20 bg-white/90 bg-gradient-to-b from-white/90 via-white/80 to-white"></div>

        {/* Abstract Background Element (existing blob) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-tr from-slate-100 to-gray-50 rounded-full blur-3xl opacity-60"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-slate-800 ring-1 ring-inset ring-slate-200 mb-8 shadow-sm">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
              New Course: HR Automation with ChatGPT
            </span>
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl mb-6">
            Future-Proof Your <br className="hidden sm:block" />
            <span className="text-slate-500">Office Career</span> with AI
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 mb-10 bg-white/50 backdrop-blur-sm rounded-xl p-2">
            Stop doing repetitive tasks. Learn how to use Gemini, ChatGPT, and Claude to automate your reports, emails, and workflows. Designed specifically for non-technical office professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2 w-full sm:w-auto shadow-lg shadow-slate-200/50">
                Start Learning Free <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-gray-50 mb-4 text-slate-900">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Productivity</h3>
              <p className="text-gray-600 leading-relaxed">
                Save 10+ hours a week by automating Excel formulas, email drafting, and meeting summaries.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-gray-50 mb-4 text-slate-900">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Position yourself as the tech-savvy leader in your department. Be the one who solves problems fast.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-gray-50 mb-4 text-slate-900">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Non-Technical Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                No coding required. Our courses are built for HR, Admin, Operations, and Marketing roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Popular Courses" 
            subtitle="Practical, outcome-focused training for the modern workplace." 
            align="center" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES.slice(0, 3).map((course, index) => (
              <div key={course.id}>
                <Card className="flex flex-col overflow-hidden h-full">
                  <div className="aspect-video w-full bg-gray-200 relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-white border border-gray-200 rounded text-gray-600 mb-2">{course.level}</span>
                      <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{course.summary}</p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(course.price)}
                      </span>
                      <Link to={`/courses/${course.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1 p-0 hover:bg-transparent hover:text-slate-600">
                          Details <ArrowRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button variant="secondary">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Ready to upgrade your workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join 2,000+ office workers who are saving time and reducing stress with AI.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-12">Register Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;