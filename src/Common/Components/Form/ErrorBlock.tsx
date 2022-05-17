import React from "react";
import { Field, getIn } from "formik";
import flatten from "flat";

interface Props {
    name: string;
    style?: React.CSSProperties;
    /* used for custom error message */
    children?: (props: { error: string; name: string; hasError: boolean }) => React.ReactNode;
}

type FormData = { [key: string]: any };

export const ErrorBlock: React.FC<Props> = ({ name, style, children }) => {
    const formatID = name.replace(/[.]/g, "_");
    // const [hasError, setHasError] = React.useState<boolean>(false);

    return (
        <Field name={name}>
            {({ form }: FormData) => {
                const error = getIn(flatten.unflatten(form.errors), name);
                const touch = getIn(flatten.unflatten(form.touched), name);

                if (children) {
                    if (touch && error) {
                        return children({ hasError: true, error: error, name });
                    } else {
                        return children({ hasError: false, error: error, name });
                    }
                }
                return null;
            }}
        </Field>
    );
};
