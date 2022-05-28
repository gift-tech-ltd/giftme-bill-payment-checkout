import React, { Fragment, useEffect, useRef, useState } from "react";

interface Props {
    expression: string;
    value: string;
}
export const ValidateAccountNumber: React.FC<Props> = ({ expression, value }) => {
    const [isValid, setValid] = useState(true);
    useEffect(() => {
        if (expression.length > 0 && value.length > 0) {
            const result = new RegExp(expression).test(value);
            if (result) {
                setValid(true);
            } else {
                setValid(false);
            }
        } else {
            setValid(true);
        }
    }, [expression, value]);

    if (isValid) {
        return null;
    }

    return (
        <Fragment>
            <div data-field-error={true} className="bpl-text-sm bpl-p-2 bpl-rounded bpl-bg-red-100 bpl-text-left bpl-text-red-600">
                Invalid Account Number
            </div>
        </Fragment>
    );
};
