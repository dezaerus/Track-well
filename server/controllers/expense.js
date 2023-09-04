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
