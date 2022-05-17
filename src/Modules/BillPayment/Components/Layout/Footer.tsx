import { Fragment } from "react";

export const Footer: React.FC = () => {
    return (
        <Fragment>
            <div className="bpl-px-1 bpl-py-1 bpl-mt-3 bpl-mb-1 bpl-text-sm bpl-border-t-2 bpl-border-solid bpl-border-base-300">
                <p className="bpl-my-3 bpl-text-center">
                    Giftme's{" "}
                    <a
                        target="_black"
                        href="https://shopgiftme.com/terms?utm_campaign=ref&amp;utm_source=bill+portal"
                        className="bpl-text-blue-600 hover:bpl-underline"
                    >
                        Terms of Service
                    </a>{" "}
                    <span>and </span>
                    <a
                        target="_black"
                        href="https://shopgiftme.com/privacy?utm_campaign=ref&amp;utm_source=bill+portal"
                        className="bpl-text-blue-600 hover:bpl-underline"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
            <div className="bpl-flex bpl-flex-col bpl-items-center bpl-justify-center bpl-mt-5 bpl-mb-6">
                <div>
                    <span className="bpl-font-semibold">Powered by</span>
                </div>
                <div>
                    <a
                        className="bpl-no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://shopgiftme.com/?utm_campaign=ref&amp;utm_source=bill+portal"
                    >
                        <img style={{ width: "100px" }} src="https://imagedelivery.net/K0L1WVoHlMzFpKNmrG_b-Q/3b5f2181-4df8-4de9-18cc-f3547e26bb00/public" />
                    </a>
                </div>

                <div className="bpl-mt-3">
                    {/* <h4 className="font-semibold">Follow us on</h4>  */}
                    <div className="bpl-flex bpl-justify-center bpl-mt-2">
                        <a
                            title="Follow us on facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/getgiftme"
                            className="bpl-cursor-pointer bpl-text-base-500 hover:bpl-text-primary-400"
                        >
                            <svg fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="bpl-w-5 bpl-h-5">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a
                            title="Follow us on instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/getgiftme"
                            className="bpl-ml-3 bpl-cursor-pointer bpl-text-base-500 hover:bpl-text-primary-400"
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="bpl-w-5 bpl-h-5"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a
                            title="Follow us on twitter"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/giftmeofficial"
                            className="bpl-ml-3 bpl-cursor-pointer bpl-text-base-500 hover:bpl-text-primary-400"
                        >
                            <svg fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="bpl-w-5 bpl-h-5">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
