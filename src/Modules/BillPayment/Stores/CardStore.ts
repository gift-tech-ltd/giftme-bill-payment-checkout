import create from "zustand";
import { CardType } from "@/Common/@types/CardType";

export interface IStore {
    state: CardType;
    removeCard: () => void;
    addCard: (data: CardType) => void;
}
const useStore = create<IStore>((set) => ({
    state: {} as CardType,

    addCard: (data: CardType) => {
        set(() => {
            return {
                state: data,
            };
        });
    },
    removeCard: () => {
        set(() => {
            return {
                state: {} as CardType,
            };
        });
    },
}));

export const useCardStore = useStore;
