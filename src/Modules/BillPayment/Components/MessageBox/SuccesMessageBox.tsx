import React from "react";

export const SuccessMessageBox: React.FC = ({ children }) => {
    return (
        <div id="success" className="status-section">
            <div className="bpl-max-w-screen-sm bpl-mx-auto bpl-mb-2">
                <div className="bpl-px-4 bpl-py-3 bpl-text-teal-700 bpl-bg-teal-100 bpl-rounded" role="alert">
                    <div className="bpl-flex">
                        <div className="bpl-py-1">
                            <svg className="bpl-w-6 bpl-h-6 bpl-mr-4 bpl-text-teal-500 bpl-fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="bpl-font-bold">Success</p>
                            <p id="success-message" className="bpl-text-sm">
                                {children}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
