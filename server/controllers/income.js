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

