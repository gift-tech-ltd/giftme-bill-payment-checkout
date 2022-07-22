import { BillerType } from '@/Common/@types/BillerType';

// 'JPM'
export function getMainUtilities(billers: BillerType[], codes: string[] = ['PS', 'NW', 'FL', 'CW', 'DC']) {
    return billers.filter((biller) => codes.includes(biller.Code));
}

export function orderByUtility(billers: any[], by = ['PS', 'NW', 'FL', 'CW', 'DC']) {
    const cloneBillers: any[] = [];
    by.forEach((code) => {
        const index = billers.findIndex((b) => b.Code === code);
        if (index > -1) {
            cloneBillers.push(billers[index]);
        }
    });
    return cloneBillers;
}
export const utilityMap: Record<string, any> = {
    // JPM: { code: 'JPS', name: 'Jamaica Public Service (JPS)' },
    PS: { code: 'PS', short_name: 'JPS', name: 'Jamaica Public Service (JPS)' },
    NW: { code: 'NWC', short_name: 'NWC', name: 'National Water Commission (NWC)' },
    // 8-9 digits
    FL: { code: 'FLow', short_name: 'FLow', name: 'Flow (Landline, Internet, Mobile)' },
    CW: { code: 'Lime', short_name: 'Lime', name: 'Lime (Landline, Internet, Mobile - 13 Digits)' },
    DC: { code: 'Digicel', short_name: 'Digicel', name: 'Digicel Play' },
};

export function transformUtility(biller: BillerType[]) {
    return biller.map((item) => {
        return {
            label: utilityMap[item.Code].code,
            id: item.Code,
            short_name: utilityMap[item.Code].short_name,
            name: utilityMap[item.Code].name,
            validationExp: item.ValidationExpr,
        };
    });
}
