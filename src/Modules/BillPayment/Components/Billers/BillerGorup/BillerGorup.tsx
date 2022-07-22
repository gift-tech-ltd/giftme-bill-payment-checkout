import React, { Fragment } from 'react';
import { useItemSelect } from '@/Common/Hooks/useItemSelect';
import { radioColorMap } from '@/Common/Configs/RadioConfig';
// import { BillerItem } from "@/Modules/BillPayment/Components/Billers/BillerItem/BillerItem";

type Item = {
    id: string | number;
    label: string;
    short_name: string;
    description?: React.ReactNode | string | undefined;
};
type ItemExtended = { [key: string]: any } & Item;
interface Props {
    color?: keyof typeof radioColorMap;
    activeColor?: keyof typeof radioColorMap;
    onChange: (data: ItemExtended) => void;
    defaultValue?: string | number;
    options: ItemExtended[];
    showIcon?: boolean;
}
interface ChildrenProps {
    children: (
        props: Omit<Props, 'options' | 'defaultValue'> & { item: ItemExtended; isSelected?: boolean }
    ) => React.ReactNode;
}

export const BillerGroup: React.FC<Props & ChildrenProps> = ({
    children,
    onChange,
    options,
    showIcon,
    defaultValue,
    color,
    activeColor,
}) => {
    const { isSelected, onSelect, list } = useItemSelect(options, onChange, defaultValue);
    return (
        <Fragment>
            {list.map((item) => {
                return children({
                    item,
                    isSelected: isSelected(item),
                    onChange: onSelect,
                    showIcon,
                    color,
                    activeColor,
                });
                // <BillerItem
                //     key={item.id}
                //     value={item}
                //     color={color}
                //     showIcon={showIcon}
                //     activeColor={activeColor}
                //     onChange={onSelect}
                //     isSelected={isSelected(item)}
                // >
                //     {({ label: name }) => {
                //         return name;
                //     }}
                // </BillerItem>
            })}
        </Fragment>
    );
};
