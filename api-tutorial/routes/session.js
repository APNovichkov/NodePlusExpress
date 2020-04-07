// Express lets us use Routers to create modular routes without having to mount them
// directly into the express application instance

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
