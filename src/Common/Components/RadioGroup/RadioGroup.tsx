import React, { Fragment } from 'react';
import { useItemSelect } from '@/Common/Hooks/useItemSelect';
import { RadioItem } from '@/Common/Components/RadioItem/RadioItem';
import { radioColorMap } from '@/Common/Configs/RadioConfig';

interface Props {
    color?: keyof typeof radioColorMap;
    activeColor?: keyof typeof radioColorMap;
    onChange: (data: { id: string | number; label: string }) => void;
    defaultValue?: string | number;
    options: { id: string | number; label: string; description?: string }[];
    showIcon?: boolean;
}

export const RadioGroup: React.FC<Props> = ({ onChange, options, showIcon, defaultValue, color, activeColor }) => {
    const { isSelected, onSelect, list } = useItemSelect(options, onChange, defaultValue);
    return (
        <Fragment>
            {list.map((item) => {
                return (
                    <RadioItem
                        key={item.id}
                        value={item}
                        color={color}
                        showIcon={showIcon}
                        activeColor={activeColor}
                        onChange={onSelect}
                        isSelected={isSelected(item)}
                    >
                        {({ label: name }) => {
                            return name;
                        }}
                    </RadioItem>
                );
            })}
        </Fragment>
    );
};
