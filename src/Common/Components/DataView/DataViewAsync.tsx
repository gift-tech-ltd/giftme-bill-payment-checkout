import React, { useEffect, useState } from "react";

// import { PaginationProps } from "@/app/Common/@types/Pagination";
import { PaginationProps } from "@/Common/@types/Pagination";
import { isQueryStringEmpty } from "@/Common/Helpers/String/queryStringHelpers";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
    status: Status;
    collection: PaginationProps<any[]> | { [key: string]: any };
    children: React.ReactNode;
}

interface SectionProps {
    children: React.ReactNode | ((data: any) => React.ReactNode);
}
interface Context {
    status: Status;
    collection: PaginationProps<any[]> | { [key: string]: any };
    isQueryEmpty: boolean;
    isCollectionEmpty: boolean;
}
const DataViewContext = React.createContext<Omit<Context, "children"> | undefined>(undefined);

function QueryEmpty({ children }: SectionProps) {
    const { isCollectionEmpty, isQueryEmpty } = useDataView();
    return <>{isCollectionEmpty && !isQueryEmpty ? children : null}</>;
}

function Empty({ children }: SectionProps) {
    const { isCollectionEmpty, isQueryEmpty, status } = useDataView();
    return <>{status === "success" && isCollectionEmpty && isQueryEmpty ? children : null}</>;
}
function Rejected({ children }: SectionProps) {
    const { status, isCollectionEmpty } = useDataView();
    return <>{status === "error" && isCollectionEmpty ? children : null}</>;
}

function Success({ children }: SectionProps) {
    const { status, isCollectionEmpty, collection } = useDataView();
    const _children = typeof children === "function" ? () => children(collection) : () => children;
    return <>{status === "success" && !isCollectionEmpty ? _children() : null}</>;
}

function Loading({ children }: SectionProps) {
    const { status } = useDataView();
    return <>{status === "loading" ? children : null}</>;
}

function Idle({ children }: SectionProps) {
    const { status } = useDataView();
    return <>{status === "idle" ? children : null}</>;
}

export function useDataView() {
    const context = React.useContext(DataViewContext);
    if (!context) {
        throw new Error(`RenderListView components cannot be rendered outside the RenderListView component`);
    }
    return context;
}

export function DataViewAsync({ children, collection, status }: Props) {
    // console.log("🚀 ~ file: DataViewAsync.tsx ~ line 60 ~ DataViewAsync ~ status", status);
    const location = window.location;
    const [isQueryEmpty, setQueryEmpty] = useState(false);
    const [isCollectionEmpty, setCollectionEmpty] = useState(false);

    useEffect(() => {
        setQueryEmpty(isQueryStringEmpty(location));
    }, []);

    useEffect(() => {
        if (collection) {
            if (Array.isArray(collection.data)) {
                setCollectionEmpty(collection.data.length === 0);
            } else if (collection && !collection.data && typeof collection === "object") {
                setCollectionEmpty(Object.keys(collection).length === 0);
            }
        }
    }, [collection]);

    return <DataViewContext.Provider value={{ isQueryEmpty, collection, isCollectionEmpty, status }}>{children}</DataViewContext.Provider>;
}

DataViewAsync.EmptyQuery = QueryEmpty;
DataViewAsync.Empty = Empty;
DataViewAsync.Error = Rejected;
// DataView.Aborted = Aborted;
DataViewAsync.Loading = Loading;
DataViewAsync.Success = Success;
DataViewAsync.Idle = Idle;
