import { CachePolicies, Res } from "use-http";
import { isEmptyResponseData } from "@/Common/Helpers/Http/isEmptyResponseData";
import { createRequestAction } from "@/Common/Helpers/Http/createRequestAction";

export function useValidateCardCode() {
    const { post, response, loading, error, status, ...others } = createRequestAction({
        data: undefined,
        cachePolicy: CachePolicies.NO_CACHE,
    });

    function makeRequest(code: number): Promise<Res<any>> {
        return post(`/url`, { code });
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
    const { get, post, response, loading, error, status, ...others } = createRequestAction({
        data: undefined,
        cachePolicy: CachePolicies.NO_CACHE,
    });

    function makeRequest(data: Record<string, any>): Promise<Res<any>> {
        return post(`/url`, data);
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
