import create from 'zustand';
import { persist } from 'zustand/middleware';
import { CardType } from '@/Common/@types/CardType';

export interface IStore {
    state: CardType;
    removeCard: () => void;
    addCard: (data: CardType) => void;
}
const useStore = create<IStore>()(
    persist(
        (set) => ({
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
