import create from 'zustand';
import { CardType } from '@/Common/@types/CardType';
import { PayResponseType } from '@/Common/@types/PayResponseType';

const c = {
    success: true,
    message: 'Your bill has been paid. A receipt was sent to your email.',
    data: { id: 10024, total: '1,050.00', unit_cost: '1,000.00', fee: '50.00', currency: 'JMD', name: 'harry' },
};
export interface IStore {
    state: PayResponseType;
    addResponse: (data: PayResponseType) => void;
    removeResponse: () => void;
}
const useStore = create<IStore>((set) => ({
    state: {} as PayResponseType,

    addResponse: (data: PayResponseType) => {
        set(() => {
            return {
                state: data,
            };
        });
    },
    removeResponse: () => {
        set(() => {
            return {
                state: {} as PayResponseType,
            };
        });
    },
}));

export const usePaymentStore = useStore;
