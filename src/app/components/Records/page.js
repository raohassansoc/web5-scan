"use client"
import { useState, useEffect } from 'react'
import axios from 'axios';
import Web3 from 'web3';
import $ from "jquery"

import '../../globals.css'

//funtions
import { getDoamin } from '@/functions';
import { convertEpochToRealTime } from '@/functions';
import { getTimeDifferenceFromNow } from '@/functions';
import { getTransactionDatanew } from '@/functions';
import { getBlockData } from '@/functions';
import { getNewDoamin } from '@/functions';
export default function Page() {

    const [latestBlock, setLatestBlock] = useState();
    const [latestBlockTime, setLatestBlockTime] = useState();
    const [latestBlockNumber, setLatestBlockNumber] = useState();
    const [totalTransaction, setTotaltransaction] = useState(0);
    const [latestTransaction, setLatestTransaction] = useState([]);
    const [latestTransactionHash, setLatestTransactionHash] = useState(0);
    const [transactionCount, setAddressTransactions] = useState([]);
    const [tokenValue, setTokenValue] = useState(null);
    const tokenAddress = "0x55d398326f99059ff775485246999027b3197955";
    const [count, setCount] = useState(10);
    const [TotalDomain, setTotalDomain] = useState(0);

    const [name, setName] = useState();


    const generateName = async () => {
        try {
            let newDoamin = await getNewDoamin();
            setName(newDoamin.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        async function domainTotal() {
            const domainCount = await getDoamin(1, 1);
            setTotalDomain(Number(domainCount?.total));
        }
        domainTotal()
        generateName();
    }, [name])



    useEffect(() => {
        const timerId = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    generateName();
                    return 10;
                } else {
                    return prevCount - 1;
                }
            });
        }, 10000);

        // Clear the interval once it's no longer needed to avoid memory leaks.
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        try {
            const epochTime = Number(latestBlock.timestamp);
            const realTime = convertEpochToRealTime(epochTime);
            const timeDifference = getTimeDifferenceFromNow(epochTime);
            //   // console.log(realTime, '.......', timeDifference);
            setLatestBlockTime(timeDifference.toFixed(0) + "sec");
        } catch (error) { }
    }, [latestBlock]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blocks = await getBlockData()
                // console.log(blocks?.data[0])
                await setLatestBlock(blocks?.data[0]);
                await setLatestBlockNumber(Number(blocks?.data[0].number))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        setTimeout(() => fetchData(), 15000)
    }, []);

    useEffect(() => {
        // Latest transaction Data
        const latestTransaction = async () => {
            try {
                const value = await getTransactionDatanew(1, 5);
                setTotaltransaction(value.total)
                const latest = value.data.slice(0, 1);
                // console.log("Latest Transaction Data", latest)
                setLatestTransaction(latest);
                setLatestTransactionHash(latest[0].hash.substr(0, 8) + ".." + latest[0].hash.substr(59, 66))
            } catch (error) {
                // console.log(error);
            }
        };
        latestTransaction();
    }, []);

    useEffect(() => {
        const fetchTokenValue = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
                );
                const data = response.data;

                const value = data[tokenAddress.toLowerCase()].usd;
                var completeValue = value.toFixed(9);

                setTokenValue(completeValue);
            } catch (error) {
                console.error("Error fetching token value:", error);
            }
        };

        fetchTokenValue();
    }, [tokenAddress]);


    // console.clear();
    return (
        <>
            <div className="flex flex-col gap-y-4 gap-x-6 md:grid md:grid-cols-2 xl:grid-cols-3">
                <div className="w-full block">

                    <div style={{ padding: '25px 10px', background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                        <div className="responsiveHide bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                            <span className="text-2xl font-mediun textColor1">
                                ₮
                            </span>
                        </div>
                        <div className="flex flex-col justify-between space-y-1">
                            <span onClick={generateName} className="text-xs text-secondary-3 font-medium">
                                USDT Price
                            </span>
                            <span className="text-sm font-medium textColor1">
                                $
                                {/* 1.00 */}
                                {tokenValue ? tokenValue : 'Loading...'}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }} className="flex   md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">

                        {/* marginLeft: 'auto', marginRight: '12px',  marginBottom: '-8px'  */}
                        <div style={{ padding: '25px 10px', width: '100%', background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            <div className="responsiveHide bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                <span className="text-2xl font-mediun textColor1">
                                    Ꞗ</span>
                            </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Latest Block
                                </span>
                                <span className="text-sm font-medium textColor1">
                                    {latestBlockNumber ? latestBlockNumber : "Loading..."}
                                </span>
                            </div>
                        </div>
                        {/* <div style={{ padding: '15px', marginLeft: '5px', marginRight: 'auto', width: '55%', height: '88px', marginBottom: '-8px' }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center    ">
                            <div className="responsiveHide spinner">
                                <div className='o1' />
                                <div className='o2' />
                                <div className='o3' />
                                <div className='o4' />
                                <div className='o5' />
                                <div className='o6' />
                            </div>

                            <div className="bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                            <span className="text-2xl font-mediun textColor1">
                            {count > 0 ? count : '🌐'}
                           

                            </span>
                        </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Minting a new domain every few sec
                                </span>
                                <span className="text-sm font-medium textColor1">
                                    {name ? name.username : "Loading..."}
                                </span>
                            </div>
                        </div> */}

                    </div>


                </div>
                <div className="w-full">
                    <div className="flex flex-col h-full justify-center lg:justify-between">
                        <div style={{ padding: '25px 10px', background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            <div className="responsiveHide bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                <span className="text-2xl font-mediun textColor1 ">
                                    ₸</span>
                            </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Latest Transaction
                                </span>
                                <div className="flex flex-wrap items-center text-sm textColor1 space-x-1">
                                    {/* <span className="font-semibold">10.38m</span>
                                    <span className="text-xs">in Epoch</span>
                                    <span className="text-xs font-semibold">419</span> */}

                                    {latestTransactionHash ? latestTransactionHash : 'Loading...'}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '10px', paddingBottom: '9px' }} className="flex   md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            {/* <div style={{ padding: '15px', marginLeft: 'auto', marginRight: '12px', width: '45%', height: '88px', marginBottom: '-8px' }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center"> */}
                            {/* <div className="bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                    <span className="text-2xl font-mediun textColor1">
                                    ⭐</span>
                                </div>
                                <div className="flex flex-col justify-between space-y-1">
                                    <span className="text-xs text-secondary-3 font-medium">
                                    Total Domains
                                    </span>
                                    <span className="text-sm font-medium textColor1">
                                    {TotalDomain ? TotalDomain : 'Loading..'}
                                    </span>
                                </div> */}
                            {/* <div className='countermain'>
                                    <span className="text-xs text-secondary-3 font-medium responsiveHide">
                                        Total Domains
                                    </span>
                                    <div className="counter">
                                        {TotalDomain.toString().padStart(2, '0').split('').map((digit, index) => (
                                            <div key={index} className="digit">{digit}</div>
                                        ))}
                                    </div>
                                </div> */}
                            {/* </div> */}

                            <div style={{ padding: '25px 10px', width: '100%', background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center    ">
                                <div className="responsiveHide bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                    <span className="text-2xl font-mediun textColor1">
                                        ℟</span>
                                </div>
                                <div className="flex flex-col justify-between space-y-1">
                                    <span className="text-xs text-secondary-3 font-medium">
                                        Reward distributed
                                    </span>
                                    <span className="text-sm font-medium textColor1">
                                        $ {latestBlockNumber ? latestBlockNumber * 2 / 1000000 : "Loading..."} M
                                    </span>
                                </div>
                            </div>

                        </div>


                        {/* <div style={{ padding: '25px 10px', marginTop: '10px' }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            <div className="bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                <span className="text-2xl font-mediun textColor1">
                                    ℟</span>
                            </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Reward distributed
                                </span>
                                <span className="text-sm font-medium textColor1">
                                    $ {latestBlockNumber ? latestBlockNumber * 2 / 1000000 : "Loading..."} M
                                </span>
                            </div>
                        </div> */}

                        {/* <div style={{ padding: '25px 10px', marginTop: '10px' }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            <div className="bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                <span className="text-2xl font-mediun textColor1">
                                    ₮
                                </span>
                            </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Total Transactions
                                </span>
                                <span className="text-sm font-medium textColor1">
                                    {totalTransaction ? totalTransaction : "Loading..."}
                                </span>
                            </div>
                        </div> */}
                        {/* <div style={{ padding: '10px 10px', marginTop: '10px' }} className="flex gap-x-3 rounded-md items-center bg-lightground-2 pl-3 py-2 gap-y-2 dark:bg-darkground-4 md:flex-col md:items-start lg:py-0 lg:flex-row lg:items-center">
                            <div className="bg-[cornflowerblue]-3 w-9 h-9 rounded-md flex items-center justify-center dark:bg-darkground">
                                <span className="text-2xl font-mediun textColor1">
                                    ₡</span>
                            </div>
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-xs text-secondary-3 font-medium">
                                    Market Cap
                                </span>
                                <span className="text-sm font-medium textColor1">
                                    {latestBlockNumber ? latestBlockNumber * 2 * tokenValue : "Loading..."}
                                </span>
                            </div>
                        </div> */}
                        {/* <div className="flex flex-col gap-y-6">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
                                <div className="flex flex-col px-3 py-2 rounded-md space-y-1 bg-lightground-2 dark:bg-darkground-4">
                                    <span className="text-sm font-semibold textColor1">
                                        Epoch
                                    </span>
                                    <a
                                        className="link font-mono"
                                        id="current-epoch-link"
                                        href="/"
                                        target="_blank"
                                    >
                                        <span
                                            className="text-sm text-[cornflowerblue] font-semibold font-mono"
                                            id="current-epoch"
                                        >
                                            0
                                        </span>
                                    </a>
                                </div>
                                <div className="flex flex-col px-3 py-2 rounded md space-y-1 bg-lightground-2 dark:bg-darkground-4">
                                    <span className="text-sm font-semibold textColor1">Slot</span>
                                    <span className="text-sm">
                                        <span
                                            className="text-[cornflowerblue] font-semibold font-mono"
                                            id="current-slot"
                                        >
                                            0
                                        </span>
                                        <span className="mx-1 text-secondary-3">/</span>
                                        <span className="text-secondary-3" id="max-slot">
                                            0
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-10 rounded-lg flex justify-center items-center relative z-0 bg-[cornflowerblue]-1 overflow-hidden dark:bg-darkground-4">
                                <span
                                    className="relative z-10 text-sm font-semibold textColor1"
                                    id="epoch-progress-percentage"
                                >
                                    0%
                                </span>
                                <div
                                    className="absolute z-0 top-0 left-0 bg-[cornflowerblue]-70 h-10 rounded-l-lg"
                                    id="epoch-progress-bar"
                                    style={{ width: 0 }}
                                    role="progressbar"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-center text-lg font-medium mt-4 textColor1">
                                Current Epoch Ends In
                            </h1>
                            <div className="px-6 py-2 rounded-md mt-2 bg-lightground-2 dark:bg-darkground-4">
                                <div className="flex gap-x-2 items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary-3">Day</span>
                                        <span
                                            className="text-sm font-semibold font-mono textColor1"
                                            id="epoch-endsin-day"
                                        >
                                            00d
                                        </span>
                                    </div>
                                    <div>
                                        <p className="textColor1">:</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary-3">Hour</span>
                                        <span
                                            className="text-sm font-semibold font-mono textColor1"
                                            id="epoch-endsin-hour"
                                        >
                                            00h
                                        </span>
                                    </div>
                                    <div>
                                        <p className="textColor1">:</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary-3">Min</span>
                                        <span
                                            className="text-sm font-semibold font-mono textColor1"
                                            id="epoch-endsin-min"
                                        >
                                            00m
                                        </span>
                                    </div>
                                    <div>
                                        <p className="textColor1">:</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-secondary-3">Sec</span>
                                        <span
                                            className="text-sm font-semibold font-mono textColor1"
                                            id="epoch-endsin-sec"
                                        >
                                            00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="w-full col-span-2 xl:col-span-1 xs:hidden" id="graph-container">

                    <div style={{ marginLeft: '-8px', marginRight: 'auto' }} className='frame'>
                        {/* <iframe width="100%" height="202" frameBorder="0" scrolling="no" src="https://coinbrain.com/coins/bnb-0x9767c8e438aa18f550208e6d1fdf5f43541cc2c8/ticker?theme=dark&padding=16&type=medium&currency=USD&blocks=price%2CmarketCap%2Cvolume24h"></iframe> */}
                        <iframe
                            width="100%" height="202" frameBorder="0" scrolling="no"
                            src="https://coinbrain.com/coins/eth-0xdac17f958d2ee523a2206206994597c13d831ec7/ticker?theme=dark&padding=16&type=medium&currency=USD&blocks=price%2CmarketCap%2Cvolume24h"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
