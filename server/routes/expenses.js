import express from "express";
import {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
} from "../controllers/expense.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getExpense);

router.get("/", verifyToken, getExpenses);

/* CREATE */

router.post("/", verifyToken, createExpense);

/* DELETE */

router.delete("/:id", verifyToken, deleteExpense);

export default router;
