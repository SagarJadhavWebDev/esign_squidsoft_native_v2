import * as Yup from "yup";

const CreateTeamValidations = Yup.object({
  name: Yup.string().required("Please enter your team name"),
  subscription_id: Yup.string().required(
    "Please select subscription to create team"
  ),
});

const AddUserValidations = Yup.object({
  email: Yup.string()
    .email("Please enter valid emial")
    .required("Please enter user email address"),
  team_id: Yup.string().required("Team id is required"),
});

const EditTeamValidations = Yup.object({
  name: Yup.string().required("Team name is required"),
});
export default {
  CreateTeamValidations,
  AddUserValidations,
  EditTeamValidations,
};
