import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchBillers } from '@/Modules/BillPayment/Services/BillService';
import { PaymentForm } from '@/Modules/BillPayment/Components/Forms/PaymentForm';
import { useCardStore } from '@/Modules/BillPayment/Stores/CardStore';
import { DataViewAsync } from '@/Common/Components/DataView/DataViewAsync';
import { ComponentElementLoader } from '@/Common/Components/UI/SectionHeader/ComponentLoader/ComponentLoader';
import { isObjectEmpty } from '@/Common/Helpers/String/isObjectEmpty';
import { CardType } from '@/Common/@types/CardType';
import { usePaymentStore } from '@/Modules/BillPayment/Stores/PaymentStore';

interface Props {
    children?: React.ReactNode;
}

function getFormData(data: CardType) {
    return {
        card: '',
        token: data.token || '',
        amount: '',
        name: data.receiver_name || '',
        email: data.receiver_email || '',
        phone: data.receiver_phone || '',
        biller_code: '',
        account_number: '',
    };
}

export const Payment: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const { error, status, response, makeRequest } = useFetchBillers();
    const card = useCardStore((store) => store.state);
    const formData = getFormData(card);
    const removePaymentStatus = usePaymentStore((store) => store.removeResponse);

    useEffect(() => {
        if (isObjectEmpty(card)) {
            navigate('/', { replace: true });
        }
    }, [card]);

    useEffect(() => {
        makeRequest();

        removePaymentStatus();
    }, []);

    return (
        <Fragment>
            <DataViewAsync status={status} collection={response.data}>
                {/* <DataViewAsync.Idle></DataViewAsync.Idle> */}
                <DataViewAsync.Empty>Empty</DataViewAsync.Empty>
                <DataViewAsync.Loading>
                    <div className="bpl-flex bpl-items-center bpl-justify-center bpl-h-full bpl-min-h-screen ">
                        <ComponentElementLoader />
                    </div>
                </DataViewAsync.Loading>
                <DataViewAsync.Error>
                    <div className="bpl-flex bpl-items-center bpl-justify-center bpl-text-lg bpl-text-red-600 bpl-h-36">
                        {error ? error.message : 'Error'}
                    </div>
                </DataViewAsync.Error>
                <DataViewAsync.Success>
                    {({ billers }) => {
                        return (
                            <Fragment>
                                <PaymentForm card={card} billers={billers} serviceFee={card.fee} formData={formData} />
                                {/* <Link to="/status">Status</Link>
                                <br />
                                <Link to="/">Home</Link> */}
                            </Fragment>
                        );
                    }}
                </DataViewAsync.Success>
            </DataViewAsync>
        </Fragment>
    );
};
