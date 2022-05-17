import React from "react";

interface Props {
    optional?: Boolean;
}
type LabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export const FieldLabel: React.FC<Props & LabelProps> = ({ optional, children, ...rest }) => {
    return (
        <label {...rest} className="bpl-flex bpl-justify-between bpl-mb-1 bpl-text-sm">
            <span>{children}</span>
            {optional ? <span className="bpl-text-base-400">(optional)</span> : null}
        </label>
    );
};
