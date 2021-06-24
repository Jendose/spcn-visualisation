import { EffectCallback, useEffect, useRef } from 'react';

// вызывает callback-функцию, при изменении deps (кроме начального)
export function useDidUpdateEffect(callback: EffectCallback | Function, deps: Array<any>) {
    const didMountRef = useRef(false);

    return useEffect(() => {
        if (didMountRef.current) {
            callback();
        } else {
            didMountRef.current = true;
        }
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

// вызывает callback-функцию, при изменении deps (в т.ч. при начальном)
export function useDidUpdateEffectWithInit(callback: EffectCallback | Function, deps: Array<any>) {

    return useEffect(() => {
        callback();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}