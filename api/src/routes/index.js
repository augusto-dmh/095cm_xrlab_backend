import { Router } from "express";

import homeRoutes from "./home";
import userRoutes from "./user";
import tokenRoutes from "./token";
import studentRoutes from "./student";
import photoRoutes from "./photo";

const router = new Router();

router.use(homeRoutes);
router.use(userRoutes);
router.use(tokenRoutes);
router.use(studentRoutes);
router.use(photoRoutes);

export default router;
