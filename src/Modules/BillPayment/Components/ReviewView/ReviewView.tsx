import React, { Fragment } from "react";
import { Button } from "@/Common/Components/Button/Button";
// import { CurrencyType } from '@/Modules/Checkouts/@types/CurrencyType';
import { FormatNumber } from "@/Common/Components/FormatNumber/FormatNumber";

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

export const ReviewView: React.FC<Props> = ({ data, smartCard, isLoading, hasFromChanged, currency, onSubmit }) => {
    return (
        <div id="order-review">
            {!hasFromChanged && data ? (
                <div className="ck-pb-1 ck-mt-7">
                    <div className="ck-rounded-lg ">
                        <h3 className="ck-mb-3 ck-text-2xl ck-font-semibold ck-text-base-900">Review Details</h3>
                        <div className="ck-flex ck-items-center ck-justify-between ck-text-lg ck-capitalize ck-text-base-700">
                            <span>Payment Summary</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.unit_cost}
                                </FormatNumber>
                            </span>
                        </div>
                        <div className="ck-flex ck-items-center ck-justify-between ck-text-lg ck-capitalize ck-text-base-700">
                            <span>Service fee</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.service_fee}
                                </FormatNumber>
                            </span>
                        </div>
                        <div className=" ck-flex ck-items-center ck-justify-between ck-pt-0 ck-mt-2 ck-text-xl ck-font-semibold ck-capitalize ck-border-t ck-border-solid ck-border-base-400 ck-text-base-700">
                            <span>Total</span>
                            <span>
                                <FormatNumber format="0,0.[00]" prefix={currency.symbol} suffix={` ${currency.code}`}>
                                    {data.total}
                                </FormatNumber>
                            </span>
                        </div>
                    </div>
                    <div className="ck-p-3 ck-my-4 ck-text-sm ck-rounded-lg ck-bg-base-100">
                        <p className="">
                            By clicking the <strong>Pay</strong> Button below, you agree to our{" "}
                            <a target="_black" href="https://merchant.getgift.me/terms-of-service" className="ck-text-blue-600 hover:ck-underline">
                                Terms of Service
                            </a>
                            {smartCard ? (
                                <Fragment>
                                    and{" "}
                                    <a
                                        rel="noopener noreferrer"
                                        target="_black"
                                        href="https://merchant.getgift.me/privacy-policy"
                                        className="ck-text-blue-600 hover:ck-underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </Fragment>
                            ) : (
                                <Fragment>
                                    ,{" "}
                                    <a
                                        rel="noopener noreferrer"
                                        target="_black"
                                        href="https://merchant.getgift.me/privacy-policy"
                                        className="ck-text-blue-600 hover:ck-underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    , and{" "}
                                    <a href="#merchant-terms" className="ck-text-blue-600 ck-capitalize hover:ck-underline">
                                        XXXX Terms of Service
                                    </a>
                                    .
                                </Fragment>
                            )}
                        </p>
                    </div>{" "}
                    <div className="ck-flex ck-items-center ck-mt-4 ck-mb-4">
                        <Button
                            className="ck-btn-theme-500 hover:ck-btn-theme-600"
                            onClick={onSubmit as any}
                            loading={isLoading}
                            type="button"
                            block={true}
                            color="primary"
                            disabled={isLoading}
                            size="xl"
                        >
                            Pay
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
