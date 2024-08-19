import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';
import  VerificationEmail  from '../../emails/EmailTemplate';
console.log(process.env.RESEND_API_KEY,"process.env.RESEND_API_KEY")
export const resend = new Resend(process.env.RESEND_API_KEY);

