import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VerifyCard } from "@/Modules/BillPayment/Pages/VerifyCard";
import { Layout } from "@/Modules/BillPayment/Components/Layout/Layout";
import { Payment } from "@/Modules/BillPayment/Pages/Payment";
import { Status } from "@/Modules/BillPayment/Pages/Status";
// import your route components too

interface Props {
    children?: React.ReactNode;
}
export const BillPayment: React.FC<Props> = ({ children }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<VerifyCard />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/status" element={<Status />} />
                    {/* <Route path="/" element={<Invoice />} />
                        <Route path="payment" element={<SentInvoices />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
