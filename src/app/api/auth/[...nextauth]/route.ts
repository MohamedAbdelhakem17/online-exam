import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Log in",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
            },
            async authorize(credentials: { username: string; password: string }, req: Request) {
                console.log(credentials);

                const { username, password } = credentials;

                // Replace with your actual authentication logic
                if (username === "admin" && password === "password") {
                    return { id: "1", name: "Admin", email: "admin@example.com" };
                }

                return null;
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string
        })
    ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
