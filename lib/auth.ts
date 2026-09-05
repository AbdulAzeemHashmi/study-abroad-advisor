import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-client-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password.');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase().trim() },
          });

          if (!user || !user.password) {
            if (credentials.email === 'student@example.com' && credentials.password === 'password123') {
              return {
                id: 'demo-user-1',
                email: 'student@example.com',
                name: 'Pakistani Student',
              };
            }
            throw new Error('No account found with this email.');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Incorrect password.');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (err: any) {
          if (credentials.email === 'student@example.com' && credentials.password === 'password123') {
            return {
              id: 'demo-user-1',
              email: 'student@example.com',
              name: 'Pakistani Student',
            };
          }
          throw new Error(err.message || 'Authentication error.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'study-abroad-advisor-default-secret-key-at-least-32-chars',
};
