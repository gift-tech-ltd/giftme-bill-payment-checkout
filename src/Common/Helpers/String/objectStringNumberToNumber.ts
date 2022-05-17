import { stringNumberToNumber } from './stringNumberToNumber';

export function objectStringNumberToNumber<T extends Object>(obj: T, keys: (keyof T)[]) {
    const cloned = Object.assign(obj, {}) as { [keys: string]: any };
    const k = Object.keys(cloned);
    k.forEach((e) => {
        if (keys.includes(e as any)) {
            cloned[e] = stringNumberToNumber(cloned[e]);
        }
    });
    return cloned;
}
