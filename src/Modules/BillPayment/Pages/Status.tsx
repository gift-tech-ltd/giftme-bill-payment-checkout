import { Fragment } from "react";
// import { Link } from "react-router-dom";
// import { CardCodeForm } from "@/Modules/BillPayment/Components/Forms/CardCodeForm";

interface Props {
    children?: React.ReactNode;
}
export const Status: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <div>Status</div>
        </Fragment>
    );
};
