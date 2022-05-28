import clsx from "clsx";
import React from "react";
import InputMask from "react-input-mask";
import { removeSpace } from "@/Common/Helpers/String/removeSpace";
import { hasFieldError } from "@/Common/Helpers/From/hasFieldError";
import { Field, FieldAttributes, FieldProps, GenericFieldHTMLAttributes } from "formik";

type Props = Omit<FieldAttributes<GenericFieldHTMLAttributes>, "value"> & {
    children?: any;
    value?: any;
    mask?: string | Array<string | RegExp>;
};

export const FieldInputMask: React.FC<Props> = ({ children, className, mask, ...props }) => {
    // "99/99/9999"
    const _m = new RegExp(mask as string);
    //https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
    function convertToMaskInput(regex: any) {
        return new RegExp(regex).source
            .replace(/^\^|\$$/g, "")
            .replace(/\\d/g, "#")
            .replace(/\[0-9]/g, "#")
            .replace(/\(([^)]*)\)|\[([^^])\]|\\([\\/.(){}[\]])/g, "$1$2$3")
            .replace(/([\w#.-])\{(\d+)\}/gi, function (_, c, n) {
                return Array(+n + 1).join(c);
            });
    }
    const maskInput = convertToMaskInput(_m);
    console.log("🚀 ~ file: FieldInputMask.tsx ~ line 27 ~ maskInput", mask, maskInput);
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
                    <InputMask
                        mask={[_m]}
                        {...(props as any)}
                        className={`bpl-block bpl-w-full bpl-px-4 bpl-py-3 bpl-border bpl-rounded bpl-appearance-none ${clsx({
                            "bpl-border-red-500 placeholder:bpl-text-red-500": hasError,
                            "bpl-border-base-300": !hasError,
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
