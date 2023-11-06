import React from "react";
import Image from 'next/image';
import logo from '../../../logo.png'
const Page = () => {
    return (
        <>
            <footer>
                <div className="pt-12 pb-8" style={{ background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }}>
                    <div className="appContainer px-2">
                        <div className="p-8 rounded-2xl border border-[#2D2F32] md:px-8 md:pt-8 md:pb-4">
                            <div className="flex flex-col gap-y-10 gap-x-12 md:flex-row">
                                <div className="flex flex-col space-y-4">
                                    <a className="flex items-center" href="/">
                                        {/* <h2 className='text-[cornflowerblue] font-[inherit] font-extrabold text-[27px]' >SOC<span className='font-[cursive]'>scan</span></h2> */}
                                        <img src='/images/portfolio-logo.png' alt='picture' width={'150px'} height={'50px'} />
                                    </a>
                                    <div className="md:max-w-sm">
                                        <span className="text-base mt-5 text-secondary-2"
                                            style={{ color: "white" }}
                                        >
                                            Feature rich blockchain explorer and analytics platform for
                                            Web 5 Solution
                                        </span>
                                    </div>
                                </div>
                                <div className="grid text-lg gap-y-10 gap-x-5 md:grid-cols-2 md:mx-auto lg:grid-cols-4">
                                    <div>
                                        <h2 className="text-secondaryDark-1">Useful links</h2>
                                        <div className="mt-2 flex flex-col gap-y-2 text-sm text-secondary-2"
                                            style={{ color: "white" }}
                                        >
                                            <a
                                                className="hover:text-[cornflowerblue]"
                                                // href="https://typhonwallet.io/"
                                                target="_blank"
                                            >
                                                Typhon Wallet
                                            </a>
                                            <a
                                                className="hover:text-[cornflowerblue]"
                                                target="_blank"
                                            >
                                                Web5 Dev Portal
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-secondaryDark-1">Web 5 scan</h2>
                                        <div className="mt-2 flex flex-col gap-y-2 text-sm text-secondary-2"
                                            style={{ color: "white" }}
                                        >
                                            <a className="hover:text-[cornflowerblue]" >
                                                Transaction
                                            </a>
                                            <a className="hover:text-[cornflowerblue]" >
                                                Blogs
                                            </a>
                                            <a className="hover:text-[cornflowerblue]" >
                                                Accounts
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-secondaryDark-1">Social</h2>
                                        <div className="mt-2 flex flex-col gap-y-2 text-sm text-secondary-2"
                                            style={{ color: "white" }}
                                        >
                                            <a
                                                className="hover:text-[cornflowerblue]"
                                                target="_blank"
                                            >
                                                <div className="flex gap-x-2 items-center">
                                                    <span
                                                        className="iconify-inline text-base text-red-600"
                                                        data-icon="mdi:heart"
                                                        data-inline="false"
                                                    />
                                                    <span>Facebook</span>
                                                </div>
                                            </a>
                                            <a
                                                className="hover:text-[cornflowerblue]"
                                                target="_blank"
                                            >
                                                <div className="flex gap-x-2 items-center">
                                                    <span
                                                        className="iconify-inline text-base text-red-600"
                                                        data-icon="mdi:heart"
                                                        data-inline="false"
                                                    />
                                                    <span>linkedin</span>
                                                </div>
                                            </a>
                                            <a
                                                className="hover:text-[cornflowerblue]"
                                                target="_blank"
                                            >
                                                <div className="flex gap-x-2 items-center">
                                                    <span
                                                        className="iconify-inline text-base text-red-600"
                                                        data-icon="mdi:heart"
                                                        data-inline="false"
                                                    />
                                                    <span>linkedin</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-between items-center mt-4 md:flex">
                                <div className="relative" data-dropdown="" data-navigation-group="">
                                    {/* <button
                                        className="flex items-center p-2 rounded-md gap-x-1 bg-[#181818]"
                                        type="button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                        data-dropdown-button=""
                                    >
                                        <span
                                            className="iconify-inline text-sm"
                                            data-icon="ic:baseline-language"
                                            data-inline="false"
                                        />
                                        <span className="text-sm text-white" id="preferedLanguage">
                                            Lan - English
                                        </span>
                                        <span
                                            className="iconify-inline"
                                            data-icon="mdi:menu-down"
                                            data-inline="false"
                                            style={{ fontSize: 15 }}
                                        />
                                    </button> */}
                                    <div
                                        className="origin-top-right absolute left-0 bottom-2 mt-2 rounded-md shadow-lg ring-1 bg-darkground-3 ring-darkground-4 px-1 hidden z-50 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                        tabIndex={-1}
                                        data-dropdown-content=""
                                    >
                                        <div
                                            className="flex flex-col text-secondaryDark-2 text-sm py-1"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            <button
                                                className="pl-3 pr-7 py-2 rounded-md hover:bg-darkground-4 hover:text-secondaryDark-1"
                                                target="_blank"

                                            >
                                                English
                                            </button>
                                            <button
                                                className="pl-3 pr-7 py-2 rounded-md hover:bg-darkground-4 hover:text-secondaryDark-1"
                                                target="_blank"

                                            >
                                                Japanese
                                            </button>
                                            <button
                                                className="pl-3 pr-7 py-2 rounded-md hover:bg-darkground-4 hover:text-secondaryDark-1"
                                                target="_blank"

                                            >
                                                Spanish
                                            </button>
                                            <button
                                                className="pl-3 pr-7 py-2 rounded-md hover:bg-darkground-4 hover:text-secondaryDark-1"
                                                target="_blank"

                                            >
                                                Korean
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-secondaryDark-2">
                                        Price and MarketCap info provided by
                                    </span>
                                    <a
                                        // href="https://www.coingecko.com/en/coins/tether"
                                        target="_blank"
                                    >
                                        <span className="text-xs ml-2 font-semibold text-[cornflowerblue] hover:text-[cornflowerblue]-70">
                                            CoinGecko
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between px-3">
                            <div className="flex flex-col text-center text-sm text-secondaryDark-1 md:flex-row">
                                <span className="mr-3 cursor-default ">© 2023</span>
                                <a className="cursor-default font-medium" >
                                    Web5 scan.io
                                </a>
                            </div>
                            {/* <a
                                href="#"
                                target="_blank"
                            >
                                <div className="flex gap-x-2 items-center text-sm">
                                    <span>Donate</span>
                                    <span
                                        className="iconify-inline text-lg text-red-600"
                                        data-icon="mdi:heart"
                                        data-inline="false"
                                    />
                                </div>
                            </a> */}
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-5 w-full z-50 hidden" id="cookieConsentBanner">
                    <div className="flex justify-center w-full">
                        <div className="mx-3 px-7 py-5 bg-darkground-4 rounded-lg flex items-center gap-5">
                            <p className="text-sm">
                                <span className="text-secondaryDark-1">
                                    This site uses cookies to provide a better user experience. By
                                    continuing to use Web5 scan you agree to our
                                </span>
                                <a className="link ml-1 text-sm"
                                //  href="/en/privacy"
                                 >
                                    Privacy Policy
                                </a>
                            </p>
                            <button
                                className="bg-[cornflowerblue] rounded-md flex items-center px-4 py-2 hover:bg-[cornflowerblue]-80"
                                id="cookieConsentAccept"
                            >
                                <span className="text-sm text-white">Accept</span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Page;

