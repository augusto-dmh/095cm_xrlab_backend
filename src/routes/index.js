import { Router } from "express";

const router = new Router();

import user from "./user";
import token from "./token";
import photo from "./photo";

const routes = [user, token, photo];

routes.forEach((route) => {
  router.use(route);
});

export default router;
