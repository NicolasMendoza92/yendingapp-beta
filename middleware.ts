import { auth } from './auth';

export default auth((req) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth;
  const hasUserId = auth?.user?.userData?.user_id;
  const hasUserName = auth?.user?.userData?.name;
  const publicRoutes = ['/'];
  const authRoutes = ['/auth/login', '/auth/register'];
  const isApiURL = nextUrl.pathname.startsWith('/api');
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiURL) {
    return;
  }

  if (isAuthRoute) {
    // Logica para el singIn con google provider
    if (isLoggedIn && (!hasUserId || !hasUserName)) {
      return Response.redirect(new URL('/onboarding', nextUrl));
    }
    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return;
});
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
