import { apiMethods, notFound } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  PATCH: {
    handler: async (req, res) => {
      const id = req.query.id.toString();
      const idea = await db.idea.findUnique({
        where: { id },
      });
      if (!idea) {
        return notFound(res);
      }
      const updatedIdea = await db.idea.update({
        where: { id },
        data: { voteCount: idea.voteCount + 1 },
      });
      res.json(updatedIdea);
    },
  },
});
