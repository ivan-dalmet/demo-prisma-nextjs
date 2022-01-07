import { apiMethods, badRequest } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    isPublic: true,
    handler: async (req, res) => {
      const ideas = await db.idea.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.json({ data: ideas });
    },
  },
  POST: {
    isPublic: true,
    handler: async (req, res) => {
      if (!req.body) {
        return badRequest(res);
      }
      const idea = await db.idea.create({
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });
      res.json({ data: idea });
    },
  },
});
