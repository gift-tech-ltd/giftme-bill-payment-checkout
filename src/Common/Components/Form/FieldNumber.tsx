import React from "react";
import clsx from "clsx";
import { Field, FieldProps } from "formik";
import { hasFieldError } from "@/Common/Helpers/From/hasFieldError";
import NumberFormat, { NumberFormatProps } from "react-number-format";
// import { stringNumberToNumber } from 'src/app/Common/Utilities/Utilities';

export interface FieldInputNumberProps {
    minValue?: number;
    maxValue?: number;
    name: string;
}

export const FieldInputNumber: React.FC<FieldInputNumberProps & NumberFormatProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    minValue,
    maxValue,
    name,
    value,
    ...props
}) => {
    return (
        <Field name={name} id={props.id}>
            {(m: FieldProps) => {
                const field = m.field;
                const hasError = hasFieldError(m.meta);

                // console.log('TCL: field', field.value);

                return (
                    <NumberFormat
                        name={field.name}
                        className={`bpl-block bpl-w-full bpl-px-4 bpl-py-3 bpl-border bpl-rounded bpl-appearance-none ${clsx({
                            "bpl-border-red-500": hasError,
                            "bpl-border-gray-300": !hasError,
                        })}`}
                        onValueChange={(e) => {
                            // m.form.setFieldValue(field.name, e.floatValue);
                        }}
                        {...props}
                        onChange={(e: any) => {
                            field.onChange(e);

                            if (props.onChange) {
                                props.onChange(e);
                            }
                        }}
                        onBlur={(e: any) => {
                            field.onBlur(e);

                            if (props.onBlur) {
                                props.onBlur(e);
                            }
                        }}
                        value={field.value}
                        // {...field}
                    />
                );
            }}
        </Field>
    );
};
