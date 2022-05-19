import { useEffect, useState } from "react";
import useFetch from "use-http";

type Status = "idle" | "loading" | "success" | "error";

export function createRequestAction<TData = any>(...args: Parameters<typeof useFetch>) {
    const { response, loading, error, ...others } = useFetch<TData>(...args);
    // const { } = useFetch(`/coupons/fetch/${id}`);
    const [status, setStatus] = useState<Status>("idle");
    useEffect(() => {
        if (response.ok) {
            setStatus("success");
        } else if (error) {
            setStatus("error");
        }
        if (loading) {
            setStatus("loading");
        }
    }, [response, loading]);

    return {
        ...others,
        status,
        error,
        response,
        loading,
    };
}
