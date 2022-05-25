import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchBillers } from "@/Modules/BillPayment/Services/BillService";
import { PaymentForm } from "@/Modules/BillPayment/Components/Forms/PaymentForm";
import { useCardStore } from "@/Modules/BillPayment/Stores/CardStore";
import { DataViewAsync } from "@/Common/Components/DataView/DataViewAsync";
import { ComponentElementLoader } from "@/Common/Components/UI/SectionHeader/ComponentLoader/ComponentLoader";

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
    const { error, status, loading, response, makeRequest } = useFetchBillers();
    const card = useCardStore((store) => store.state);
    const formData = getFormData(card);
    const [bilers, setBillers] = useState<any>(true);

    useEffect(() => {
        makeRequest();
    }, []);

    useEffect(() => {
        if (response.ok) {
            if (response.data) {
                setBillers(response.data);
            }
        }
    }, [response.ok]);

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
                    <div className="bpl-flex bpl-items-center bpl-justify-center bpl-text-lg bpl-text-red-600 bpl-h-36">{error ? error.message : "Error"}</div>
                </DataViewAsync.Error>
                <DataViewAsync.Success>
                    {({ billers }) => {
                        return (
                            <Fragment>
                                <PaymentForm billers={billers} serviceFee={card.fee} formData={formData} />
                                <Link to="/status">Status</Link>
                                <br />
                                <Link to="/">Home</Link>
                            </Fragment>
                        );
                    }}
                </DataViewAsync.Success>
            </DataViewAsync>
        </Fragment>
    );
};
