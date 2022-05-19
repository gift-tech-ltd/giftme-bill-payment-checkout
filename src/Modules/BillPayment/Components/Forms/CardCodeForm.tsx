import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
import { Button } from "@/Common/Components/Button/Button";
//

// select-search__value
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
                    <FieldInput name="code" id="code" placeholder="Enter Card Code" type="text" autoComplete="off" />
                    <FieldError name="code" />
                </FieldBlock>

                <div className="bpl-flex bpl-items-center bpl-justify-end">
                    {/* <Button href="/deals/offers" color="quaternary" disabled={false} type="button">
                        Cancel
                    </Button> */}
                    <Button block={true} disabled={false} type="submit">
                        Continue
                    </Button>
                </div>

                <Link to="/payment">Payment</Link>
            </Form>
        </Formik>
    );
};
