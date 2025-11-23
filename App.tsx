import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;