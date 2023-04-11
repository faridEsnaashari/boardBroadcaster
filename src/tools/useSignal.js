import { useState, useEffect } from "react";

export const useSignal = () => {
    const [ signal, setSignal ] = useState(false);

    useEffect(() => {
        if(signal){
            setSignal(false);
        }
    }, [signal]);

    const activate = signal => setSignal(signal || true);

    return [ signal, activate ];
}
