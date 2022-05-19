import React from "react";

import "./button.css";

interface CSSModule {
    [className: string]: string;
}

const colorMap = {
    primary: `bpl-button-primary`,
    secondary: `bpl-button-secondary`,
    tertiary: "bpl-bg-secondary hover:bpl-bg-primary bpl-text-white",
    quaternary: "bpl-button-quaternary hover:bpl-text-primary",
    danger: "bpl-bg-red-500 hover:bpl-bg-red-600 bpl-text-white",
    neutral: "bpl-bg-base-200 hover:bpl-bg-base-300",
    success: "bpl-bg-green-500 hover:bpl-bg-green-600 bpl-text-white",
    error: "bpl-bg-red-500 hover:bpl-bg-red-600 bpl-text-white",
    warning: "bpl-bg-orange-500 hover:bpl-bg-orange-600 bpl-text-white",
    info: "bpl-bg-blue-500 hover:bpl-bg-blue-600 bpl-text-white",
    light: "bpl-bg-gray-100 hover:bpl-bg-gray-200 bpl-text-gray-800",
    dark: "bpl-bg-gray-800 hover:bpl-bg-gray-900 bpl-text-white",
    none: "",
};

const sizeMap = {
    xs: "bpl-button-xs",
    sm: "bpl-button-sm",
    md: "bpl-button-md",
    base: "bpl-py-4 bpl-px-7 bpl-text-base",
    lg: "bpl-button-lg",
    xl: "bpl-button-xl",
    "2xl": "bpl-button-2xl",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    [key: string]: any;
    outline?: boolean;
    active?: boolean;
    block?: boolean;
    size?: keyof typeof sizeMap;
    color?: keyof typeof colorMap;
    // color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
    disabled?: boolean;
    tag?: string | React.ReactType;
    innerRef?: React.Ref<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<any>;
    // size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    id?: string;
    style?: React.CSSProperties;
    cssModule?: CSSModule;
    close?: boolean;
    href?: string;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, outline, color, size, block, active, href, innerRef, children, loading, ...attributes }) => {
    const _onClick = (e: any) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        if (onClick) {
            onClick(e);
        }
    };

    const Tag: any = href ? "a" : "button";

    return (
        <>
            <Tag
                type={Tag === "button" && onClick ? "button" : undefined}
                to={href}
                {...attributes}
                className={getClasses(attributes.className, size, color, block, loading, disabled) + ""}
                ref={innerRef}
                onClick={_onClick}
                //   aria-label={ariaLabel || defaultAriaLabel}
            >
                <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
            </Tag>
        </>
    );
};
Button.defaultProps = {
    color: "primary",
};
function getClasses(className?: string, size?: keyof typeof sizeMap, color?: keyof typeof colorMap, block?: boolean, loading?: boolean, disabled?: boolean) {
    return `${colorMap[color || "primary"]} ${block ? "bpl-w-full bpl- block" : "bpl-inline-block"} ${
        disabled ? "bpl-cursor-not-allowed" : "bpl-cursor-pointer"
    } bpl-rounded ${sizeMap[size || "base"]} ${loading ? "spinner" : ""} bpl-text-center bpl-leading-none bpl-transition-colors bpl- duration-300 ${
        className || ""
    }`;
    // return `${classes} ${loading ? 'spinner' : ''} ${attributes.className || ''} rounded font-bold`;
}
