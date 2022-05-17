import React from "react";

import "./button.css";

interface CSSModule {
    [className: string]: string;
}

const colorMap = {
    primary: `bp-button-primary`,
    secondary: `bp-button-secondary`,
    tertiary: "bp-bg-secondary hover:bp-bg-primary bp-text-white",
    quaternary: "bp-button-quaternary",
    danger: "bp-bg-red-500 hover:bp-bg-red-600 bp-text-white",
    neutral: "bp-bg-base-200 hover:bp-bg-base-300",
    success: "bp-bg-green-500 hover:bp-bg-green-600 bp-text-white",
    error: "bp-bg-red-500 hover:bp-bg-red-600 bp-text-white",
    warning: "bp-bg-orange-500 hover:bp-bg-orange-600 bp-text-white",
    info: "bp-bg-blue-500 hover:bp-bg-blue-600 bp-text-white",
    light: "bp-bg-gray-100 hover:bp-bg-gray-200 bp-text-gray-800",
    dark: "bp-bg-gray-800 hover:bp-bg-gray-900 bp-text-white",
    none: "",
};

const sizeMap = {
    xs: "bp-button-xs",
    sm: "bp-button-sm",
    md: "bp-button-md",
    base: "bp-py-4 bp-px-7 bp-text-base",
    lg: "bp-button-lg",
    xl: "bp-button-xl",
    "2xl": "bp-button-2xl",
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
    return `${colorMap[color || "primary"]} ${block ? "bp-w-full bp- block" : "bp-inline-block"} ${disabled ? "bp-cursor-not-allowed" : ""} bp-rounded ${
        sizeMap[size || "base"]
    } ${loading ? "spinner" : ""} bp-text-center bp-leading-none bp-transition-colors bp- duration-300 ${className || ""}`;
    // return `${classes} ${loading ? 'spinner' : ''} ${attributes.className || ''} rounded font-bold`;
}
