import { BillerType } from "@/Common/@types/BillerType";

export function getMainUtilities(billers: BillerType[], codes: string[] = ["JPM", "NW", "FL", "DC"]) {
    return billers.filter((biller) => codes.includes(biller.Code));
}

export function orderByUtility(billers: any[], by = ["JPM", "NW", "FL", "DC"]) {
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
    JPM: { code: "JPS", name: "Jamaica Public Service (JPS)" },
    NW: { code: "NWC", name: "National Water Commission (NWC)" },
    // 8-9 digits
    FL: { code: "Flow", name: "Flow (Landline, Internet, Mobile)" },
    DC: { code: "Digicel", name: "Digicel Play" },
};

export function transformUtility(biller: BillerType[]) {
    return biller.map((item) => {
        return {
            label: utilityMap[item.Code].code,
            id: item.Code,
            name: utilityMap[item.Code].name,
            validationExp: item.ValidationExpr,
        };
    });
}
