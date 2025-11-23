export type AIModel = 'Gemini' | 'ChatGPT' | 'Claude' | 'Others';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // The prompt text
  exampleOutput: string;
  model: AIModel;
  category: string;
  date: string;
  relatedCourseId?: string;
  resultImage?: string; // URL for the result image
}

export interface Course {
  id: string;
  title: string;
  summary: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  topics: string[];
  audience: string[];
  modules: string[];
  image: string;
}

export interface User {
  name: string;
  email: string;
  purchasedCourses: string[]; // List of Course IDs
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
}