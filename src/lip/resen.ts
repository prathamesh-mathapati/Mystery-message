import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';
import  VerificationEmail  from '../../emails/EmailTemplate';

export const resend = new Resend(process.env.RESEND_API_KEY);

