import { v4 as uuidv4 } from "uuid";

export const generateUsername = (email: string) => {
  if (!email) {
    return;
  }
  const uuid = uuidv4();
  const uuidPart = uuid.split("-")[0];
  const emailPrefix = email.split("@")[0].replace(/\./g, "").toLowerCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${emailPrefix}${randomNum}${uuidPart}`;
};
