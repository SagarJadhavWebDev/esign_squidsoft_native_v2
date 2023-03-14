const ValidateEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
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
