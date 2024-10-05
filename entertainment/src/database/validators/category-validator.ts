import { CONSTANTS } from "../../utils/constants";
export default function validateCategoryName(name: string): boolean {
    return typeof name === 'string' && name.trim().length > CONSTANTS.ZERO;
}