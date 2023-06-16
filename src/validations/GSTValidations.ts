import * as Yup from "yup";

const GSTValidations = Yup.object({
  company_name: Yup.string().required("Please enter your company name"),
  gstin: Yup.string()
    .matches(
      /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/,
      "Pleaes enter valid GSTIN"
    )
    .required("Please enter GSTIN number"),
});

export default GSTValidations;
