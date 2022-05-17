import React, { FormHTMLAttributes, useEffect } from "react";
import { Form } from "formik";
import isEqual from "react-fast-compare";
import useDeepCompareEffect from "use-deep-compare-effect";
import { usePrevious } from "@/Common/Hooks/usePrevious";

type C = Omit<FormHTMLAttributes<HTMLFormElement>, "onChange">;
interface Props extends C {
    onChange?: (values: Record<string, string>) => void;
    values: Record<string, any>;
}

export const FormView: React.FC<Props> = ({ children, onChange, values, ...rest }) => {
    const prev = usePrevious(values);
    const u = isEqual(prev, values);
    useDeepCompareEffect(() => {
        if (onChange) {
            onChange(values);
        }
    }, [values]);
    useEffect(() => {}, [values]);
    return <Form {...rest}>{children}</Form>;
};
