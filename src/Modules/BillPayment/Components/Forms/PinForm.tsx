import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
import ReactCodeInput from "react-code-input";
// import your route components too

interface Props {
    children?: React.ReactNode;
}
export const PinForm: React.FC<Props> = ({ children }) => {
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
                    {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                    {/* class="ck-block ck-w-full ck-px-4 ck-py-3 ck-border ck-rounded ck-appearance-none ck-border-gray-300 " */}
                    <ReactCodeInput name="pin" inputMode="numeric" type="number" fields={6} />
                    <FieldInput name="code" id="code" placeholder="Enter Code" type="text" autoComplete="off" />
                    <FieldError name="code" />
                </FieldBlock>
                <Link to="/payment">Payment</Link>
            </Form>
        </Formik>
    );
};
