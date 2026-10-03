import { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export function proxy(request: Request) {
  return createMiddleware(routing)(request as unknown as NextRequest);
}

export const config = {
  matcher: [
    // Match root and all locale-prefixed paths
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
