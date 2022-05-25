// import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";

import { FieldBlock } from "@/Common/Components/Form/FieldBlock";
import { FieldError } from "@/Common/Components/Form/FieldError";
import { FieldLabel } from "@/Common/Components/Form/FieldLabel";
// import your route components too
// import SelectSearch from "react-select-search";
// import { fuzzySearch } from "@/Modules/BillPayment/Helpers/fuzzySearch";
// import Select from "react-select";
import { Button } from "@/Common/Components/Button/Button";
import { FieldInputNumber } from "@/Common/Components/Form/FieldNumber";
// import { BillerSelect } from "@/Modules/BillPayment/Components/BillerSelect/BillerSelect";
// import { PinModal } from "@/Modules/BillPayment/Components/PinModal/PinModal";
// import { PinInput } from "@/Modules/BillPayment/Components/PinInput/PinInput";
import { FieldPhoneNumber } from "@/Common/Components/Form/FieldPhoneNumber/FieldPhoneNumber";
import { FieldInput } from "@/Common/Components/Form/FieldInput";
import { SectionHeader } from "@/Common/Components/UI/SectionHeader/SectionHeader";
import { ReviewView } from "@/Modules/BillPayment/Components/ReviewView/ReviewView";
import { BillerGroup } from "@/Modules/BillPayment/Components/Billers/BillerGorup/BillerGorup";
import { BillerItem } from "@/Modules/BillPayment/Components/Billers/BillerItem/BillerItem";
import { stringNumberToNumber } from "@/Common/Helpers/String/stringNumberToNumber";
// import { billerLisData } from "@/Modules/BillPayment/Mock/billerLisData";
import { BillerType } from "@/Common/@types/BillerType";
import { usePayBill } from "@/Modules/BillPayment/Services/BillService";
import { FormErrorMessage } from "@/Common/Components/Form/FormErrorMessage";
import { FormView } from "@/Common/Components/Form/FormView";
import { getMainUtilities, orderByUtility, transformUtility } from "@/Modules/BillPayment/Helpers/billerUtilities";
// import { isNotEmptyProps } from "@/Common/Helpers/String/isEmptyProps";

// function getMainUtilities(codes: string[] = ["JPM", "NW", "FL", "DC"]) {
//     return billerLisData.billers.filter((biller) => codes.includes(biller.Code));
// }

// function order(billers: any[], by = ["JPM", "NW", "FL", "DC"]) {
//     const cloneBillers: any[] = [];
//     by.forEach((code) => {
//         const index = billers.findIndex((b) => b.Code === code);
//         if (index > -1) {
//             cloneBillers.push(billers[index]);
//         }
//     });
//     return cloneBillers;
// }
// const utilityMap: Record<string, any> = {
//     JPM: { code: "JPS", name: "Jamaica Public Service (JPS)" },
//     NW: { code: "NWC", name: "National Water Commission (NWC)" },
//     // 8-9 digits
//     FL: { code: "Flow", name: "Flow (Landline, Internet, Mobile)" },
//     DC: { code: "Digicel", name: "Digicel Play" },
// };

// function transformBiller(biller: BillerType[]) {
//     return biller.map((item) => {
//         return {
//             label: utilityMap[item.Code].code,
//             id: item.Code,
//             name: utilityMap[item.Code].name,
//         };
//     });
// }
const initialValues = {
    token: "",
    amount: "",
    name: "",
    email: "",
    phone: "",
    biller_code: "",
    account_number: "",
};
interface Props {
    formData?: any;
    serviceFee?: number;
    children?: React.ReactNode;
    billers: BillerType[];
}

// const serviceFee = 50;

export const PaymentForm: React.FC<Props> = ({ formData, billers, serviceFee = 50, children }) => {
    const [isEditing, setEditing] = useState<boolean>(true);
    const [utilityName, setUtilityName] = useState<boolean>(false);
    const utilityOptions = transformUtility(orderByUtility(getMainUtilities(billers)));
    const { error, response, loading, makeRequest } = usePayBill();

    function handleSubmit(values: any) {
        makeRequest(values);
    }

    return (
        <Formik onSubmit={handleSubmit} initialValues={formData}>
            {({ setFieldValue, setFieldTouched, setFieldError, setErrors, values }) => {
                useEffect(() => {
                    if (stringNumberToNumber(values.amount) > 0) {
                        setFieldError("amount", "Amount must be greater than 0");
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
                                            setFieldValue("biller_code", data.id);
                                            setFieldTouched("biller_code", true);
                                            setUtilityName(data.name);
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
                            {values.biller_code !== "" ? (
                                <div className="bpl-mb-5 bpl-mt-4 bpl-p-2.5 bpl-font-semibold bpl-rounded bpl-bg-orange-100 bpl-text-orange-600">
                                    {utilityName}
                                </div>
                            ) : null}
                        </div>

                        {values.biller_code !== "" ? (
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
                                </FieldBlock>

                                <FieldBlock>
                                    {/* <FieldLabel htmlFor="code">Code</FieldLabel> */}
                                    <FieldInputNumber
                                        name="amount"
                                        id="amount"
                                        placeholder="Enter Amount"
                                        onChange={(e) => {
                                            // setEditing(true);
                                            setFieldValue("amount", stringNumberToNumber(e.target.value));
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
                                        defaultCountry={"JM"}
                                        countries={["JM"]}
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
                            </Fragment>
                        ) : null}

                        <div className="mt-5">
                            <ReviewView
                                data={{
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
                                currency={{ code: "JMD", symbol: "$" }}
                            />
                        </div>
                        {!isEditing ? (
                            <div className="bpl-flex bpl-items-center bpl-justify-end">
                                <Button href="/" color="quaternary" type="button">
                                    Cancel
                                </Button>
                                <Button block={true} loading={loading} disabled={loading} type="submit">
                                    Pay
                                </Button>
                            </div>
                        ) : null}
                    </FormView>
                );
            }}
        </Formik>
    );
};
