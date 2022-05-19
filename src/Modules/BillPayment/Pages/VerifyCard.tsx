import { Fragment } from "react";
import { CardCodeForm } from "@/Modules/BillPayment/Components/Forms/CardCodeForm";

interface Props {
    children?: React.ReactNode;
}
export const VerifyCard: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <CardCodeForm />
        </Fragment>
    );
};
