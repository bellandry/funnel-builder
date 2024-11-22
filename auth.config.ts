import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname === '/login';
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl));
      } 
      
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  providers: [], // configured in auth.ts
} satisfies NextAuthConfig;
