export function isNotEmptyProps<T extends Record<string, string | number | boolean>>(values: T, keys: (keyof T)[]) {
    console.log("🚀 ~ file: isEmptyProps.ts ~ line 2 ~ keys", keys);
    const a = keys.map((key) => {
        // console.log(
        //     "🚀 ~ file: isEmptyProps.ts ~ line 4 ~ returnkeys.every ~ values[key] !==  ",
        //     key,
        //     values[key],
        //     values[key] === "",
        //     values[key] === undefined,
        //     values[key] === null
        // );
        if (values[key] !== "" && values[key] !== undefined && values[key] !== null) {
            return {
                key,
                val: false,
            };
        }
        return {
            key,
            val: true,
        };
        // return values[key] === "" && values[key] === undefined && values[key] === null;
    });
    const y = a.every((e) => e.val);
    console.log("🚀 ~ file: isEmptyProps.ts ~ line 18 ~ a ~ a", y);
    const k = keys.every((key) => {
        console.log(
            "🚀 ~ file: isEmptyProps.ts ~ line 4 ~ returnkeys.every ~ values[key] !==  ",
            key,
            values[key],
            values[key] === "",
            values[key] === undefined,
            values[key] === null
        );
        if (values[key] !== "" && values[key] !== undefined && values[key] !== null) {
            return false;
        }
        return true;
        // return values[key] === "" && values[key] === undefined && values[key] === null;
    });
    return k;
}
