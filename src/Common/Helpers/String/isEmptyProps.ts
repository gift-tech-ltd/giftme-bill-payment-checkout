export function isNotEmptyProps<T extends Record<string, string | number | boolean>>(values: T, keys: (keyof T)[]) {
    const a = keys.map((key) => {
        if (values[key] !== "" && values[key] !== undefined && values[key] !== null) {
            return {
                key,
                val: true,
            };
        }
        return {
            key,
            val: false,
        };
    });
    console.log("🚀 ~ file: isEmptyProps.ts ~ line 14 ~ a ~ a", a);
    return a.every((e) => e.val);
}
