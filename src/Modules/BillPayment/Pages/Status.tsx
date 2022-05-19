import { Fragment } from "react";
import { SuccessMessageBox } from "@/Modules/BillPayment/Components/MessageBox/SuccesMessageBox";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { CardCodeForm } from "@/Modules/BillPayment/Components/Forms/CardCodeForm";

interface Props {
    children?: React.ReactNode;
}
export const Status: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <SuccessMessageBox>some message</SuccessMessageBox>
            <Link
                className="bpl-duration-300 bpl-block bpl-mt-4 bpl-button-primary bpl-w-full bpl-cursor-pointer bpl-rounded bpl-py-4 bpl-px-7 bpl-text-base bpl-text-center bpl-leading-none bpl-transition-colors "
                to={"/payment"}
            >
                Pay Another Bill
            </Link>
        </Fragment>
    );
};
