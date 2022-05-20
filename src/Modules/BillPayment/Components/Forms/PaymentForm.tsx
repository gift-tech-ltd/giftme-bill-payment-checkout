// import clsx from "clsx";
import { Form, Formik } from "formik";

import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldError } from "@/Common/Components/Form/FieldError";
// import { FieldLabel } from "@/Common/Components/Form/FieldLabel";
// import your route components too
// import SelectSearch from "react-select-search";
// import { fuzzySearch } from "@/Modules/BillPayment/Helpers/fuzzySearch";
// import Select from "react-select";
import { Button } from "@/Common/Components/Button/Button";
import { FieldInputNumber } from "@/Common/Components/Form/FieldNumber";
import { BillerSelect } from "@/Modules/BillPayment/Components/BillerSelect/BillerSelect";
import { PinModal } from "@/Modules/BillPayment/Components/PinModal/PinModal";
import { PinInput } from "@/Modules/BillPayment/Components/PinInput/PinInput";
// import ReactCodeInput from "react-code-input";
// import "./react-select.css";

// import PincodeInput from 'pincode-input'
// import 'pincode-input/dist/pincode-input.min.css'

interface Props {
    children?: React.ReactNode;
}
const options = [
    { label: "JPS", value: "jps" },
    { label: "NWC", value: "nwc" },
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
            {({ setFieldValue, setFieldTouched }) => {
                return (
                    <Form>
                        <FieldBlock>
                            <BillerSelect
                                onChange={(e) => {
                                    setFieldValue("biller", e);
                                    setFieldTouched("biller", true);
                                }}
                            />
                            {/* <Select options={options} /> */}

                            <FieldError name="utility" />
                        </FieldBlock>
                        <FieldBlock>
                            {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                            <FieldInputNumber name="amount" id="amount" placeholder="Enter Amount" thousandSeparator={true} autoComplete="off" />
                            <FieldError name="amount" />
                        </FieldBlock>

                        {/* <ReactCodeInput name="pin" inputMode="numeric" type="number" fields={4} /> */}
                        <div className="bpl-flex bpl-items-center bpl-justify-end">
                            <Button href="/" color="quaternary" disabled={false} type="button">
                                Cancel
                            </Button>
                            <Button block={true} disabled={false} type="button">
                                Continue
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};
