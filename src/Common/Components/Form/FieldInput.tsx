import clsx from "clsx";
import React from "react";
import { removeSpace } from "@/Common/Helpers/String/removeSpace";
import { hasFieldError } from "@/Common/Helpers/From/hasFieldError";
import { Field, FieldAttributes, FieldProps, GenericFieldHTMLAttributes } from "formik";

type Props = Omit<FieldAttributes<GenericFieldHTMLAttributes>, "value"> & {
    children?: any;
    value?: any;
};

export const FieldInput: React.FC<Props> = ({ children, className, ...props }) => {
    return (
        <Field name={props.name}>
            {({ field, meta, form }: FieldProps) => {
                const hasError = hasFieldError(meta);
                const { name, onBlur, onChange, value } = field;

                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (props.type === "email") {
                        // e.currentTarget.value = removeSpace(e.currentTarget.value);
                        // e.target.value = removeSpace(e.target.value);
                        // onChange(e);
                        form.setFieldValue(name, removeSpace(e.target.value));
                    } else {
                        onChange(e);
                    }
                };
                return (
                    <input
                        {...(props as any)}
                        className={`bpl-block bpl-w-full bpl-px-4 bpl-py-3 bpl-border bpl-rounded bpl-appearance-none ${clsx({
                            "bpl-border-red-500 placeholder:bpl-text-red-500": hasError,
                            "bpl-border-gray-300": !hasError,
                        })} ${className || ""}`}
                        name={name}
                        value={value}
                        // onInput={handleInput}
                        onChange={handleChange}
                        onBlur={onBlur}
                    />
                );
            }}
        </Field>
    );
};
