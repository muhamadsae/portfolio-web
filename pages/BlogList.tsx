import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy } from 'lucide-react';
import { Button, Card, Badge, SectionTitle } from '../components/ui';
import { BLOG_POSTS } from '../constants';
import { AIModel } from '../types';

const BlogList: React.FC = () => {
  const [filter, setFilter] = useState<AIModel | 'All'>('All');

  const filteredPosts = filter === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.model === filter);

  const filters: (AIModel | 'All')[] = ['All', 'Gemini', 'ChatGPT', 'Claude'];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Prompt Library" 
          subtitle="Copy-paste ready prompts to solve real office problems immediately."
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === f 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <Card className="flex flex-col h-full hover:border-slate-300 transition-all">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color={post.model === 'Gemini' ? 'blue' : post.model === 'ChatGPT' ? 'green' : 'purple'}>
                      {post.model}
                    </Badge>
                    <span className="text-xs text-gray-400">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-slate-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                    {post.summary}
                  </p>

                  <Link to={`/blog/${post.id}`} className="mt-auto">
                    <Button variant="outline" fullWidth size="sm" className="justify-between group">
                      View Prompt <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No prompts found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;