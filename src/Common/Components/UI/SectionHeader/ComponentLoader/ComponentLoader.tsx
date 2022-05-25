import React from "react";

import "./ComponentLoader.css";

interface Props {
    show?: boolean;
    color?: string;
    className?: string;
}

export const ComponentElementLoader: React.FC<Props> = ({ show, color, className }) => {
    return <div className={`component-spinner ${className}`}></div>;
};
