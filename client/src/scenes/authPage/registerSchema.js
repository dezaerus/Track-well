import * as yup from "yup";

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const registerSchema = yup.object().shape({
  username: yup.string().min(4).required("Required"),
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a stronger password" })
    .required("Required"),
});
