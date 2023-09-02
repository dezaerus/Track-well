import ExpenseForm from "components/ExpenseForm";
import IncomeForm from "components/IncomeForm";
const Record = ({ page }) => {
  return <div>{page === "Expenses" ? <ExpenseForm /> : <IncomeForm />}</div>;
};

export default Record;
