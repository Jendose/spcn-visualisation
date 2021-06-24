import {EffectCallback, useEffect} from 'react';

export function useDidMountEffect(callback: EffectCallback | Function) {
    return useEffect(() => {
        callback()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useWillUnmountEffect(callback: EffectCallback | Function) {
    return useEffect(
        () => () => {
            callback()
        },
        []) // eslint-disable-line react-hooks/exhaustive-deps
}
