export interface PayResponseType {
    success: boolean;
    message: string;
    data: Data;
}

export interface Data {
    id: number;
    total: string;
    currency: string;
    name: string;
}
