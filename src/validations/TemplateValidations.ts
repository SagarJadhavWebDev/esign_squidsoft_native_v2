import * as Yup from "yup";

const CreateTemaplateValidation = Yup.object({
  name: Yup.string().required("Please enter templates name"),
  description: Yup.string().required("Please enter templates description"),
});

export { CreateTemaplateValidation };
