import clsx from "clsx";
import React from "react";
import { radioColorMap } from "@/Common/Configs/RadioConfig";

type Item = {
    id: string | number;
    label: string;
    description?: React.ReactNode | string | undefined;
};
type ItemExtended = { [key: string]: any } & Item;

interface Props {
    value: ItemExtended;
    color?: keyof typeof radioColorMap;
    activeColor?: keyof typeof radioColorMap;
    isSelected?: boolean;
    showIcon?: boolean;
    onChange: Function;
    children: (data: ItemExtended) => React.ReactNode;
}

function getColorClassName(color: keyof typeof radioColorMap) {
    return radioColorMap[color];
}

export const BillerItem: React.FC<Props> = ({ children, isSelected, value, onChange, color = "neutral", activeColor = "primary" }) => {
    // const { id, label, description } = value;
    return (
        <div
            role={"radio"}
            onClick={() => onChange(value)}
            className={`bpl-p-2 bpl-flex bpl-h-20 bpl-text-center bpl-rounded bpl-justify-center bpl-items-center bpl-cursor-pointer ${clsx({
                [`${getColorClassName(color)} bpl-bg-base-100 hover:bpl-text-theme-500`]: !isSelected,
                [`${getColorClassName(activeColor)} bpl-btn-theme-500 hover:bpl-btn-theme-600`]: isSelected,
            })}`}
        >
            {children(value)}
        </div>
    );
};
