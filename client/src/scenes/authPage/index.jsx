import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./loginSchema.js";
import { registerSchema } from "./registerSchema.js";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginPage((prevState) => !prevState);
    setIsError(false);
    setErrorMessage("");
    formik.resetForm();
  };

  const login = async (values, actions) => {
    const loginResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loggedIn = await loginResponse.json();

    if (loginResponse.ok) {
      dispatch(
        setLogin({
          id: loggedIn.id,
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setIsError(false);
      setErrorMessage("");
      actions.resetForm();
      navigate(`/profile`);
    } else {
      const error = loggedIn.msg;
      setIsError(true);
      setErrorMessage(error);
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  const register = async (values, actions) => {
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();

    if (savedUser.ok) {
      setIsError(false);
      setErrorMessage("");
      setIsLoginPage(true);
      actions.resetForm();
    } else {
      const error = savedUser.msg;
      setIsError(true);
      setErrorMessage(error);
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  const handleSubmit = async (values, actions) => {
    if (isLoginPage) {
      await login(values, actions);
    } else {
      await register(values, actions);
    }
  };

  const validationSchema = isLoginPage ? loginSchema : registerSchema;

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit: handleFormSubmit,
  } = formik;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 px-4">
      <div className="bg-white rounded-2xl w-80 h-96 shadow-xl flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold">
          {isLoginPage ? "Welcome" : "Sign Up"}
        </p>
        <form
          autoComplete="off"
          onSubmit={handleFormSubmit}
          className="flex flex-col w-full px-10"
        >
          {isError && (
            <p className="text-white h-8 p-2 flex items-center text-sm bg-red-500">
              {errorMessage}
            </p>
          )}

          {!isLoginPage && (
            <input
              placeholder="Username"
              id="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-b-2 border-gray-400 focus:outline-none focus:border-gray-900 transition ease-in py-2"
            />
          )}
          {!isLoginPage && touched.username && errors.username && (
            <div className="text-red-500 text-xs">{errors.username}</div>
          )}
          <input
            placeholder="Email"
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border-b-2 border-gray-400 focus:outline-none focus:border-gray-900 transition ease-in py-2"
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-xs">{errors.email}</div>
          )}

          <input
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="Password"
            className="border-b-2 border-gray-400 focus:outline-none focus:border-gray-900 transition ease-in py-2"
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-xs">{errors.password}</div>
          )}

          <button
            type="submit"
            className={`w-full bg-gray-700 text-white hover:bg-gray-900 transition duration-150 rounded-full py-2  px-4  mt-5 ${
              isSubmitting && "opacity-50"
            }`}
          >
            {isLoginPage ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        <span className="text-gray-500">
          {isLoginPage ? "Not a member? " : "Already have an account? "}
          <button className="hover:text-purple-700" onClick={toggleForm}>
            {isLoginPage ? "Sign up now" : "Login"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default AuthPage;
