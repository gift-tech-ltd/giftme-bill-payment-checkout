import React from "react";
import flatten from "flat";
import { Field, getIn } from "formik";

interface Props {
    name: string;
    style?: React.CSSProperties;
    /* used for custom error message */
    children?: (props: { error: string; name: string }) => React.ReactNode;
}

type FormData = { [key: string]: any };

export const FieldError: React.FC<Props> = ({ name, style, children }) => {
    const formatID = name.replace(/[.]/g, "_");

    return (
        <Field name={name}>
            {({ form }: FormData) => {
                const error = getIn(flatten.unflatten(form.errors), name);
                const touch = getIn(flatten.unflatten(form.touched), name);

                if (children) {
                    if (touch && error) {
                        if (typeof error === "string") {
                            return children({ error: error, name });
                        }
                    }
                    return null;
                }

                return touch && error ? (
                    <div data-field-error={true} className="bpl-text-sm bpl-text-left bpl-text-red-600" id={`${formatID}_error`} style={style}>
                        {error}
                    </div>
                ) : null;
            }}
        </Field>
    );
};
