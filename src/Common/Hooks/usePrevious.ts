import { useEffect, useRef } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useDeepCompareEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
