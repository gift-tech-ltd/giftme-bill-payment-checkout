import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { FieldError } from "@/Common/Components/Form/FieldError";
import { Button } from "@/Common/Components/Button/Button";
import { PinInput } from "@/Modules/BillPayment/Components/PinInput/PinInput";
import { PinModal } from "@/Modules/BillPayment/Components/PinModal/PinModal";
import { useValidateCardCode } from "@/Modules/BillPayment/Services/BillService";
import { FormErrorMessage } from "@/Common/Components/Form/FormErrorMessage";
import { useEffect, useState } from "react";
//

// select-search__value
// import your route components too

interface Props {
    onSuccess?: (reponse: any) => void;
    children?: React.ReactNode;
}
export const CardCodeForm: React.FC<Props> = ({ children }) => {
    const { error, loading, response, makeRequest } = useValidateCardCode();
    // const [showPinModal, setShowPinModal] = useState(false);
    const [isPinEmpty, setPinEmpty] = useState<boolean>(true);
    // console.log("🚀 ~ file: CardCodeForm.tsx ~ line 22 ~ error", error)
    useEffect(() => {
        console.log("🚀 ~ file: CardCodeForm.tsx ~ line 26 ~ useEffect ~ response.status", response.status);
        // if (response.status === 200) {
        //     // console.log("🚀 ~ file: CardCodeForm.tsx ~ line 25 ~ useEffect ~ response", response);
        //     if (response.data.message) {
        //         alert(response.data.message);
        //     }
        // }
    }, [error, response]);

    async function handleSubmit(values: any) {
        setPinEmpty(values.pin === "");
        await makeRequest(values);
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                code: "",
                pin: "",
            }}
        >
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
