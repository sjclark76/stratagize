// noinspection JSUnusedGlobalSymbols

import NextAuth from 'next-auth';
import { authOptions } from '@/shared/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
