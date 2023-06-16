import * as Yup from "yup";

const RegisterValidations = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter valid password"),
  terms_accepted: Yup.boolean()
    .required("Please accept terms and condition to continue")
    .isTrue("Please accept terms and condition to continue"),
});

export default RegisterValidations;
