import * as Yup from "yup";

const ChangePasswordValidations = Yup.object({
  old_password: Yup.string(). required("Please enter your old password"),
  password: Yup.string().required("Please enter valid password"),
  password_confirmation: Yup.string().required(
    "Please enter valid confirm password"
  ),
});

export default ChangePasswordValidations;
