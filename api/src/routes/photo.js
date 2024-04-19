import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import uploadPhoto from "../middlewares/uploadPhoto";
import photoController from "../controllers/photo";

const router = new Router();

router.post("/photos", loginRequired, uploadPhoto, photoController.store);
router.get("/photos", photoController.index);

export default router;
