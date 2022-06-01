import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FieldBlock } from '@/Common/Components/Form/FieldBlock';
import { FieldInput } from '@/Common/Components/Form/FieldInput';
import { FieldError } from '@/Common/Components/Form/FieldError';
import { Button } from '@/Common/Components/Button/Button';
import { PinInput } from '@/Modules/BillPayment/Components/PinInput/PinInput';
import { PinModal } from '@/Modules/BillPayment/Components/PinModal/PinModal';
import { useValidateCardCode } from '@/Modules/BillPayment/Services/BillService';
import { FormErrorMessage } from '@/Common/Components/Form/FormErrorMessage';
import { useEffect, useState } from 'react';
import { StringParam } from 'serialize-query-params';
import { getQueryParamFromQueryString } from '@/Common/Helpers/String/queryStringHelpers';
import { useCardStore } from '@/Modules/BillPayment/Stores/CardStore';
import { removeSpace } from '@/Common/Helpers/String/removeSpace';
import { usePaymentStore } from '@/Modules/BillPayment/Stores/PaymentStore';
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
        code: data.code || '5476 6779 6664',
        card_pin: data.pin || '',
    };
}

export const CardCodeForm: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const { error, loading, status, response, makeRequest } = useValidateCardCode();
    const addCard = useCardStore((store) => store.addCard);
    const [isPinEmpty, setPinEmpty] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [formData, setFormData] = useState<object | undefined>();
    const removePaymentStatus = usePaymentStore((store) => store.removeResponse);

    useEffect(() => {
        const queryString = location.search;
        const queryAsParams = getQueryParamFromQueryString(queryString, querySchema);
        const { code } = queryAsParams;
        if (code) {
            setFormData(getFormData({ code }));
        } else {
            setFormData(getFormData({}));
        }
        removePaymentStatus();
    }, []);

    useEffect(() => {
        if (status === 'success') {
            if (response.data) {
                addCard(response.data);
                navigate('/payment', { replace: true });
            }
        }
    }, [status, response]);

    useEffect(() => {
        if (status === 'error') {
            // !isPinEmpty
            setErrorCount((prev) => prev + 1);
            // setPinEmpty(true);
        }
    }, [status, isPinEmpty]);

    async function handleSubmit(values: any) {
        setPinEmpty(values.card_pin === '');
        const clonedValues = { ...values, code: removeSpace(values.code) };

        await makeRequest(clonedValues);
    }

    if (!formData) {
        return null;
    }

    return (
        <Formik onSubmit={handleSubmit} initialValues={formData}>
            {({ setFieldValue, setFieldTouched, setErrors, submitForm }) => {
                return (
                    <Form>
                        {response.status !== 401 || (!isPinEmpty && response.status === 401) ? (
                            <div className="bpl-mb-5">
                                <FormErrorMessage error={error} response={response} setError={setErrors} />
                            </div>
                        ) : null}

                        <FieldBlock>
                            <FieldInput
                                name="code"
                                id="code"
                                placeholder="Enter Card Code"
                                type="text"
                                autoComplete="off"
                            />
                            <FieldError name="code" />
                        </FieldBlock>

                        <PinModal isOpen={(isPinEmpty && response.status === 401) || errorCount > 1}>
                            {!isPinEmpty && response.status === 401 && errorCount > 1 ? (
                                <div className="bpl-mb-5">
                                    <FormErrorMessage error={error} response={response} setError={setErrors} />
                                </div>
                            ) : null}
                            <label
                                className="bpl-text-xl bpl-font-semibold bpl-text-center bpl-w-full bpl-block bpl-mb-6"
                                htmlFor=""
                            >
                                Enter Your Card Pin
                            </label>
                            <div className="bpl-flex bpl-items-center bpl-justify-center">
                                <PinInput
                                    onChange={(pin) => {
                                        setFieldValue('card_pin', pin);
                                        setFieldTouched('card_pin', true);
                                    }}
                                />
                            </div>
                            <FieldError name="card_pin" />

                            <div className="bpl-mt-6">
                                <Button
                                    onClick={submitForm}
                                    loading={loading}
                                    block={true}
                                    disabled={loading}
                                    type="button"
                                >
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

                        {/* <Link to="/payment">Payment</Link> */}
                    </Form>
                );
            }}
        </Formik>
    );
};
