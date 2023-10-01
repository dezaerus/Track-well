import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const categories = [
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Utilities",
  "Health",
  "Education",
  "Other",
];

const ExpenseSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
});

const ExpenseForm = () => {
  const userId = useSelector((state) => state.id);
  const token = useSelector((state) => state.token);
  const expenses = useSelector((state) => state.expenses);

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleDateString();
  };

  const handleSubmit = async (values, actions) => {
    try {
      const formData = {
        ...values,
        userId,
      };
      const response = await fetch("http://localhost:3001/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error submitting expense:", response.message);
        actions.setSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting expense", error);
      actions.setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen md:flex-row">
      <div className="p-4 md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Expense Form</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Formik
            initialValues={{
              amount: "",
              description: "",
              category: "",
              date: "",
            }}
            validationSchema={ExpenseSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount:
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className="mt-1 p-2 border w-full rounded"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 p-2 border w-full rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="mt-1 p-2 border w-full rounded"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 p-2 border w-full rounded"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              >
                Add Expense
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Expenses</h1>
        <ul className="bg-white rounded-lg shadow-lg p-6">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="border-b border-gray-300 py-2 flex justify-between items-center"
            >
              <div>
                <span className="text-lg font-semibold">
                  {expense.description}
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  {formatDate(expense.date)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-semibold text-red-600">
                 - ${expense.amount}
                </span>
                <span className="ml-2 text-gray-600">
                  Category: {expense.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;
