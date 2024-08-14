import { auth } from './auth';

export default auth((req) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth;
  const hasUserId = auth?.user?.userData?.user_id;
  const hasUserName = auth?.user?.userData?.name;
  const publicRoutes = ['/', "/auth/new-verification"];
  const authRoutes = ['/auth/login', '/auth/register', '/auth/reset', '/auth/new-password', '/api/auth/session'];
  const isApiURL = nextUrl.pathname.startsWith('/api');
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isOnboarding = nextUrl.pathname === "/onboarding"
  
  if (isApiURL) {
    return;
  }

  // Ruta para luego de validar email 
  if (isLoggedIn && isOnboarding === false && hasUserName === null) {
    return Response.redirect(new URL('/onboarding', nextUrl))
  }

  if (isAuthRoute) {

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



// este es el formato del AUTH cuando el login es con google.

// auth {
//   name: 'Nicolas Mendoza',
//   email: 'nicomendoza.92@gmail.com',
//   image: 'https://lh3.googleusercontent.com/a/ACg8ocL7exhoB-SVS12Hb0u_CmcdgJBlwa8oWWo0O1WkKIddyf6gk_oM=s96-c',
//   id: '66bc8fd7a98ef70232adf6e3',
//   userData: {
//   id: '66bc8fd7a98ef70232adf6e3',
//   v: null,
//   about: null,
//   age: null,
//   createdAt: null,
//   dob_day: null,
//   dob_month: null,
//   dob_year: null,
//   email: 'nicomendoza.92@gmail.com',
//   emailVerified: null,
//   gender_identity: null,
//   image: 'https://lh3.googleusercontent.com/a/ACg8ocL7exhoB-SVS12Hb0u_CmcdgJBlwa8oWWo0O1WkKIddyf6gk_oM=s96-c',
//   name: 'Nicolas Mendoza',
//   password: null,
//   previas_created: [],
//   previas_interest: null,
//   previas_requests: [],
//   show_interest: null,
//   updatedAt: '2024-08-14T11:07:02.996Z',
//   url_img: null,
//   user_id: null,
//   role: 'USER',
//   isTwoFactorEnabled: false
// }
// }

// Este es el auth cuando hace login con credentials

// auth {
//   name: 'Juanchi',
//   email: 'nicolas@gmail.com',
//   image: null,
//   id: '669fd4b93ce599c32dd37bb3',
//   userData: {
//   id: '669fd4b93ce599c32dd37bb3',
//   v: null,
//   about: 'estoy como loquita ',
//   age: 26,
//   createdAt: '2024-07-23T16:05:13.386Z',
//   dob_day: '10',
//   dob_month: '03',
//   dob_year: '1998',
//   email: 'nicolas@gmail.com',
//   emailVerified: '2024-08-10T10:36:20.999Z',
//   gender_identity: 'man',
//   image: null,
//   name: 'Juanchi',
//   password: '$2a$10$InehG0WZiCM76yPPm3pGC.psIiSK/OZ9kM/Jz4Qib0JJLfbDAKr2a',
//   previas_created: [],
//   previas_interest: 'everyone',
//   previas_requests: [ ],
//   show_interest: true,
//   updatedAt: '2024-08-14T10:36:38.586Z',
//   url_img: 'https://yendingappbeta.s3.amazonaws.com/5d8ba4a7-3052-4dae-bbd8-7e19b5ac7119.jpg',
//   user_id: '5afb3a3a-c120-430a-a871-223d016d86cd',
//   role: 'USER',
//   isTwoFactorEnabled: false
// }
// }