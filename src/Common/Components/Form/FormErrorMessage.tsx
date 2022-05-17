import { Res } from "use-http";
import React, { useEffect, useState } from "react";
import { scrollToElement } from "@/Common/Helpers/Dom/scrollToElement";

interface Props {
    response: Res<any>;
    error: Error | string | undefined;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    setError: (data: any) => void;
}

export const FormErrorMessage: React.FC<Props> = ({ children, response, style, setError, error }) => {
    const [show, setShow] = useState<string | undefined | null>();

    useEffect(() => {
        if (error) {
            scrollToElement("#form-error");
        }
    }, [error]);

    useEffect(() => {
        if (response.status !== 200 && response.status !== 201 && error) {
            if (response.status === 422) {
                console.log("🚀 ~ file: FormErrorMessage.tsx ~ line 18 ~ useEffect ~ error", error!.valueOf(), response);
                setError(response.data.errors);
                if (response.data.message) {
                    setShow(response.data.message);
                }
            } else {
                if (typeof error === "string") {
                    setShow(error);
                } else {
                    if (error.message) {
                        setShow(error.message);
                    } else {
                        setShow("Something went wrong");
                    }
                }
            }
        } else {
            setShow(null);
        }
    }, [response.status, error]);

    return (
        <div id="form-error">
            {show && (
                <div className="bpl-p-3 bpl-mt-4 bpl-text-red-600 bpl-bg-red-100 bpl-rounded" style={style}>
                    {show}
                </div>
            )}
        </div>
    );
};
