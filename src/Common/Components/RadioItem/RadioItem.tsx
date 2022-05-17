import clsx from "clsx";
import React from "react";
import { radioColorMap } from "@/Common/Configs/RadioConfig";

interface Props {
    value: {
        id: string | number;
        label: React.ReactNode | string;
        description?: React.ReactNode | string | undefined;
    };
    color?: keyof typeof radioColorMap;
    activeColor?: keyof typeof radioColorMap;
    isSelected?: boolean;
    showIcon?: boolean;
    onChange: Function;
    children: (data: { id: string | number; label: React.ReactNode | string; description?: React.ReactNode | string | undefined }) => React.ReactNode;
}

function getColorClassName(color: keyof typeof radioColorMap) {
    return radioColorMap[color];
}

export const RadioItem: React.FC<Props> = ({ children, isSelected, showIcon, value, onChange, color = "neutral", activeColor = "primary" }) => {
    const { id, label, description } = value;
    return (
        <div
            role={"radio"}
            onClick={() => onChange(value)}
            className={`bpl-relative bpl-w-full bpl-px-3 bpl-py-3.5 bpl-rounded bpl-overflow-hidden bpl-cursor-pointer ${clsx({
                "bpl-text-center": !showIcon,
                "bpl-flex bpl-items-center bpl-justify-start": showIcon,
                [`${getColorClassName(color)} hover:bpl-text-theme-500`]: !isSelected,
                [`${getColorClassName(activeColor)} bpl-btn-theme-500 hover:bpl-btn-theme-600`]: isSelected,
            })}`}
        >
            {showIcon ? (
                <div className="bpl-mr-4">
                    {isSelected ? (
                        <span>
                            <svg
                                className="bpl-w-6 bpl-h-6"
                                width="200px"
                                height="200px"
                                viewBox="0 0 200 200"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="checkmark-outline" fillRule="nonzero">
                                        <path
                                            d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z"
                                            id="Shape"
                                            className="bpl-text-green-100 bpl-text-theme-50 bpl-fill-current"
                                        ></path>
                                        <polygon
                                            id="Path"
                                            className="bpl-text-green-600 bpl-text-theme-600 bpl-fill-current"
                                            points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"
                                        ></polygon>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    ) : (
                        <div className="bpl-w-6 bpl-h-6 bpl-rounded-full bpl-bg-base-900" style={{ background: "#3b5c89", opacity: 0.09 }} />
                    )}
                </div>
            ) : null}
            <div>{children({ id, label, description })}</div>
        </div>
    );
};
