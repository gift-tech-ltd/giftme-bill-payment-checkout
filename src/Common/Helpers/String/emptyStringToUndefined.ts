export function emptyStringToUndefined(val: string) {
    if (val === '') {
        return undefined;
    }
    return val;
}
