import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/ui';
import { COURSES } from '../constants';

const CourseCatalog: React.FC = () => {
  const { user } = useAuth();
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate'>('All');

  const filteredCourses = levelFilter === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.level === levelFilter);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionTitle 
              title="Tech & AI Courses" 
              subtitle="Curriculum designed for the modern office ecosystem."
            />
            
            {/* Simple Filter */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['All', 'Beginner', 'Intermediate'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setLevelFilter(level)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            levelFilter === level ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                        }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id}>
              <Card className="flex flex-col h-full group">
                <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                   <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                   {!user && (
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700 flex items-center gap-1 shadow-sm">
                          <Lock size={12} /> Login to Buy
                      </div>
                   )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                     <div className="flex justify-between items-start mb-2">
                         <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{course.level}</span>
                         <span className="text-sm font-bold text-gray-900">
                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(course.price)}
                         </span>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 flex-1">
                    {course.summary}
                  </p>

                  <div className="space-y-3">
                     <Link to={`/courses/${course.id}`}>
                        <Button fullWidth variant="outline" className="group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700">View Syllabus</Button>
                     </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;