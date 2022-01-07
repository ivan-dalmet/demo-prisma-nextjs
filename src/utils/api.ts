import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
type Methods = {
  [key in HttpVerbs]?: {
    isPublic?: boolean;
    handler(req: NextApiRequest, res: NextApiResponse): void;
  };
};

export const badRequest = (res: NextApiResponse) => {
  return res.status(400).end();
};

export const notSignedIn = (res: NextApiResponse) => {
  return res.status(401).end();
};

export const notFound = (res: NextApiResponse) => {
  return res.status(404).end();
};

export const apiMethods =
  (methods: Methods = {}) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const method = methods[req.method];

    if (!method) {
      return res.status(405).end();
    }

    if (!method.isPublic) {
      const session = await getSession({ req });
      if (!session) {
        return notSignedIn(res);
      }
    }

    await new Promise((r) => setTimeout(r, 1000));

    return method.handler(req, res);
  };
