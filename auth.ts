import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
});

console.log("GOOGLE ID:", !!process.env.AUTH_GOOGLE_ID);
console.log("GOOGLE SECRET:", !!process.env.AUTH_GOOGLE_SECRET);
console.log("AUTH SECRET:", !!process.env.AUTH_SECRET);