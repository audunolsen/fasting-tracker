import { Concat } from "../types/concat";

export default function join<T extends string[]>(...strings: T) {
  return strings.join("") as Concat<T>;
}
