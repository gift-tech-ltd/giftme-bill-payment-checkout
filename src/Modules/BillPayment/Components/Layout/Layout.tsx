import { Outlet } from "react-router-dom";
import { Footer } from "@/Modules/BillPayment/Components/Layout/Footer";

interface Props {
    children?: React.ReactNode;
    logo?: string;
}
export const Layout: React.FC<Props> = ({ children }) => {
    console.log("🚀 ~ file: Layout.tsx ~ line 9 ~ children", children);
    return (
        <div className="bpl-px-1 bpl-mx-auto bpl-overflow-hidden xs:bpl-px-0 bpl-rounded-b-md" style={{ maxWidth: "450px" }}>
            <div className="bpl-mt-2 bpl-px-0.5 bpl-flex bpl-justify-center print-hide">
                <img
                    alt="Rushio Gift Store"
                    src="https://giftme.nyc3.digitaloceanspaces.com/gift-me/c4ca4238a0b923820dcc509a6f75849b/logo_1623541620.png"
                    className="bpl-block bpl-w-1/2 bpl-rounded-sm"
                />
            </div>
            <div data-name="content" className="bpl-mt-6 bpl-px-0.5">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
