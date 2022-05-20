import { BillerType } from "@/Common/@types/BillerType";

export interface BillerResponseType {
    success: boolean;
    billers: BillerType[];
}
