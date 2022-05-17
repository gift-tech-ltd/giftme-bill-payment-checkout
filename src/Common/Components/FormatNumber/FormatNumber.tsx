import React from 'react';
import numeral from 'numeral';

interface Props {
    children: string | number;
    format?: string;
    prefix?: string;
    suffix?: string;
}

export const FormatNumber: React.FC<Props> = ({ children, prefix, suffix, format = '0,0' }) => {
    return (
        <React.Fragment>
            {prefix && prefix}
            {`${numeral(children).format(format)}`}
            {suffix && suffix}
        </React.Fragment>
    );
};
