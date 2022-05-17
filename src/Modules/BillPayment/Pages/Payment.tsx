import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PaymentForm } from "@/Modules/BillPayment/Components/Forms/PaymentForm";

interface Props {
    children?: React.ReactNode;
}
export const Payment: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <PaymentForm />
            <Link to="/status">Status</Link>
        </Fragment>
    );
};
