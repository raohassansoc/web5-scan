"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';
//functions
import { getSearchResult } from '@/functions';
// Components
import CoinPriceChart from "../CoinPriceChart/page"
import Modal from '../Loder/page'

export default function Page() {
    const router = useRouter();
    const navigate = (path, data) => {
        const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
        router.push(`${path}${queryString}`);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const loderStart = () => {
        setIsModalOpen(true);
    };

    const loderEnd = () => {
        setIsModalOpen(false);
    };


    const cryptoWalletAddressRegex = /^(0x)?[A-Fa-f0-9]{40}$/;
    const txnAndBlockHashRegex = /^0x([A-Fa-f0-9]{64})$/;
    const domainNameRegex = /^[a-zA-Z0-9_.]*\.mmit$/i;

    const [searchVal, setSearchVal] = useState("");
    const onSearchChangeHandler = (e) => {
        setSearchVal(e.target.value);
    };

    const searchHandler = async (e) => {
        loderStart();
        e.preventDefault();
        try {
            const data = await getSearchResult(searchVal);
            console.log(data)

            if (data) {
                if (cryptoWalletAddressRegex.test(searchVal)) {
                    navigate('/addressinfo', searchVal);
                    // loderEnd();
                } else if (domainNameRegex.test(searchVal)) {
                    navigate('/addressinfo', `${data.data.accountAddress.toLowerCase()}`);
                    // loderEnd();
                } else if (txnAndBlockHashRegex.test(searchVal)) {
                    if (!data.data[0].blockHash) {
                        navigate('/blockinfo', data.data[0].number.toString());
                        // loderEnd();
                    } else if (data.data[0].blockHash) {
                        navigate("/trxinfo", `${data.data[0].hash.toString()}`)
                        // loderEnd();
                    }
                }

            }
        } catch (error) {
            console.error("Error fetching token value:", error);
            loderEnd();
        }
    };

    function measureExecutionTime(fn) {
        const start = performance.now();
        fn();
        const end = performance.now();
        const timeTaken = end - start;
        console.log(`Function took ${timeTaken} milliseconds to execute.`);
        return timeTaken;
    }
    useEffect(() => {
        if (isModalOpen == true) {
            measureExecutionTime(() => {
                for (let i = 0; i < 10000000; i++) {
                    if (i >= 60000000) {
                        loderEnd();
                    }
                }
            })
        }
    }, [isModalOpen]);
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={loderEnd} />
            <div className="flex items-center gap-10" >
                <div className="flex flex-col grow">
                    <span className="cardTitle">Web5  Blockchain Explorer</span>
                    <form
                        className="mt-7 flex w-full h-12 bg-lightground rounded-lg overflow-hidden dark:bg-darkground-3 dark:border dark:border-darkground-4 dark:border-opacity-50"
                    >
                        <div className="flex p-2 w-full" style={{background: "white"}}>
                            <div className="border-r borderColor items-center justify-center pl-2 pr-3 space-x-2 hidden md:block md:flex">
                                <span
                                    className="m-auto iconify-inline textColor2"
                                    data-icon="mdi:filter"
                                    data-inline="false"
                                    style={{ fontSize: 20 }}
                                />
                                <div className="relative">
                                    <select
                                        className="h-full bg-transparent text-sm textColor2 cursor-pointer pl-1 pr-5 focus:outline-none"
                                        name="filter"
                                        style={{ color: "black" }}
                                    >
                                        <option value="all" style={{ color: "black" }}>
                                            All Filters
                                        </option>
                                        <option value="blocks">Blocks</option>
                                        <option value="domain">Domain Name</option>
                                        {/* <option value="metadata">Metadata</option>
                                        <option value="stakeKey">Stake Keys</option>
                                        <option value="pool">Pools</option>
                                        <option value="token">Tokens</option> */}
                                        <option value="transaction">Transactions</option>
                                        <option value="address">Addresses</option>
                                    </select>
                                    <span
                                        className="iconify-inline textColor2 absolute pointer-events-none right-0 top-0.5"
                                        data-icon="mdi:chevron-down"
                                        data-inline="false"
                                        style={{ fontSize: 20 }}
                                    />
                                </div>
                            </div>
                            <input
                                className="text-sm h-full w-full px-2 bg-transparent textColor1 focus:outline-none"
                                placeholder="Search transaction, address, block, domainName, "
                                type="search"
                                id="search"
                                name="value"
                                spellCheck="false"
                                required=""
                                value={searchVal}
                                onChange={onSearchChangeHandler}
                                style={{color: "black"}}
                            />
                        </div>
                        <button type='submit' style={{ background: 'cornflowerblue' }} onClick={searchHandler} className="px-6  text-white hover:bg-[cornflowerblue]">
                            <p className="text-sm">Search</p>
                        </button>
                    </form>
                    <div className="mt-2">
                        <span id="c_widget_es" style={{ visibility: "visible" }} />
                    </div>
                </div>
                {/* <div className="hidden lg:block" style={{ width: 320, height: 110 }}>
                    <div className="relative" style={{ width: 320, height: 110 }}>
                        <a
                            href="#"
                            target="_blank"
                        >
                            <div
                                className="absolute"
                                style={{ width: 320, height: 110, zIndex: 2 }}
                            />
                        </a>
                        <div
                            className="absolute top-0 rounded-lg overflow-hidden"
                            style={{ width: 333, height: 128, marginLeft: '-17px' }}
                        >
                            <iframe
                                src="https://sda.cardanoscan.io/ranbe/bcg/index.html"
                                frameBorder={0}
                                width={640}
                                height={220}
                                style={{
                                    WebkitTransform: "scale(0.5)",
                                    WebkitTransformOrigin: "0 0",
                                    OTransform: "scale(0.5)",
                                    OTransformOrigin: "0 0",
                                    msZoom: "0.5",
                                    MozTransform: "scale(0.5)",
                                    MozTransformOrigin: "0 0"
                                }}
                            />
                            <CoinPriceChart />
                            <>
                            <div>
                                <iframe
                                src="https://gifer.com/embed/3UuW"
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: 0, left: 0 }}
                                frameBorder={0}
                                allowFullScreen=""
                                />
                            </div>
                            <p>
                                <a href="https://gifer.com">via GIFER</a>
                            </p>
                            </>

                        </div>
                        <small
                            className="absolute rounded-md bg-[cornflowerblue]-1 text-gray-700"
                            style={{
                                right: 10,
                                top: "-10px",
                                fontSize: 12,
                                padding: "2px 3px"
                            }}
                        >
                            Ad
                        </small>
                    </div>
                </div> */}
            </div>
        </>
    )
}
