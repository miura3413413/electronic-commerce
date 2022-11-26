import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../models/UserModel";
import db from '../../../util/connect';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await db.connectMongo()
        const email = credentials!.email;
        const user = await User.findOne({ email: email })
        await db.disconnectMongo()

        if (user) {
          return user
        } else {
          throw new Error('Invalid email or password');
        }
      }
    }),
  ],
})
