import * as Yup from "yup";

const OrganizationValidations = Yup.object({
  address_line: Yup.string().required("Please enter address line"),
  street: Yup.string().required("Please enter street"),
  city: Yup.string().required("Please Select city"),
  state: Yup.string().required("Please Select state"),
  country: Yup.string().required("Please Select country"),
  postal_code: Yup.string().required("Please enter postal code"),
});

export default OrganizationValidations;
