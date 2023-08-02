import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  user: null,
  token: null,
  expenses: [],
  incomes: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.id = null;
      state.user = null;
      state.token = null;
    },
    setExpenses: (state, action) => {
      if (state.user) {
        state.user.expenses = action.payload.expenses;
      } else {
        console.log("user has no expenses :)");
      }
    },
    setIncomes: (state, action) => {
      if (state.user) {
        state.user.incomes = action.payload.incomes;
      } else {
        console.log("user has no income :(");
      }
    },
    setExpense: (state, action) => {
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense._id === action.payload.expense_id)
          return action.payload.expense;
        return expense;
      });
      state.expenses = updatedExpenses;
    },
    setIncome: (state, action) => {
      const updatedIncomes = state.incomes.map((income) => {
        if (income._id === action.payload.income_id)
          return action.payload.income;
        return income;
      });
      state.incomes = updatedIncomes;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setExpenses,
  setIncomes,
  setExpense,
  setIncome,
} = authSlice.actions;

export default authSlice.reducer