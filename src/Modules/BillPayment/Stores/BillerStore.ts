import create from "zustand";
import { BillerType } from "@/Common/@types/BillerType";

export interface IStore {
    state: BillerType[];
    addBillers: (data: BillerType[]) => void;
    removeBillers: () => void;
}

const utilityMap: Record<string, any> = {
    JPM: { code: "JPS", name: "Jamaica Public Service(JPS)" },
    NW: { code: "NWC", name: "National Water Commission(NWC)" },
    // 8-9 digits
    FL: { code: "Flow", name: "Flow (Landline, Internet, Mobile)" },
    DC: { code: "Digicel", name: "Digicel" },
};

function transformBiller(biller: BillerType[]) {
    return biller.map((item) => {
        return {
            label: utilityMap[item.Code].code,
            id: item.Code,
            name: utilityMap[item.Code].name,
        };
    });
}

function order(billers: any[], by = ["JPM", "NW", "FL", "DC"]) {
    const cloneBillers: any[] = [];
    by.forEach((code) => {
        const index = billers.findIndex((b) => b.Code === code);
        if (index > -1) {
            cloneBillers.push(billers[index]);
        }
    });
    return cloneBillers;
}

const useStore = create<IStore>((set, get) => ({
    state: [] as BillerType[],

    addBillers: (data: BillerType[]) => {
        set(() => {
            return {
                state: data,
            };
        });
    },
    removeBillers: () => {
        set(() => {
            return {
                state: [] as BillerType[],
            };
        });
    },
    getMainUtilities(codes: string[] = ["JPM", "NW", "FL", "DC"]) {
        const billerLisData = get().state;
        return transformBiller(order(billerLisData.filter((biller) => codes.includes(biller.Code))));
    },
}));

export const useBillerStore = useStore;
