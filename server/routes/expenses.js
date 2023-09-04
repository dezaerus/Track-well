import express from "express";
import {
  getExpenses,
  createExpense,
} from "../controllers/expense.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getExpenses);

/* CREATE */

router.post("/", verifyToken, createExpense);

export default router;
