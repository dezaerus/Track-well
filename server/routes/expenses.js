import express from "express";
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getExpense);

router.get("/", verifyToken, getExpenses);

/* CREATE */

router.post("/", verifyToken, createExpense);

/* UPDATE */

router.put("/:id", verifyToken, updateExpense);

/* DELETE */

router.delete("/:id", verifyToken, deleteExpense);

export default router;
