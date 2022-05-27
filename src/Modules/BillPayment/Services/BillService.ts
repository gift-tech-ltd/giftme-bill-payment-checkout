import { CachePolicies, Res } from "use-http";
import { CardType } from "@/Common/@types/CardType";
import { PayResponseType } from "@/Common/@types/PayResponseType";
import { BillerResponseType } from "@/Common/@types/BillerResponseType";
import { isEmptyResponseData } from "@/Common/Helpers/Http/isEmptyResponseData";
import { createRequestAction } from "@/Common/Helpers/Http/createRequestAction";

const BASE_URL = "https://api.giftme.dev";

export function useValidateCardCode() {
    const { post, response, loading, error, status, ...others } = createRequestAction(BASE_URL, {
        // url: `${BASE_URL}` ,

        data: undefined,
        cachePolicy: CachePolicies.NO_CACHE,
    });

    function makeRequest(values: { code: string; pin: string }): Promise<Res<CardType>> {
        return post(`/company/v1/billpayment/verify`, values);
    }

    return {
        ...others,
        status,
        error,
        response,
        loading,
        makeRequest,
        isEmpty: function () {
            return isEmptyResponseData(response.data);
        },
    };
}

export function useFetchBillers() {
    const { get, response, loading, error, status, ...others } = createRequestAction(BASE_URL, {
        data: undefined,
        cachePolicy: CachePolicies.NO_CACHE,
    });

    function makeRequest(): Promise<Res<BillerResponseType>> {
        return get(`/company/v1/billpayment/billers`);
    }

    return {
        ...others,
        status,
        error,
        response,
        loading,
        makeRequest,
        isEmpty: function () {
            return isEmptyResponseData(response.data);
        },
    };
}

export function usePayBill() {
    const { get, post, response, loading, error, status, ...others } = createRequestAction(BASE_URL, {
        data: undefined,
        cachePolicy: CachePolicies.NO_CACHE,
    });

    function makeRequest(data: Record<string, any>): Promise<Res<PayResponseType>> {
        // 'token' => 'required|string',
        // 'amount' => 'nullable|numeric|min:1',
        // 'name' => 'required|string',
        // 'email' => 'required|email',
        // 'phone' => 'required|string',
        // 'biller_code' => 'required|string',
        // 'account_number' => 'required|string',
        return post(`/company/v1/billpayment/pay`, data);
    }

    return {
        ...others,
        status,
        error,
        response,
        loading,
        makeRequest,
        isEmpty: function () {
            return isEmptyResponseData(response.data);
        },
    };
}
