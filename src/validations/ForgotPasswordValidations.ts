import * as Yup from "yup";

const ForgotPasswordValidations = Yup.object({
  password: Yup.string().required("Please enter valid password"),
  password_confirmation: Yup.string().required(
    "Please enter valid confirm password"
  ),
  email: Yup.string().required("Email is empty"),
  token: Yup.string().required("Token is Empty"),
});

export default ForgotPasswordValidations;
