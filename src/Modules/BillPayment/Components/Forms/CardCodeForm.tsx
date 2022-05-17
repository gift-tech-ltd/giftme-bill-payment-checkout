import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
// import your route components too

interface Props {
    onSuccess?: (reponse: any) => void;
    children?: React.ReactNode;
}
export const CardCodeForm: React.FC<Props> = ({ children }) => {
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
                    <FieldInput name="code" id="code" placeholder="Enter Code" type="text" autoComplete="off" />
                    <FieldError name="code" />
                </FieldBlock>
                <Link to="/payment">Payment</Link>
            </Form>
        </Formik>
    );
};
