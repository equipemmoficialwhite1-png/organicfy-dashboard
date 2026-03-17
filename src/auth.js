import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Admin hardcoded check or .env check
        const adminUser = process.env.ADMIN_USER || "admin";
        const adminPass = process.env.ADMIN_PASSWORD || "organicfy2026";

        console.log("LOGIN ATTEMPT:");
        console.log("Given credentials:", credentials);
        console.log("Expected adminUser:", adminUser);
        console.log("Expected adminPass:", adminPass);

        if (credentials?.username === adminUser && credentials?.password === adminPass) {
          console.log("SUCCESS!");
          return { id: "1", name: adminUser, email: "admin@organicfyoficial.com.br" };
        }
        console.log("FAILED MATCH");
        return null;
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
})
