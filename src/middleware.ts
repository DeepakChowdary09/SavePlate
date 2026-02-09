import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



const isPublicRoute = createRouteMatcher([

  "/login(.*)",    // Covers /login, /login/factor-one, etc.

  "/register(.*)", // Covers /register, /register/verify, etc.

  "/",             // Landing Page

  "/api(.*)"       // Public APIs (optional, secure this later if needed)

]);



export default clerkMiddleware((auth, req) => {

  if (!isPublicRoute(req)) {

    auth.protect();

  }

});



export const config = {

  matcher: [

    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",

  ],

};