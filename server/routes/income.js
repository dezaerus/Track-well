import express from "express";
import {
  getIncome,
  createIncome,
  deleteIncome,
  getIncomes,
} from "../controllers/income.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getIncome);

router.get("/", verifyToken, getIncomes);

/* CREATE */

router.post("/", verifyToken, createIncome);

/* DELETE */

router.delete("/:id", verifyToken, deleteIncome);

export default router;
