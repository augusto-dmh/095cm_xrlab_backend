import { Router } from "express";
import csvController from "../controllers/csv";

const router = new Router();

router.get(
  "/process-csv/mostActiveUsers",
  csvController.processCsvMostActiveUsers
);
router.get(
  "/download-csv/mostActiveUsers",
  csvController.downloadCsvMostActiveUsers
);

export default router;
