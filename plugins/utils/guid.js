import { customAlphabet } from "nanoid";
const ALPHABET = "1234567890abcdef";

const gen = (len) => {
  return customAlphabet(ALPHABET, len)();
};
export const guid = () => {
  return `${gen(8)}-${gen(4)}-${gen(4)}-${gen(4)}-${gen(12)}`;
};
