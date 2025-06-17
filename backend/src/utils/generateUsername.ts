export const generateUsername = (email: string) => {
  if (!email) {
    return;
  }
  const emailPrefix = email.split("@")[0].replace(/\./g, "").toLowerCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${emailPrefix}${randomNum}`;
};
