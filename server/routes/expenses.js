import express from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../controllers/expense.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getExpenses);

/* CREATE */

router.post("/", verifyToken, createExpense);

/* DELETE */

router.delete("/:id", verifyToken, deleteExpense);

export default router;
