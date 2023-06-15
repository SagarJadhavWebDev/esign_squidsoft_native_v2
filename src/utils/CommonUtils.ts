const ValidateEmail = (email: string) => {
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};
///^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/
const ValidatePassword = (password: string) => {
  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  );
  if (passwordRegex.test(password)) {
    return true;
  }
  return false;
};
const CommonUtils = {
  ValidateEmail,
  ValidatePassword,
};
export default CommonUtils;
