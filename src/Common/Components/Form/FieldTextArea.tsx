import * as React from "react";
import clsx from "clsx";
import { Field, FieldProps } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { hasFieldError } from "@/Common/Helpers/From/hasFieldError";

interface Props {
    maxLength?: number;
    showCount?: boolean;
}
export const FieldTextArea: React.FC<React.InputHTMLAttributes<HTMLInputElement> & Props> = ({ ...props }) => {
    const { maxLength, showCount, ...others } = props;
    return (
        <Field name={props.name!}>
            {({ field, form, meta }: FieldProps) => {
                const hasError = hasFieldError(meta);
                const { name, onBlur, onChange, value } = field;

                const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.currentTarget) {
                        if (maxLength) {
                            form.setFieldValue(name, e.currentTarget.value.slice(0, maxLength - 1));
                        }
                    }
                };

                return (
                    <div className="bpl-relative">
                        <TextareaAutosize
                            style={{ resize: "none" }}
                            className={`bpl-block bpl-w-full bpl-px-4 bpl-border bpl-rounded bpl-appearance-none ${clsx({
                                "bpl-pt-3 bpl-pb-7": showCount,
                                "bpl-py-3": !showCount,
                                "bpl-border-red-500": hasError,
                                "bpl-border-gray-300": !hasError,
                            })}`}
                            {...(others as any)}
                            minRows={3}
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            onKeyDown={onKeyDown}
                        />
                        {showCount && maxLength && (
                            <div className="bpl-absolute bpl-bottom-1 bpl-bg-base-200 bpl-rounded-full bpl-py-1 bpl-px-2 bpl-right-1 bpl-mt-1 bpl-text-xs bpl-font-semibold bpl-text-right">
                                <span className="bpl-text-gray-700">{value.length}</span>/
                                <span
                                    className={clsx({
                                        "bpl-text-gray-700": value.length > maxLength,
                                        "bpl-text-gray-500": value.length < maxLength,
                                    })}
                                >
                                    {maxLength}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};
