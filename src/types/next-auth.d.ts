import 'next-auth';

declare module 'next-auth' {
  interface Session {
    userId: string;
    databaseId: string;
    iconUrl?: string;
    name: string;
    isDarkTheme: boolean;
  }
}
