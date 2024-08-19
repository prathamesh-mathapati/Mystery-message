import dbConnect from "@/lip/dbConnection";
import UserModel from "@/model/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
const bcrypt = require('bcrypt');


export const authOptoins: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect()
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifire },
              { username: credentials.identifire }
            ]
          })
          if (!user) {
            throw new Error("No user not fount in that email")
          }

          if (!user.isVerified) {
            throw new Error("Please verify your accound before login")
          }
          let isPasswordCorret = await bcrypt.compare(credentials.password, user.password)
          if (isPasswordCorret) {
            return user
          } else {
            throw new Error("Incorrect Password")
          }
        } catch (error: any) {
          throw new Error(error)
        }
      }
    })],
  pages: {
    signIn: 'signin'
  },

  callbacks: {
    async jwt({ token, user}) {
      if(user){
        token._id=user?.toString()
        token.isVerified=user?.isVerified 
        token.isAccptingMessage=user?.isAccptingMessage
        token.username=user?.username
      }
      return token
    },
    async session({ session, token }) {
      if(token){
        session.user._id=token._id
        session.user.isVerified=token.isVerified
        session.user.isAccptingMessage=token?.isAccptingMessage
        session.user.username=token?.username

      }
      return session
    }
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET

}