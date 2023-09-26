import express from "express";
import {
  createIncome,
  getIncomes,
} from "../controllers/income.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:userId", verifyToken, getIncomes);

/* CREATE */

router.post("", verifyToken, createIncome);

export default router;
