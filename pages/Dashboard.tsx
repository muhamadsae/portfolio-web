import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Bookmark, Clock, User } from 'lucide-react';
import { Card, Button, SectionTitle } from '../components/ui';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
             <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
             <p className="text-gray-600 mt-1">Track your progress and access your AI tools.</p>
          </div>
          <div className="mt-4 md:mt-0">
             <Link to="/courses">
                <Button>Browse New Courses</Button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Navigation (Visual Only) */}
           <div className="lg:col-span-1 space-y-2">
              <Card className="p-4">
                  <button className="flex items-center gap-3 w-full p-2 rounded-md bg-slate-50 text-slate-900 font-medium">
                      <BookOpen size={18} /> My Courses
                  </button>
                  <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                      <Bookmark size={18} /> Saved Prompts
                  </button>
                  <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                      <Clock size={18} /> Transaction History
                  </button>
                  <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                      <User size={18} /> Profile Settings
                  </button>
              </Card>
           </div>

           {/* Main Content Area */}
           <div className="lg:col-span-3">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <Card className="p-6">
                    <div className="text-gray-500 text-sm mb-1">Courses Enrolled</div>
                    <div className="text-3xl font-bold text-slate-900">0</div>
                 </Card>
                 <Card className="p-6">
                    <div className="text-gray-500 text-sm mb-1">Certificates</div>
                    <div className="text-3xl font-bold text-slate-900">0</div>
                 </Card>
                 <Card className="p-6">
                    <div className="text-gray-500 text-sm mb-1">Hours Learned</div>
                    <div className="text-3xl font-bold text-slate-900">0.0</div>
                 </Card>
              </div>

              {/* Course List */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 min-h-[400px]">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">My Learning</h2>
                 
                 {/* Empty State */}
                 <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-100 rounded-lg">
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                       <BookOpen size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                    <p className="text-gray-500 max-w-sm mb-6">
                        You haven't enrolled in any courses. Start your journey to becoming an AI-powered professional.
                    </p>
                    <Link to="/courses">
                       <Button variant="outline">Browse Course Catalog</Button>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;