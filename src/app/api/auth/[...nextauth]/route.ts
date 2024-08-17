import NextAuth from "next-auth/next";
import { authOptoins } from "./options";

const handler= NextAuth(authOptoins)

export {handler as Get, handler as POST}