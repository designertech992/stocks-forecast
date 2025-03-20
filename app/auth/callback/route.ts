import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Эта функция обрабатывает колбек после OAuth аутентификации через Google
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Обмен кода на сессию и обновление cookies
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Перенаправление на главную страницу приложения
  return NextResponse.redirect(new URL('/dashboard', request.url));
} 