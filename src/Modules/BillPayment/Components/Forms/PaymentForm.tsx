// import clsx from "clsx";
import { Fragment, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

import { FieldBlock } from '@/Common/Components/Form/FieldBlock';
import { FieldError } from '@/Common/Components/Form/FieldError';
import { FieldLabel } from '@/Common/Components/Form/FieldLabel';
// import your route components too
import { Button } from '@/Common/Components/Button/Button';
import { FieldInputNumber } from '@/Common/Components/Form/FieldNumber';
import { FieldPhoneNumber } from '@/Common/Components/Form/FieldPhoneNumber/FieldPhoneNumber';
import { FieldInput } from '@/Common/Components/Form/FieldInput';
import { SectionHeader } from '@/Common/Components/UI/SectionHeader/SectionHeader';
import { ReviewView } from '@/Modules/BillPayment/Components/ReviewView/ReviewView';
import { BillerGroup } from '@/Modules/BillPayment/Components/Billers/BillerGorup/BillerGorup';
import { BillerItem } from '@/Modules/BillPayment/Components/Billers/BillerItem/BillerItem';
import { stringNumberToNumber } from '@/Common/Helpers/String/stringNumberToNumber';
import { BillerType } from '@/Common/@types/BillerType';
import { usePayBill } from '@/Modules/BillPayment/Services/BillService';
import { FormErrorMessage } from '@/Common/Components/Form/FormErrorMessage';
import { FormView } from '@/Common/Components/Form/FormView';
import { getMainUtilities, orderByUtility, transformUtility } from '@/Modules/BillPayment/Helpers/billerUtilities';
import { CardType } from '@/Common/@types/CardType';
import { FormatNumber } from '@/Common/Components/FormatNumber/FormatNumber';
import { ValidateAccountNumber } from '@/Modules/BillPayment/Components/ValidateAccountNumber/ValidateAccountNumber';
import { usePaymentStore } from '@/Modules/BillPayment/Stores/PaymentStore';
import { useCardStore } from '@/Modules/BillPayment/Stores/CardStore';
import { useNavigate } from 'react-router-dom';
// import { isNotEmptyProps } from "@/Common/Helpers/String/isEmptyProps";

interface Props {
    formData?: any;
    serviceFee?: number;
    children?: React.ReactNode;
    billers: BillerType[];
    card: CardType;
}

// const serviceFee = 50;

export const PaymentForm: React.FC<Props> = ({ formData, billers, card, serviceFee = 50, children }) => {
    const [isEditing, setEditing] = useState<boolean>(true);
    const [utilityName, setUtilityName] = useState<boolean>(false);
    const utilityOptions = transformUtility(orderByUtility(getMainUtilities(billers)));
    const [validationExpression, setValidationExpression] = useState<string>('');

    const navigate = useNavigate();
    const { error, response, status, loading, makeRequest } = usePayBill();
    const addResponse = usePaymentStore((store) => store.addResponse);
    const removeCard = useCardStore((store) => store.removeCard);

    useEffect(() => {
        if (status === 'success') {
            addResponse(response.data);
            navigate('/status', { replace: true });
        }
    }, [response, status]);

    function handleSubmit(values: any) {
        makeRequest(values);
    }

    function exit() {
        removeCard();
    }

    return (
        <Fragment>
            <Formik onSubmit={handleSubmit} initialValues={formData}>
                {({ setFieldValue, setFieldTouched, setFieldError, setErrors, values }) => {
                    useEffect(() => {
                        if (stringNumberToNumber(values.amount) > 0) {
                            setFieldError('amount', 'Amount must be greater than 0');
                        }
                    }, [values.amount]);
                    // const isEmpty = isNotEmptyProps(values, ["amount", "name", "phone", "email", "biller_code", "account_number"]);
                    // console.log("🚀 ~ file: PaymentForm.tsx ~ line 98 ~ isEmpty", isEmpty);
                    return (
                        <FormView
                            onChange={() => {
                                setEditing(true);
                            }}
                            values={values}
                        >
                            <div>
                                <div className="bpl-mb-5">
                                    <FormErrorMessage error={error} response={response} setError={setErrors} />
                                    <FieldError name="token" />
                                </div>
                                <div className="bpl-my-7">
                                    <div className="bpl-p-5 bpl-text-center bpl-bg-base-200 bpl-rounded">
                                        <p className="text-sm bpl-font-semibold">Card Balance</p>
                                        <p className="bpl-text-3xl">
                                            <FormatNumber prefix="$" suffix={` ${card.currency}`}>
                                                {card.balance}
                                            </FormatNumber>
                                        </p>
                                    </div>
                                    <FieldError name="card" />
                                </div>

                                <div className="bpl-mb-5 bpl-mt-4">
                                    <SectionHeader align="center" colorShade={600} size="2xl">
                                        Select Your Utility
                                    </SectionHeader>
                                </div>
                                <div className="bpl-my-5">
                                    <div className="bpl-grid bpl-grid-cols-4 bpl-gap-4">
                                        <BillerGroup
                                            onChange={(data) => {
                                                // setEditing(true);
                                                setFieldValue('biller_code', data.id);
                                                setFieldTouched('biller_code', true);
                                                setUtilityName(data.name);
                                                setValidationExpression(data.validationExp);
                                            }}
                                            options={utilityOptions}
                                        >
                                            {({ item, isSelected, onChange, showIcon, color, activeColor }) => {
                                                return (
                                                    <BillerItem
                                                        key={item.id}
                                                        value={item}
                                                        color={color}
                                                        showIcon={showIcon}
                                                        activeColor={activeColor}
                                                        onChange={onChange}
                                                        isSelected={isSelected}
                                                    >
                                                        {({ label }) => {
                                                            return <span className="bpl-font-semibold">{label}</span>;
                                                        }}
                                                    </BillerItem>
                                                );
                                            }}
                                        </BillerGroup>
                                    </div>
                                    <FieldError name="biller_code" />
                                </div>
                                {values.biller_code !== '' ? (
                                    <div className="bpl-mb-5 bpl-mt-4 bpl-p-2.5 bpl-font-semibold bpl-rounded bpl-bg-orange-100 bpl-text-orange-600">
                                        {utilityName}
                                    </div>
                                ) : null}
                            </div>
                            {values.biller_code !== '' ? (
                                <Fragment>
                                    <FieldBlock>
                                        {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                                        <FieldInput
                                            name="account_number"
                                            id="account_number"
                                            onChange={() => {
                                                // setEditing(true);
                                            }}
                                            placeholder="Enter Account Number"
                                            autoComplete="off"
                                        />
                                        <FieldError name="account_number" />
                                        <ValidateAccountNumber
                                            expression={validationExpression}
                                            value={values.account_number}
                                        />
                                    </FieldBlock>
                                    <FieldBlock>
                                        {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                                        <FieldInputNumber
                                            name="amount"
                                            id="amount"
                                            placeholder="Enter Amount"
                                            onChange={(e) => {
                                                // setEditing(true);
                                                setFieldValue('amount', stringNumberToNumber(e.target.value));
                                            }}
                                            thousandSeparator={true}
                                            autoComplete="off"
                                        />
                                        <FieldError name="amount" />
                                    </FieldBlock>

                                    <div className="bpl-mb-5 bpl-mt-4">
                                        <SectionHeader colorShade={600} size="2xl">
                                            Your contact details
                                        </SectionHeader>
                                    </div>

                                    <FieldBlock>
                                        <FieldInput
                                            id="name"
                                            placeholder="Enter Your Name"
                                            onChange={() => {
                                                // setEditing(true);
                                            }}
                                            type="text"
                                            name="name"
                                        />
                                        <FieldError name="name" />
                                    </FieldBlock>

                                    <FieldBlock>
                                        <FieldInput
                                            id="email"
                                            placeholder="Enter Your Email"
                                            onChange={() => {
                                                // setEditing(true);
                                            }}
                                            type="text"
                                            name="email"
                                        />
                                        <FieldError name="email" />
                                    </FieldBlock>

                                    <FieldBlock>
                                        {/* <FieldLabel htmlFor="recipient_phone">Phone</FieldLabel> */}
                                        <FieldPhoneNumber
                                            inputMode="tel"
                                            defaultCountry={'JM'}
                                            countries={['JM']}
                                            // flags={{JM: EmbeddedFlag }}
                                            id="phone"
                                            placeholder="Enter Your Phone Number"
                                            name="phone"
                                            value="1"
                                            onChange={() => {
                                                // setEditing(true);
                                            }}
                                        />
                                        <FieldError name="phone" />
                                    </FieldBlock>
                                    {isEditing ? (
                                        <div className="">
                                            <Button
                                                onClick={() => {
                                                    setEditing(false);
                                                }}
                                                block={true}
                                                type="button"
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    ) : null}
                                </Fragment>
                            ) : null}

                            {!isEditing ? (
                                <Fragment>
                                    <div className="mt-5">
                                        <ReviewView
                                            data={{
                                                email: card.receiver_email,
                                                utilityName: utilityName,
                                                phone: values.phone,
                                                account: values.account_number,
                                                unit_cost: values.amount,
                                                service_fee: serviceFee,
                                                total: values.amount + serviceFee,
                                            }}
                                            onSubmit={() => console.log}
                                            smartCard={false}
                                            isLoading={false}
                                            hasFromChanged={isEditing}
                                            currency={{ code: card.currency, symbol: '$' }}
                                        />
                                    </div>

                                    <div className="bpl-flex bpl-items-center bpl-justify-end">
                                        <Button onClick={exit} color="quaternary" type="button">
                                            Cancel
                                        </Button>
                                        <Button block={true} loading={loading} disabled={loading} type="submit">
                                            Pay
                                        </Button>
                                    </div>
                                </Fragment>
                            ) : null}
                        </FormView>
                    );
                }}
            </Formik>
        </Fragment>
    );
};
