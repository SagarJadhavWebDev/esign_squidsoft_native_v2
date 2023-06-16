import * as Yup from "yup";

const LoginValidations = Yup.object({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter valid password"),
});

export default LoginValidations;
