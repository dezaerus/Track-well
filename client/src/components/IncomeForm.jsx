import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const categories = ["Salary", "Freelance", "Investment", "Gift", "Other"];

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
});

const IncomeForm = () => {
  const userId = useSelector((state) => state.id);
  const token = useSelector((state) => state.token)
  const handleSubmit = async (values, actions) => {
    try {
      const formData = {
        ...values,
        userId
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">Income Tracker</h1>
        <Formik
          initialValues={{
            amount: "",
            description: "",
            category: "",
            date: "",
          }}
          validationSchema={validationSchema}
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
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Add Income
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default IncomeForm;
