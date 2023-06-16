import * as Yup from "yup";

const CustomPlanValidations = Yup.object({
  no_of_user: Yup.string().required("Please enter no of user per month"),
  envelope: Yup.string().required("Please enter no of envelopes per month"),

  subscription_type: Yup.string().required("Please select subscription type "),
  message: Yup.string().required(
    "Please enter additional requirement"
  ),
});

export default CustomPlanValidations;
