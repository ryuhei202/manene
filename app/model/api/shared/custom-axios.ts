import axios from "axios";
import applyCaseMiddleware, {
  PreservedKeysCondition,
} from "axios-case-converter";

export const customAxios = (
  preservedKeys?: string[] | PreservedKeysCondition
) =>
  applyCaseMiddleware(axios.create(), { preservedKeys, ignoreHeaders: true });