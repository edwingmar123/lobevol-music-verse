import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  type: 'image' | 'video' | 'link';
  title: string;
  description?: string;
  content: string; // URL for image/video, actual URL for link
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

interface AuthContextType {
  user: User | null;
  users: User[];
  posts: Post[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'followers' | 'following'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  createPost: (postData: Omit<Post, 'id' | 'userId' | 'likes' | 'comments' | 'createdAt'>) => void;
  getUserPosts: (userId: string) => Post[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base de datos temporal en arrays
const INITIAL_USERS: User[] = [
  {
    id: '1',
    username: 'musico_test',
    email: 'musico@test.com',
    name: 'Músico de Prueba',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face',
    bio: 'Artista musical apasionado por el rock y el folk.',
    followers: 1250,
    following: 180
  },
  {
    id: '2',
    username: 'cantante_pro',
    email: 'cantante@test.com',
    name: 'Cantante Profesional',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    bio: 'Vocalista con 10 años de experiencia en el escenario.',
    followers: 2890,
    following: 95
  },
  {
    id: '3',
    username: 'dj_electronico',
    email: 'dj@test.com',
    name: 'DJ Electrónico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Productor de música electrónica y DJ.',
    followers: 5670,
    following: 230
  }
];

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: '1',
    type: 'image',
    title: 'Nueva guitarra en el estudio',
    description: 'Acabamos de adquirir esta hermosa guitarra para nuestras grabaciones',
    content: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    likes: 234,
    comments: 18,
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['guitarra', 'estudio', 'rock']
  },
  {
    id: '2',
    userId: '2',
    type: 'video',
    title: 'Cover de "Bohemian Rhapsody"',
    description: 'Mi interpretación de este clásico de Queen',
    content: 'https://example.com/video1.mp4',
    likes: 1892,
    comments: 156,
    createdAt: '2024-01-14T18:45:00Z',
    tags: ['cover', 'queen', 'vocal']
  },
  {
    id: '3',
    userId: '3',
    type: 'link',
    title: 'Mi nuevo track en SoundCloud',
    description: 'Acabo de subir mi último trabajo, ¡espero que les guste!',
    content: 'https://soundcloud.com/ejemplo-track',
    likes: 567,
    comments: 43,
    createdAt: '2024-01-13T14:20:00Z',
    tags: ['electronica', 'soundcloud', 'nuevo']
  }
];

// Simular contraseñas (en producción esto debe ser seguro)
const USER_CREDENTIALS = [
  { email: 'musico@test.com', password: 'test123' },
  { email: 'cantante@test.com', password: 'test123' },
  { email: 'dj@test.com', password: 'test123' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [credentials, setCredentials] = useState(USER_CREDENTIALS);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('musicalart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userCredential = credentials.find(cred => cred.email === email && cred.password === password);
    if (userCredential) {
      const userData = users.find(u => u.email === email);
      if (userData) {
        setUser(userData);
        localStorage.setItem('musicalart_user', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'followers' | 'following'> & { password: string }): Promise<boolean> => {
    // Verificar si el email ya existe
    if (users.find(u => u.email === userData.email) || credentials.find(c => c.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      followers: 0,
      following: 0
    };

    setUsers(prev => [...prev, newUser]);
    setCredentials(prev => [...prev, { email: userData.email, password: userData.password }]);
    setUser(newUser);
    localStorage.setItem('musicalart_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('musicalart_user');
  };

  const createPost = (postData: Omit<Post, 'id' | 'userId' | 'likes' | 'comments' | 'createdAt'>) => {
    if (!user) return;

    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      userId: user.id,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const getUserPosts = (userId: string): Post[] => {
    return posts.filter(post => post.userId === userId);
  };

  const value: AuthContextType = {
    user,
    users,
    posts,
    login,
    register,
    logout,
    createPost,
    getUserPosts
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};