import React from "react";

interface Props {
    style?: React.CSSProperties;
    align?: "left" | "center" | "right";
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    colorShade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}
export const SectionHeader: React.FC<Props> = ({ children, colorShade = 700, size = "4xl", style, align = "left" }) => {
    return (
        <h2 style={style} className={`bpl-text-${size} bpl-text-2xl bpl-font-medium bpl-text-${align} bpl-capitalize bpl-text-base-${colorShade}`}>
            {children}
        </h2>
    );
};
