import Expense from "../models/Expense.js";

/* CREATE */

export const createExpense = async (req, res) => {
  try {
    const { userId, amount, description, category, date } = req.body;
    const newExpense = new Expense({
      userId,
      amount,
      description,
      category,
      date,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(404).json({ message: "Invalid expense ID" });
  }
};

/* DELETE */

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid expense ID" });
  }
};
