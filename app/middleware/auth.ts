// middleware/auth.ts
import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.redirect('/login');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return false;
  }
};