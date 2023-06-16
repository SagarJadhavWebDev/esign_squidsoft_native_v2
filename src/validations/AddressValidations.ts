import * as Yup from "yup";

const AddressValidations = Yup.object({
  address_line: Yup.string().required("Please enter address line"),
  street: Yup.string().required("Please enter street"),
  city: Yup.string().required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  country: Yup.string().required("Please enter country"),
  country_code: Yup.string().required("Please enter country code"),
  postal_code: Yup.string().required("Please enter postal code"),
});

export default AddressValidations;
