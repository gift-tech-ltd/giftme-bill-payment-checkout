import { parse, stringify } from "query-string";
import { encodeQueryParams, QueryParamConfigMap, StringParam, decodeObject } from "serialize-query-params";

export const isEmptyQuery = (queryAsParams: Object, schema: QueryParamConfigMap) => {
    const queryObject = encodeQueryParams(schema, queryAsParams);
    if (!queryAsParams) {
        return true;
    }
    const keys = Object.keys(removeEmptyProps(queryObject));
    // if (keys.length === 1 && keys[0] === "search") {
    //     return true;
    // }
    if (keys.length === 0) {
        return true;
    }
    return false;
};

export const isEmpty = (queryAsParams: any, querySchema: any) => {
    const queryObject = encodeQueryParams(
        querySchema,

        queryAsParams as any
    );
    if (!queryAsParams) {
        return true;
    }
    const keys = Object.keys(removeEmptyProps(queryObject));
    if (keys.length === 1 && keys[0] === "search") {
        return true;
    }
    if (keys.length === 0) {
        return true;
    }
    return false;
};

export function createSearchQueryString(str: string) {
    if (str !== "" && str !== undefined && str !== null) {
        return `?search=${str}`;
    }
    return ``;
}
export function removeEmptyProps(obj: any) {
    for (let prop in obj) {
        if (obj[prop] === undefined || obj[prop] === null || obj[prop] === "") {
            delete obj[prop];
        }
    }
    return Object.assign(obj, {});
}

export function createQueryString(str: string) {
    if (str !== "") {
        return `?${str}`;
    }
    return ``;
}

// https://github.com/pbeshai/use-query-params/tree/master/packages/serialize-query-params
export function getQueryStringFromQeuryObject<T extends Object, T2 extends Object>(schema: T, values: T2) {
    const queryObject = encodeQueryParams(schema as any, values as any);

    return createQueryString(stringify(removeEmptyProps(queryObject)));
}

export function getQueryParamFromQueryString(queryString: string, schema?: QueryParamConfigMap) {
    const queryParams = parse(queryString, {
        arrayFormat: "comma",
        sort: undefined,
    });

    if (schema) {
        return encodeQueryParams(schema, queryParams);
    }
    return queryParams;
}

export function isQueryStringEmpty(location: Location): boolean {
    return Object.keys(getQueryParamFromQueryString(location.search || "")).length === 0;
}

export function isQueryOnlyPagination(location: Location): boolean {
    const qObj = getQueryParamFromQueryString(location.search || "") as { [key: string]: any };

    return Object.keys(qObj).length === 1 && qObj["page"];
}

export function createPaginationQueryString(path: string, page: number) {
    let pageQuery = path;

    if ((!isQueryStringEmpty(window.location) && isQueryOnlyPagination(window.location)) || isQueryStringEmpty(window.location)) {
        pageQuery = `?page=${page}`;
    } else if (!isQueryStringEmpty(window.location) && !isQueryOnlyPagination(window.location)) {
        pageQuery = `${location.search}&page=${page}`;
    }

    return `${path}${pageQuery}`;
}
