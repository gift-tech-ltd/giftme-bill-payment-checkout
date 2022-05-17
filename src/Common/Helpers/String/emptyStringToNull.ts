export function emptyStringToNull(val: string) {
    if (val === '') {
        return null;
    }
    return val;
}
