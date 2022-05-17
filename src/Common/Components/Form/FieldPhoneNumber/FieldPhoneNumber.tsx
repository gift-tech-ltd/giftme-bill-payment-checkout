import React from 'react';
import { Field, FieldProps } from 'formik';

import 'react-phone-number-input/style.css';
import PhoneInput, { Props } from 'react-phone-number-input';
import './FieldPhoneNumber.css';
import { hasFieldError } from '@/Common/Helpers/From/hasFieldError';
import { appendStyle } from '@/Common/Helpers/Dom/appendStyle';

// import { stringNumberToNumber } from 'src/app/Common/Utilities/Utilities';

export interface FieldPhoneNumberProps {
    id: string;
    name: string;
    type?: string;
    className?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: ((event: React.FocusEvent<string>) => void) | undefined;
}

function applyError(hasError: boolean) {
    const $input = document.querySelector('.PhoneInput .PhoneInputInput');
    if ($input) {
        if (hasError) {
            $input.classList.add('ck-border-red-500', 'placeholder:ck-text-red-500');
            $input.classList.remove('ck-border-base-300');
            // .PhoneInput .PhoneInputInput
            console.log('hasError', hasError);
        } else {
            $input.classList.add('ck-border-base-300');
            $input.classList.remove('ck-border-red-500', 'placeholder:ck-text-red-500');
        }
    }
}

export const FieldPhoneNumber: React.FC<
    Omit<Props<React.HTMLAttributes<HTMLInputElement>>, 'onChange'> & FieldPhoneNumberProps
> = ({ name, value, className, ...props }) => {
    return (
        <Field name={name}>
            {(m: FieldProps) => {
                const field = m.field;
                const hasError = hasFieldError(m.meta);

                applyError(hasError);

                return (
                    <PhoneInput
                        placeholder="Enter phone number"
                        country={'us'}
                        {...props}
                        value={field.value}
                        // inputComponent={(props) => <input className="bg-black" {...props} />}
                        // inputComponent={}
                        onBlur={(e) => {
                            field.onBlur(e);

                            if (props.onBlur) {
                                props.onBlur(e);
                            }
                        }}
                        onChange={(phone) => {
                            m.form.setFieldValue(name, phone);

                            // if (props.onChange) {
                            //    props.onChange(e);
                            // }
                        }}
                    />
                );
            }}
        </Field>
    );
};
