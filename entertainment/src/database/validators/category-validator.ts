
export default function validateCategoryName(name: string): boolean {
    return typeof name === 'string' && name.trim().length > 0;
}