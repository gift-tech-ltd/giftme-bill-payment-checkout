import React, { useEffect } from "react";
import PincodeInput from "pincode-input";
import "pincode-input/dist/pincode-input.min.css";

interface Props {
    onChange: (code: string) => void;
    children?: React.ReactNode;
}
export const PinInput: React.FC<Props> = ({ children, onChange }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const p = new PincodeInput("#pin-root", {
            count: 4,
            secure: false,
            previewDuration: 200,
            onInput: (value: string) => {
                onChange(value);
                console.log(value);
            },
        });
        return () => {
            if (ref.current) {
                ref.current.innerHTML = "";
            }
        };
    }, []);
    return <div ref={ref} id="pin-root"></div>;
};
