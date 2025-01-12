export const isUserNameValid = (email: string): boolean => {
  const emailPattern = /^[A-Za-z\d]{4,30}$/;
  return emailPattern.test(email);
};

  export const isPasswordValid = (password: string): boolean => {
    const passwordPattern = /^[A-Za-z\d]{4,30}$/;
    return passwordPattern.test(password);
  };
  