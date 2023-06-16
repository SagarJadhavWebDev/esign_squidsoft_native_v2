import * as Yup from "yup";

const profileUpdateValidations = Yup.object({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  name: Yup.string().required("Please enter your name"),
  // phone_number: Yup.string()
  //   .required("Please enter your phone number")
  //   .nullable(),
});

export default profileUpdateValidations;
