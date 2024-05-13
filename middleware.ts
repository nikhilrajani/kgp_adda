import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes=createRouteMatcher(['/','/api/webhooks/clerk']);
const ignoredRoutes=createRouteMatcher(['/api/webhooks/clerk']);

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};