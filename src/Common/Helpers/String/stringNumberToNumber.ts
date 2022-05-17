export const stringNumberToNumber = (val: string | number | null) => {
    if (typeof val === 'number' || val === null) {
        return val || 0;
    }

    const cleanString = val.replace(/[,$]/g, '');
    if (cleanString === '') {
        return 0;
    }

    return parseFloat(cleanString);
};
