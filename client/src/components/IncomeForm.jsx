import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const categories = ["Salary", "Freelance", "Investment", "Gift", "Other"];

const IncomeSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
});

const IncomeForm = () => {
  const userId = useSelector((state) => state.id);
  const token = useSelector((state) => state.token);
  const incomes = useSelector((state) => state.incomes);

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
      const response = await fetch("http://localhost:3001/income/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error submitting income:", response.message);
        actions.setSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting income:", error);
      actions.setSubmitting(false);
    }
  };
  return (

    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Income</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Formik
            initialValues={{
              amount: "",
              description: "",
              category: "",
              date: "",
            }}
            validationSchema={IncomeSchema}
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
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              >
                Add Income
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Incomes</h1>
        <ul className="bg-white rounded-lg shadow-lg p-6">
          {incomes.map((income) => (
            <li
              key={income._id}
              className="border-b border-gray-300 py-2 flex justify-between items-center"
            >
              <div>
                <span className="text-lg font-semibold">
                  {income.description}
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  {formatDate(income.date)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-semibold text-green-600">
                 + ${income.amount}
                </span>
                <span className="ml-2 text-gray-600">
                  Category: {income.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeForm;
