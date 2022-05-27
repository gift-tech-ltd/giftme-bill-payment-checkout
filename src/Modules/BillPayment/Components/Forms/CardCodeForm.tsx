import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
import { Button } from "@/Common/Components/Button/Button";
import { PinInput } from "@/Modules/BillPayment/Components/PinInput/PinInput";
import { PinModal } from "@/Modules/BillPayment/Components/PinModal/PinModal";
import { useValidateCardCode } from "@/Modules/BillPayment/Services/BillService";
import { FormErrorMessage } from "@/Common/Components/Form/FormErrorMessage";
import { useEffect, useState } from "react";
import { StringParam } from "serialize-query-params";
import { getQueryParamFromQueryString } from "@/Common/Helpers/String/queryStringHelpers";
import { useCardStore } from "@/Modules/BillPayment/Stores/CardStore";
import { removeSpace } from "@/Common/Helpers/String/removeSpace";
//

// select-search__value
// import your route components too

const querySchema = {
    code: StringParam,
};
interface Props {
    onSuccess?: (reponse: any) => void;
    children?: React.ReactNode;
}
function getFormData(data: any) {
    return {
        code: data.code || "",
        pin: data.pin || "",
    };
}

export const CardCodeForm: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const { error, loading, status, response, makeRequest } = useValidateCardCode();
    const addCard = useCardStore((store) => store.addCard);
    const [isPinEmpty, setPinEmpty] = useState<boolean>(true);
    const [formData, setFormData] = useState<object | undefined>();

    useEffect(() => {
        const queryString = location.search;
        const queryAsParams = getQueryParamFromQueryString(queryString, querySchema);
        const { code } = queryAsParams;
        if (code) {
            setFormData(getFormData({ code }));
        } else {
            setFormData(getFormData({}));
        }
        location.search;
    }, []);

    useEffect(() => {
        if (status === "success") {
            if (response.data) {
                addCard(response.data);
                navigate("/payment", { replace: true });
            }
        }
    }, [status, response]);

    async function handleSubmit(values: any) {
        setPinEmpty(values.pin === "");
        const clonedValues = { ...values, code: removeSpace(values.code) };

        await makeRequest(clonedValues);
    }

    if (!formData) {
        return null;
    }

    return (
        <Formik onSubmit={handleSubmit} initialValues={formData}>
            {({ setFieldValue, setFieldTouched, setErrors }) => {
                return (
                    <Form>
                        {response.status !== 401 || (!isPinEmpty && response.status === 401) ? (
                            <div className="bpl-mb-5">
                                <FormErrorMessage error={error} response={response} setError={setErrors} />
                            </div>
                        ) : null}

                        <FieldBlock>
                            <FieldInput name="code" id="code" placeholder="Enter Card Code" type="text" autoComplete="off" />
                            <FieldError name="code" />
                        </FieldBlock>

                        <PinModal isOpen={isPinEmpty && response.status === 401}>
                            <label className="bpl-text-xl bpl-font-semibold bpl-text-center bpl-w-full bpl-block bpl-mb-6" htmlFor="">
                                Enter Your Card Pin
                            </label>
                            <div className="bpl-flex bpl-items-center bpl-justify-center">
                                <PinInput
                                    onChange={(pin) => {
                                        setFieldValue("pin", pin);
                                        setFieldTouched("pin", true);
                                    }}
                                />
                            </div>
                            <FieldError name="pin" />

                            <div className="bpl-mt-6">
                                <Button loading={loading} block={true} disabled={loading} type="submit">
                                    Continue
                                </Button>
                            </div>
                        </PinModal>

                        <div className="bpl-flex bpl-items-center bpl-justify-end">
                            {/* <Button href="/deals/offers" color="quaternary" disabled={false} type="button">
                        Cancel
                    </Button> */}
                            <Button loading={loading} block={true} disabled={loading} type="submit">
                                Continue
                            </Button>
                        </div>

                        <Link to="/payment">Payment</Link>
                    </Form>
                );
            }}
        </Formik>
    );
};
