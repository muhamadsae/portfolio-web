import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Zap, Image as ImageIcon } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { BLOG_POSTS, COURSES } from '../constants';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return <div className="p-20 text-center">Post not found</div>;
  }

  const relatedCourse = COURSES.find(c => c.id === post.relatedCourseId);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post.content);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Library
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-4">
             <Badge color={post.model === 'Gemini' ? 'blue' : post.model === 'ChatGPT' ? 'green' : 'purple'}>
                {post.model}
             </Badge>
             <Badge color="gray">{post.category}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.summary}</p>
        </div>

        {/* The Prompt */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Copy This Prompt</h2>
            <button onClick={copyToClipboard} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center font-medium transition-colors">
              <Copy size={14} className="mr-1" /> Copy Text
            </button>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 font-mono text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            {post.content}
          </div>
        </div>

        {/* Example Output & Image */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
             <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">Example Output</h2>
             <div className="pl-6 border-l-2 border-indigo-100 italic text-gray-600 bg-white h-full">
                "{post.exampleOutput}"
             </div>
          </div>
          
          {post.resultImage && (
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4 flex items-center gap-2">
                <ImageIcon size={14}/> Result Preview
              </h2>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 relative">
                <img 
                  src={post.resultImage} 
                  alt="AI Result Preview" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Instructor Insight */}
        <div className="bg-indigo-50 rounded-xl p-8 mb-16">
          <div className="flex gap-4">
             <div className="bg-white p-2 rounded-full h-fit shadow-sm">
                <Zap className="text-indigo-600" size={20} />
             </div>
             <div>
               <h3 className="font-bold text-indigo-900 mb-2">Instructor's Tip</h3>
               <p className="text-indigo-800 text-sm leading-relaxed">
                 Context is key. Notice how I specified the "Tone" and the exact "Section 4.2" in the prompt? The more specific details you give the AI about your constraints, the less editing you'll have to do later.
               </p>
             </div>
          </div>
        </div>

        {/* Related Course CTA */}
        {relatedCourse && (
          <div className="border-t border-gray-100 pt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Want to master this?</h3>
            <Card className="flex flex-col md:flex-row overflow-hidden group">
              <div className="md:w-1/3 bg-gray-200 overflow-hidden">
                <img src={relatedCourse.image} alt={relatedCourse.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{relatedCourse.title}</h4>
                <p className="text-gray-600 text-sm mb-6">{relatedCourse.summary}</p>
                <Link to={`/courses/${relatedCourse.id}`}>
                   <Button>View Course Details</Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;