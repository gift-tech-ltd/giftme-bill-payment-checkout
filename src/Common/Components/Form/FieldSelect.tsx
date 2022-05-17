import React from "react";
import clsx from "clsx";
import { hasFieldError } from "@/Common/Helpers/From/hasFieldError";
import { Field, FieldAttributes, FieldProps, GenericFieldHTMLAttributes } from "formik";

type Props = Omit<FieldAttributes<GenericFieldHTMLAttributes>, "value"> & {
    children?: any;
    value?: any;
};

export const FieldSelect: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Field name={props.name}>
            {({ field, meta }: FieldProps) => {
                const hasError = hasFieldError(meta);
                const { name, onBlur, onChange, value } = field;

                function onUpdate(e: any) {
                    if (props.onChange) {
                        props.onChange(e);
                    }
                    onChange(e);
                }

                return (
                    <select
                        {...(props as any)}
                        className={`bpl-block bpl-w-full bpl-px-4 bpl-py-3 bpl-border bpl-rounded bpl-appearance-none ${clsx({
                            "bpl-border-red-500": hasError,
                            "bpl-border-gray-300": !hasError,
                        })}`}
                        name={name}
                        value={value}
                        onChange={onUpdate}
                        onBlur={onBlur}
                    >
                        {children}
                    </select>
                );
            }}
        </Field>
    );
};
