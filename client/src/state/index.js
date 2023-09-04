import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  user: null,
  token: null,
  expenses: null,
  incomes: null,
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
        state.expenses = action.payload.expenses;
      } else {
        console.log("user has no expenses :)");
      }
    },
    setIncomes: (state, action) => {
      if (state.user) {
        state.incomes = action.payload.incomes;
      } else {
        console.log("user has no income :(");
      }
    },
  },
});

export const { setLogin, setLogout, setExpenses, setIncomes } =
  authSlice.actions;

export default authSlice.reducer;
