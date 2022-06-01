import { Fragment } from 'react';
import { CardCodeForm } from '@/Modules/BillPayment/Components/Forms/CardCodeForm';

interface Props {
    children?: React.ReactNode;
}
export const VerifyCard: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <div className=" bpl-h-full bpl-flex bpl-justify-start bpl-py-3 bpl-flex-col">
                <CardCodeForm />
            </div>
        </Fragment>
    );
};
