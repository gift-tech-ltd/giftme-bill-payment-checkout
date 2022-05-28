import React, { Fragment, useEffect } from "react";
import { Button } from "@/Common/Components/Button/Button";
// import { CurrencyType } from '@/Modules/Checkouts/@types/CurrencyType';
import { FormatNumber } from "@/Common/Components/FormatNumber/FormatNumber";
import { scrollToElement } from "@/Common/Helpers/Dom/scrollToElement";

interface Props {
    smartCard: boolean;
    hasFromChanged: boolean;
    data?: undefined | Record<string, any>;
    isLoading: boolean;
    onSubmit: Function;
    error?: any;
    currency: {
        code: string;
        symbol: string;
    };
}

export const ReviewView: React.FC<Props> = ({ data, isLoading, hasFromChanged, currency, onSubmit }) => {
    useEffect(() => {
        scrollToElement("#payment-review");
    }, []);
    return (
        <div id="payment-review">
            {!hasFromChanged && data ? (
                <div className="bpl-pb-1 bpl-mt-9">
                    <div className="bpl-rounded-lg ">
                        <h3 className="bpl-mb-3 bpl-text-2xl bpl-font-semibold bpl-text-base-900">Review Details</h3>
                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-text-lg bpl-capitalize bpl-text-base-700">
                            <span>{data.utilityName === "" ? "Utility" : data.utilityName}</span>
                            <span className="bpl-whitespace-nowrap">
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.unit_cost}
                                </FormatNumber>
                            </span>
                        </div>
                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-text-lg bpl-capitalize bpl-text-base-700">
                            <span>Service fee</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.service_fee}
                                </FormatNumber>
                            </span>
                        </div>
                        <div className="bpl-flex bpl-items-center bpl-justify-between bpl-pt-0 bpl-mt-2 bpl-text-2xl bpl-font-semibold bpl-capitalize bpl-border-t bpl-border-solid bpl-border-base-300 bpl-text-base-800">
                            <span>Total</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.total}
                                </FormatNumber>
                            </span>
                        </div>
                    </div>
                    <div className="bpl-mt-4 bpl-text-sm bpl-font-semibold bpl-text-base-500">
                        <p>
                            Pay to Account <span className=" bpl-text-base-700">{data.account}</span>
                        </p>
                        <p>
                            Receipt will be sent to <span className="bpl-text-base-700">{data.phone}</span>
                        </p>
                    </div>
                    <div className="bpl-p-3 bpl-my-5 bpl-text-sm bpl-rounded-lg bpl-bg-base-100">
                        <p className="">
                            By clicking the <strong>Pay</strong> Button below, you confirm you are at least 18 years old and you accept our{" "}
                            <a target="_black" href="https://merchant.getgift.me/terms-of-service" className="bpl-text-blue-600 hover:bpl-underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_black"
                                href="https://merchant.getgift.me/privacy-policy"
                                className="bpl-text-blue-600 hover:bpl-underline"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>{" "}
                </div>
            ) : null}
        </div>
    );
};
