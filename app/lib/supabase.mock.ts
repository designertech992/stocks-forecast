import { User } from '@supabase/supabase-js';

// Мок-данные для пользователя
const mockUser: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: { 
    full_name: 'Test User',
    avatar_url: 'https://ui-avatars.com/api/?name=Test+User&background=random'
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  email: 'test@example.com',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  phone_confirmed_at: undefined,
  confirmation_sent_at: new Date().toISOString(),
  invited_at: undefined,
  role: '',
  identities: [],
  recovery_sent_at: undefined
};

// Мок-данные для сессии
const mockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: mockUser
};

// Мок-клиент Supabase для аутентификации
export const mockAuthClient = {
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    console.log(`[MOCK] Signing in with email: ${email}`);
    return { data: { session: mockSession, user: mockUser }, error: null };
  },
  
  signInWithOAuth: async ({ provider, options }: { provider: string, options?: any }) => {
    console.log(`[MOCK] Signing in with OAuth provider: ${provider}`);
    // В мок-версии просто возвращаем URL для редиректа
    return { 
      data: { 
        url: `${window.location.origin}/dashboard`,
        provider,
        session: null
      }, 
      error: null 
    };
  },
  
  signUp: async ({ email, password }: { email: string; password: string }) => {
    console.log(`[MOCK] Signing up with email: ${email}`);
    return { data: { session: mockSession, user: mockUser }, error: null };
  },
  
  signOut: async () => {
    console.log(`[MOCK] Signing out`);
    return { error: null };
  },
  
  getSession: async () => {
    console.log(`[MOCK] Getting session`);
    return { data: { session: mockSession }, error: null };
  },
  
  onAuthStateChange: (callback: any) => {
    console.log(`[MOCK] Auth state change subscription`);
    // Имитация вызова callback с текущей сессией
    setTimeout(() => {
      callback('SIGNED_IN', { session: mockSession });
    }, 0);
    
    // Возвращаем функцию для отписки
    return {
      data: { subscription: { unsubscribe: () => console.log(`[MOCK] Unsubscribed from auth state change`) } }
    };
  }
};

// Мок-данные для избранных активов
const mockFavorites = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation' },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.' }
];

// Мок-клиент Supabase для работы с базой данных
export const mockDataClient = {
  from: (table: string) => {
    console.log(`[MOCK] Accessing table: ${table}`);
    
    return {
      select: () => {
        return {
          eq: (column: string, value: any) => {
            console.log(`[MOCK] Select from ${table} where ${column} = ${value}`);
            
            if (table === 'favorites' && column === 'user_id' && value === mockUser.id) {
              return Promise.resolve({ data: mockFavorites, error: null });
            }
            
            return Promise.resolve({ data: [], error: null });
          }
        };
      },
      
      insert: (data: any) => {
        console.log(`[MOCK] Insert into ${table}:`, data);
        return Promise.resolve({ data: { id: Date.now(), ...data }, error: null });
      },
      
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            console.log(`[MOCK] Delete from ${table} where ${column} = ${value}`);
            return Promise.resolve({ data: null, error: null });
          }
        };
      }
    };
  }
};

// Мок-клиент Supabase (объединяет аутентификацию и работу с данными)
export const mockSupabaseClient = {
  auth: mockAuthClient,
  ...mockDataClient
};

// Экспорт клиента для замены реального Supabase
export const supabase = mockSupabaseClient; 