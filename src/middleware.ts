import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/api/cloudinary/sign"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }
  },
  (request) => ({
    signInUrl: new URL("/sign-in", request.url).toString(),
    signUpUrl: new URL("/sign-up", request.url).toString()
  })
);

export const config = {
  matcher: ["/admin(.*)", "/api/cloudinary/sign"]
};
