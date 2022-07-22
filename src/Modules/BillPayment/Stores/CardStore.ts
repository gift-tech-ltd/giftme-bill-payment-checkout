import create from 'zustand';
import { persist } from 'zustand/middleware';
import { CardType } from '@/Common/@types/CardType';
import { stringNumberToNumber } from '@/Common/Helpers/String/stringNumberToNumber';
import { FormatNumber } from '@/Common/Components/FormatNumber/FormatNumber';
import numeral from 'numeral';
export interface IStore {
    state: CardType;
    removeCard: () => void;
    addCard: (data: CardType) => void;
    updateCardBalance: (paymentValue: number) => void;
}
const useStore = create<IStore>()(
    persist(
        (set, get) => ({
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
            updateCardBalance: (paymentValue: number) => {
                const bal = stringNumberToNumber(get().state.balance) - paymentValue;
                set(() => {
                    return {
                        state: {
                            ...get().state,
                            balance: numeral(bal).format('0,0.00'),
                        },
                    };
                });
            },
        }),
        {
            name: 'cardStore',
            getStorage: () => sessionStorage,
        }
    )
);

export const useCardStore = useStore;

// const useStore = create(persist(
//     (set, get) => ({
//       fishes: 0,
//       addAFish: () => set({ fishes: get().fishes + 1 })
//     }),
//     {
//       name: "food-storage", // unique name
//       getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
//     }
//   ))
