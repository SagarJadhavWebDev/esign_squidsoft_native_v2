import * as Yup from "yup";

const AddRecipientValidations = Yup.object({
  email: Yup.string()
    .email("Please enter valid recipient email")
    .required("Please enter recipient email"),
  name: Yup.string().required("Please enter recipient name"),
  action: Yup.mixed().required("Please select operation"),
});

export default AddRecipientValidations;
