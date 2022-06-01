import { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePaymentStore } from '@/Modules/BillPayment/Stores/PaymentStore';
import { SuccessMessageBox } from '@/Modules/BillPayment/Components/MessageBox/SuccesMessageBox';
import { FormatNumber } from '@/Common/Components/FormatNumber/FormatNumber';
// import { Link } from "react-router-dom";
// import { CardCodeForm } from "@/Modules/BillPayment/Components/Forms/CardCodeForm";

interface Props {
    children?: React.ReactNode;
}
export const Status: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const state = usePaymentStore((store) => store.state);

    useEffect(() => {
        if (Object.keys(state).length < 1) {
            navigate('/', { replace: true });
        }
        return () => {
            // removeResponse();
        };
    }, [state]);

    if (Object.keys(state).length > 0) {
        return (
            <Fragment>
                <SuccessMessageBox>{state.message}</SuccessMessageBox>

                <div className="bpl-pb-1 bpl-my-4">
                    <div className="bpl-rounded-lg ">
                        <h3 className="bpl-mb-3 bpl-text-2xl bpl-font-semibold bpl-text-base-900">Details</h3>
                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-text-lg bpl-capitalize bpl-text-base-700">
                            <span>Amount</span>
                            <span className="bpl-whitespace-nowrap">
                                <FormatNumber format="0,0.[00]" prefix={'$'} suffix={` ${state.data.currency}`}>
                                    {state.data.unit_cost}
                                </FormatNumber>
                            </span>
                        </div>

                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-text-lg bpl-capitalize bpl-text-base-700">
                            <span>Service fee</span>
                            <span className="bpl-whitespace-nowrap">
                                <FormatNumber format="0,0.[00]" prefix={'$'} suffix={` ${state.data.currency}`}>
                                    {state.data.fee}
                                </FormatNumber>
                            </span>
                        </div>

                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-pt-0 bpl-mt-2 bpl-text-2xl bpl-font-semibold bpl-capitalize bpl-border-t bpl-border-solid bpl-border-base-300 bpl-text-base-800">
                            <span>Total</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={'$'} suffix={` ${state.data.currency}`}>
                                    {state.data.total}
                                </FormatNumber>
                            </span>
                        </div>
                    </div>
                </div>
                <Link
                    className="bpl-duration-300 bpl-block bpl-mt-4 bpl-button-primary bpl-w-full bpl-cursor-pointer bpl-rounded bpl-py-4 bpl-px-7 bpl-text-base bpl-text-center bpl-leading-none bpl-transition-colors "
                    to={'/'}
                >
                    Pay Another Bill
                </Link>
            </Fragment>
        );
    } else {
        return null;
    }
};
