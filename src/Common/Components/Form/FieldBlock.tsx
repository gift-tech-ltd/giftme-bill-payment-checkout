import React from "react";

export const FieldBlock: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children, ...props }) => {
    return (
        <div {...props} className={`bpl-mb-7 ${props.className || ""}`}>
            {children}
        </div>
    );
};
