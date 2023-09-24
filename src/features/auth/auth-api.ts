import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import GitHubProvider from "next-auth/providers/github";

const adminEmails = process.env.ADMIN_EMAIL_ADDRESS?.split(",").map(email => email.toLowerCase().trim()) || [];
const userEmails = process.env.USERS_EMAIL_ADDRESS?.split(",").map(email => email.toLowerCase().trim()) || [];

const configureIdentityProvider = () => {
  const providers: Array<Provider> = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        async profile(profile) {
          const newProfile = {
            ...profile,
            id: profile.sub,
            isAdmin: adminEmails.includes(profile.email.toLowerCase())
          }
          return newProfile;
        }
      })
    );
  }

  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
        async profile(profile) {
          const newProfile = {
            ...profile,
            isAdmin: adminEmails.includes(profile.email.toLowerCase())
          }
          return newProfile;
        }
      })
    );
  }

  if (
    process.env.AZURE_AD_CLIENT_ID &&
    process.env.AZURE_AD_CLIENT_SECRET &&
    process.env.AZURE_AD_TENANT_ID
  ) {
    providers.push(
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID!,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
        tenantId: process.env.AZURE_AD_TENANT_ID!,
        async profile(profile) {

          const newProfile = {
            ...profile,
            // throws error without this - unsure of the root cause (https://stackoverflow.com/questions/76244244/profile-id-is-missing-in-google-oauth-profile-response-nextauth)
            id: profile.sub,
            isAdmin: adminEmails.includes(profile.email.toLowerCase()) || adminEmails.includes(profile.preferred_username.toLowerCase())
          }
          return newProfile;
        }
      })
    );
  }
  return providers;
};

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [...configureIdentityProvider()],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser, session}) {
      if (user?.isAdmin) {
       token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({session, token, user }) {
      session.user.isAdmin = token.isAdmin as string
      return session
    },
    async signIn({ user }) {
      if (userEmails.length === 1 && userEmails[0] === "*") {
        return true;
      }
  
      return !!user && !!user.email && userEmails.includes(user.email.toLowerCase());
    }
  },
  session: {
    strategy: "jwt",
  },
};

export const handlers = NextAuth(options);
