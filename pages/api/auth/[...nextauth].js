// next-auth.js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import EmailProvider from 'next-auth/providers/email';
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// const nodemailer = require('nodemailer');

// import MongodbAapter from "@next-auth/mongodb-adapter";

import { connectToDB } from '@/utils/mongodb'; // Update the correct path to the mongodb.js file
import User from '@/model/user';


export default NextAuth({

  session: {
    maxAge: 2 * 60 * 60, // 1 hour
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectToDB().catch(error => {error: "Database connection failed...!"})

        console.log('cred==', credentials)
        const user = await User.findOne({ email: credentials.email });

        if(!user || !(await compare(credentials.password, user.password))){
          console.log('no user')
          return null
          // throw new Error("No user Found with Email, Please Sign Up!")
      }

      return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  //   EmailProvider({
  //     server: {
  //       host: process.env.EMAIL_SERVER_HOST,
  //       port: process.env.EMAIL_SERVER_PORT,
  //       auth: {
  //         user: process.env.EMAIL_SERVER_USER,
  //         pass: process.env.EMAIL_SERVER_PASSWORD,
  //       },
  //     },
  //     from: process.env.EMAIL_FROM,
  //   }),
  ],

  callbacks: {
    async signIn({user, account, profile, session}) {
      console.log('user==', user, 'profile==', profile, 'account==', account, 'session', session)
   
      try {
        await connectToDB()
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            firstName: user.name,
            email: user.email,
            profileImg: user.image,
            role: 'learner', // default role for new users
          });
          await newUser.save();
        }
        return existingUser
           
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
  },
  session: async ({ session, token }) => {
    // const sessionUser = await User.findOne({ email: session.user.email });
    const sessionUser = await User.findOne({ email: session.user.email }).select('-password');
    return {
      ...session,
      user: {
        ...session.user,
        name: `${sessionUser.firstName} ${sessionUser.lastName}`,
        id: sessionUser._id,
        role: sessionUser.role,
        profileImg: sessionUser.profileImg,
        randomKey: token.randomKey,
      },
    };
  },
  jwt: async ({ token, user }) => {
    console.log("JWT Callback", { token, user });
    if (user) {
      token.accessToken = user.accessToken;
      return {
        ...token,
        id: user.id,
        randomKey: user.randomKey,
      };
    }
    
    return token;
  },
}
});

// export { handler as GET, handler as POST }
