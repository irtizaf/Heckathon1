import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: ["/", '/api/cart', '/api/checkout', '/api/create-stripe-session',
    '/api/webhook', 'female', 'male', 'kids', 'allproducts', ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};