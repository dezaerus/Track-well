import Income from "../models/Income.js";

/* CREATE */

export const createIncome = async (req, res) => {
  try {
    const { userId, amount, description, category, date } = req.body;

    const newIncome = new Income({
      userId,
      amount,
      description,
      category,
      date,
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */

export const getIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await Income.find({ userId: userId });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const income = await Income.findById(incomeId);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(404).json({ message: "Invalid income ID" });
  }
};

/* DELETE */

export const deleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;

    const deletedIncome = await Income.findByIdAndDelete(incomeId);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid income ID" });
  }
};
