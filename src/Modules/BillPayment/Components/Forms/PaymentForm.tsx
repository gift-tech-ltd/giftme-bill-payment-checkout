import clsx from "clsx";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
// import { FieldLabel } from "@/Common/Components/Form/FieldLabel";
// import your route components too
import SelectSearch from "react-select-search";
import { fuzzySearch } from "@/Modules/BillPayment/Helpers/fuzzySearch";
import { FieldInputNumber } from "@/Common/Components/Form/FieldNumber";

interface Props {
    children?: React.ReactNode;
}
const options = [
    { name: "JPS", value: "jps" },
    { name: "NWC", value: "nwc" },
];
export const PaymentForm: React.FC<Props> = ({ children }) => {
    return (
        <Formik
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
            initialValues={{
                code: "",
            }}
        >
            <Form>
                <FieldBlock>
                    <SelectSearch options={options} search={true} filterOptions={fuzzySearch} placeholder="Select Utility" />
                    {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                    {/* class="ck-block ck-w-full ck-px-4 ck-py-3 ck-border ck-rounded ck-appearance-none ck-border-gray-300 " */}
                    <FieldError name="utility" />
                </FieldBlock>
                <FieldBlock>
                    {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                    <FieldInputNumber name="amount" id="amount" placeholder="Enter Amount" thousandSeparator={true} autoComplete="off" />
                    <FieldError name="amount" />
                </FieldBlock>
                <Link to="/payment">Payment</Link>
            </Form>
        </Formik>
    );
};
