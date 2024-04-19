import { Router } from "express";
import userController from "../controllers/user";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/users", userController.store);
router.get("/users", userController.index);
router.get("/users/user", loginRequired, userController.show);
router.put("/users", loginRequired, userController.update);
router.delete("/users", loginRequired, userController.destroy);

export default router;
