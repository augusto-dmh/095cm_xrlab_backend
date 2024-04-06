import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import studentController from "../controllers/student";

const router = new Router();

router.post("/students", loginRequired, studentController.store);
router.get("/students", studentController.index);
router.get("/students/:id", studentController.show);
router.put("/students/:id", loginRequired, studentController.update);
router.delete("/students/:id", loginRequired, studentController.destroy);

export default router;
