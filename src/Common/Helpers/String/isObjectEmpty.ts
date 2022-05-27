export function isObjectEmpty(object: Object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}
