import { Fragment } from 'react';
import { CardCodeForm } from '@/Modules/BillPayment/Components/Forms/CardCodeForm';

interface Props {
    children?: React.ReactNode;
}
export const VerifyCard: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <div className=" bpl-h-full bpl-flex bpl-justify-start bpl-py-3 bpl-flex-col">
                <h1 className="bpl-text-center bpl-text-xl bpl-font-semibold bpl-text-base-800">
                    Pay your bills online with your Giftme Smart Card.
                </h1>
                <CardCodeForm />
            </div>
        </Fragment>
    );
};
