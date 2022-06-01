export interface PayResponseType {
    success: boolean;
    message: string;
    data: Data;
}

export interface Data {
    id: number;
    total: string;
    unit_cost: string;
    fee: string;
    currency: string;
    name: string;
}
