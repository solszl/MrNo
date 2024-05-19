import { customAlphabet } from "nanoid";
const gen = (len) => {
  return customAlphabet("1234567890abcdef", len)();
};

export const guid = () => {
  return `${gen(8)}-${gen(4)}-${gen(4)}-${gen(4)}-${gen(12)}`;
};
