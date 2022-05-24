import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchBillers } from "@/Modules/BillPayment/Services/BillService";
import { PaymentForm } from "@/Modules/BillPayment/Components/Forms/PaymentForm";
import { useCardStore } from "@/Modules/BillPayment/Stores/CardStore";

interface Props {
    children?: React.ReactNode;
}

function getFormData(data: any) {
    return {
        token: data.token || "",
        amount: "",
        name: data.receiver_name || "",
        email: data.receiver_email || "",
        phone: data.receiver_phone || "",
        biller_code: "",
        account_number: "",
    };
}

export const Payment: React.FC<Props> = ({ children }) => {
    const { error, loading, response, makeRequest } = useFetchBillers();
    const card = useCardStore((store) => store.state);
    const formData = getFormData(card);

    useEffect(() => {
        // makeRequest();
    }, []);
    console.log("🚀 ~ file: Payment.tsx ~ line 26 ~ useEffect ~ response.status", response.status);

    return (
        <Fragment>
            <PaymentForm serviceFee={card.fee} formData={formData} />
            <Link to="/status">Status</Link>
        </Fragment>
    );
};
