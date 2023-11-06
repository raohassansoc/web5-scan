"use client"
import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import web3 from "web3";
//functions
import { getBlockData } from '@/functions';
import { getTransactionDatanew } from '@/functions';

//components
import Modal from '../Loder/page'

export default function Page() {
    const Web3 = new web3();
    const router = useRouter();
    const navigate = (path, data) => {
        // const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
        // router.push(`${path}${queryString}`);
    };

    const [allBlogs, setAllBlogs] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [Loder, setLoder] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const loderStart = () => {
        setIsModalOpen(true);
    };

    const loderEnd = () => {
        setIsModalOpen(false);
    };




    useEffect(() => {
        // Block Data
        const fetchData = async () => {

            try {
                const blocks = await getBlockData();
                setAllBlogs(blocks?.data);
                loderEnd();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

        // Transaction Data
        const fetchDataTransaction = async () => {
            try {
                const value = await getTransactionDatanew(1, 12);
                await setTransactions(value?.data);
            } catch (error) {
            }
            // try {
            //     const value = await getTransactionData();
            //     const latestTransactions = value.slice(0, 12); // Get the latest 12 blocks
            //     // // console.log(value);
            //     setTransactions(latestTransactions);
            // } catch (error) {
            //     // // console.log(error);
            // }
        };
        fetchDataTransaction();
    }, []);

    return (
        <>
            <div className="mt-6">
                <Modal isOpen={isModalOpen} onClose={loderEnd} />
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="card flex flex-col w-full" style={{ background: `linear-gradient(to bottom, #1565C0, #1565C0)` }}>
                        <div className="flex justify-between items-center">
                            <span className="cardTitle">Recent Transactions</span>
                            {/* <Link
                                href={"/Transactions"}
                                className="flex items-center justify-center viewAllButton"
                            >
                                <span>View All</span>
                            </Link> */}
                        </div>
                        <div
                            className="mt-5 flex w-full overflow-auto customScrollBar"
                            style={{ maxHeight: 550 }}
                        >
                            <table className="appTable singleRowsTable w-full">
                                <thead>
                                    <tr>
                                        <th style={{color: "white"}}>Transaction Hash</th>
                                        <th style={{color: "white"}}>Timestamp</th>
                                        <th style={{color: "white"}}>Block</th>
                                        <th style={{color: "white"}}>Output Address</th>
                                        <th style={{color: "white"}}>
                                            <span className="block text-right">Value</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length > 0 && transactions.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr className={index % 2 === 0 ? 'ever-odd' : 'odd'}>
                                                <td>
                                                    <div className="flex flex-col space-y-1">
                                                        <a
                                                            onClick={() => navigate("/trxinfo", `${item.hash}`)}
                                                            className="font-mono link"
                                                            data-tooltip="2cf215897e5607f624228e3968e0dc23f617a7cbb9b8cf8ecfddb4006368446a"
                                                        >
                                                            {item.hash ? item.hash.substr(0, 8) + ".." + item.hash.substr(58, 66) : "......"}
                                                        </a>
                                                        <span className="generalTimestamp text-xs textColor2">
                                                            {item.chainId}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-col space-y-1">
                                                        <span className="generalTimestamp text-xs textColor2">
                                                            {new Date(item.timestamp * 1000).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-col">
                                                        <a onClick={() => navigate("/blockinfo", `${item.blockNumber}`)} className="link font-mono">
                                                            {item.blockNumber}
                                                        </a>
                                                        <div className="flex items-center">
                                                            <a className="font-mono text-xs link">
                                                                {item.nonce}
                                                            </a>
                                                            <span className="text-xs textColor1 mx-1">/</span>
                                                            <span className="text-xs textColor1 font-mono">
                                                                {item.gas}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-col space-y-1">
                                                        {item.from ?
                                                            <a
                                                                className="font-mono link"
                                                                onClick={() => navigate("/addressinfo", `${item.from.toLowerCase()}`)}
                                                            >
                                                                <span >
                                                                    {item.from ? item.from.substr(0, 8) + ".." + item.from.substr(35, 42) : "......"}
                                                                </span>
                                                            </a>
                                                            :
                                                            <a
                                                                className="font-mono link"

                                                            >
                                                                <span >
                                                                    Contract
                                                                </span>
                                                            </a>
                                                        }
                                                        {item.to ?

                                                            <a
                                                                className="font-mono link"
                                                                onClick={() => navigate("/addressinfo", `${item.to.toLowerCase()}`)}
                                                            >
                                                                <span >
                                                                    {item.to ? item.to.substr(0, 8) + ".." + item.to.substr(35, 42) : "......"}
                                                                </span>
                                                            </a>

                                                            :

                                                            <span className="text-xs textColor1 font-mono">
                                                                Contract
                                                            </span>

                                                        }

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-end">
                                                        <div className="flex items-baseline font-mono">
                                                            <span className="text-sm font-semibold text-green-600">{Web3.utils.fromWei(item.value, "ether")}</span>
                                                            {/* <span className="text-xs text-green-600">&nbsp;MMIT</span> */}
                                                            <div className="ml-2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card flex flex-col w-full" style={{ background: `linear-gradient(to bottom, #1565C0, #1565C0)` }}>
                        <div className="flex justify-between items-center">
                            <span className="cardTitle">Recent Blocks</span>
                            {/* <Link
                                href={"/Blocks"}
                                className="flex items-center justify-center viewAllButton"
                            >
                                <span>View All</span>
                            </Link> */}
                        </div>
                        <div
                            className="mt-5 flex w-full overflow-auto customScrollBar"
                            style={{ maxHeight: 550 }}
                        >
                            <table className="appTable singleRowsTable w-full">
                                <thead>
                                    <tr>
                                        <th style={{color: "white"}}>Block</th>
                                        <th style={{color: "white"}}>Epoch / Size</th>
                                        <th style={{color: "white"}}>Miner</th>
                                        <th>
                                            <span className="block text-right" style={{color: "white"}}>Transactions</span>
                                        </th>
                                        <th>
                                            <span className="block text-right" style={{color: "white"}}>Hash</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allBlogs?.length > 0 && allBlogs.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr className={index % 2 === 0 ? 'ever-odd' : 'odd'} >
                                                <td>
                                                    <div className="flex flex-col space-y-1">
                                                        <a onClick={() => navigate("/blockinfo", `${item.number}`)} className="font-mono link">
                                                            {Number(item.number)}
                                                        </a>
                                                        <span className="generalTimestamp text-xs textColor2">
                                                            {Number(item.difficulty)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <a className="font-mono link" >
                                                            {Number(item.timestamp)}
                                                        </a>
                                                        <span className="text-xs textColor1 mx-1">/</span>
                                                        <span className="textColor1 font-mono">{Number(item.size)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a
                                                        className="link"
                                                        data-tooltip="ed40b0a319f639a70b1e2a4de00f112c4f7b7d4849f0abd25c4336a4"
                                                        onClick={() => navigate("/addressinfo", `${item.miner.toLowerCase()}`)}
                                                    >
                                                        <span className="text-sm">
                                                            {item.miner ? item.miner.substr(0, 6) + "...." + item.miner.substr(37, 42) : "......"}
                                                        </span>
                                                    </a>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-end">
                                                        <a
                                                            className="link font-mono"

                                                        >
                                                            <span>{item.transactions.length}</span>
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-end">
                                                        <div className="flex items-baseline font-mono">
                                                            <span className="text-sm font-semibold text-green-600">
                                                                {item.hash ? item.hash.substr(0, 6) : "......"}
                                                            </span>
                                                            <span className="text-xs text-green-600">...{item.hash ? item.hash.substr(60, 66) : ""}</span>
                                                            <div className="ml-2">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
