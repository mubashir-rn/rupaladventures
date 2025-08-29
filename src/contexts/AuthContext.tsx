import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<{ requiresConfirmation: boolean }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const supaUser = session.user;
          const mapped: User = {
            id: supaUser.id,
            email: supaUser.email ?? '',
            name: (supaUser.user_metadata?.name as string) || (supaUser.email?.split('@')[0] ?? 'User'),
            role: 'user',
            avatar: (supaUser.user_metadata?.avatar_url as string) || undefined,
          };
          setUser(mapped);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const supaUser = session.user;
        const mapped: User = {
          id: supaUser.id,
          email: supaUser.email ?? '',
          name: (supaUser.user_metadata?.name as string) || (supaUser.email?.split('@')[0] ?? 'User'),
          role: 'user',
          avatar: (supaUser.user_metadata?.avatar_url as string) || undefined,
        };
        setUser(mapped);
      } else {
        setUser(null);
      }
    });

    init();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const supaUser = data.user;
      if (supaUser) {
        const mapped: User = {
          id: supaUser.id,
          email: supaUser.email ?? email,
          name: (supaUser.user_metadata?.name as string) || (supaUser.email?.split('@')[0] ?? 'User'),
          role: 'user',
          avatar: (supaUser.user_metadata?.avatar_url as string) || undefined,
        };
        setUser(mapped);
      }
    } catch (error: any) {
      throw new Error(error?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const reloadUser = async () => {
    const { data } = await supabase.auth.getUser();
    const supaUser = data.user;
    if (supaUser) {
      const mapped: User = {
        id: supaUser.id,
        email: supaUser.email ?? '',
        name: (supaUser.user_metadata?.name as string) || (supaUser.email?.split('@')[0] ?? 'User'),
        role: 'user',
        avatar: (supaUser.user_metadata?.avatar_url as string) || undefined,
      };
      setUser(mapped);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) throw error;
      // Only set user if we have a session (i.e., email confirmation not required or disabled)
      if (data.session && data.user) {
        const supaUser = data.user;
        const mapped: User = {
          id: supaUser.id,
          email: supaUser.email ?? email,
          name: (supaUser.user_metadata?.name as string) || name,
          role: 'user',
          avatar: (supaUser.user_metadata?.avatar_url as string) || undefined,
        };
        setUser(mapped);
      } else {
        setUser(null);
      }
      return { requiresConfirmation: !data.session };
    } catch (error: any) {
      throw new Error(error?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
    reloadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

