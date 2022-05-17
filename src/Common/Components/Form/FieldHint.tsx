import React from "react";

export const FieldHint: React.FC = ({ children }) => {
    return (
        <span className="bpl-block bpl-pl-1 bpl-mb-1 bpl--mt-1 bpl-text-xs bpl-leading-4 bpl-transition-colors bpl-duration-300 bpl-border-l-2 bpl-border-solid bpl-text-base-500 bpl-border-base-300 hover:bpl-text-base-600">
            {children}
        </span>
    );
};
