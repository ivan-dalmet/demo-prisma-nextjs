import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';

import { db } from '@/utils/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
  ],
});
