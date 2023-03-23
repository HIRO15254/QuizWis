import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userDataLinked: boolean;
      id: string;
    } & DefaultSession['user'];
    userData: {
      userId: string;
    }
  }
}
