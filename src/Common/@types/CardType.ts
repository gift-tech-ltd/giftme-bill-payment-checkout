export interface CardType {
    success: boolean;
    token: string;
    balance: string;
    currency: string;
    fee: number;
    receiver_name?: string;
    receiver_email?: string;
    receiver_phone?: string;
}
