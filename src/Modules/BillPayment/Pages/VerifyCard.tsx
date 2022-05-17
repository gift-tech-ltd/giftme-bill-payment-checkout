import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CardCodeForm } from "@/Modules/BillPayment/Components/Forms/CardCodeForm";

interface Props {
    children?: React.ReactNode;
}
export const VerifyCard: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <CardCodeForm />
            <Link to="/payment">Payment</Link>
        </Fragment>
    );
};
