export function isEmptyProps<T extends Record<string, string | number | boolean>>(values: T, keys: (keyof T)[]) {
    return keys.every((key) => {
        if (values[key] !== "" && values[key] !== undefined && values[key] !== null) {
            return false;
        }
        return true;
    });
}
