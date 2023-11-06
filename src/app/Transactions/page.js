"use client"
import { useState, useEffect } from 'react'

import Subfilter from "../components/SubFilter/page"
import { Pagination } from '@/functions';


import Web3 from "web3";
import { useRouter } from 'next/navigation';

import { getTransactionDatanew } from '@/functions'

//components
import Modal from '../components/Loder/page'


export default function Page() {
  const router = useRouter();
  const navigate = (path, data) => {
    const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
    router.push(`${path}${queryString}`);
  };

  const [transaction, setTransaction] = useState([]);
  const [Totaltransaction, setTotalTransaction] = useState(0);

  const totalPages = Math.ceil(Totaltransaction / 20); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = transaction.slice(startIndex, endIndex);


  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };





  const fetchData = async (currentPage) => {
    loderStart()
    try {
      const value = await getTransactionDatanew(currentPage, 20);
      setTotalTransaction(Number(value?.total));
      await setTransaction(value?.data);
      loderEnd();
    } catch (error) {
      loderStart();
    }
  };

  // Handle previous Page button click
  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      await fetchData(currentPage - 1)
    }
  };
  // Handle next Page button click
  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      await fetchData(currentPage + 1)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   // console.log(transaction);
  // }, [transaction]);

  return (
    <>
      {/* <Subfilter /> */}
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="space-y-2">
          <div className="card">
            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="cardTitle">Transactions</span>
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex bg-lightground-2 px-1 py-1 rounded-lg items-center dark:bg-darkground-3">
                  <a
                    className="py-2 pr-1 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 "
                    onClick={handlePreviousPage} disabled={currentPage === 1}
                  >
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-double-left"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                    <span className="text-xs font-medium">Previous</span>
                  </a>
                  <a
                    className="py-2 pr-3 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 pointer-events-none"
                  >
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-left"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                  </a>
                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span>Page {currentPage}</span>
                      <span className="hidden sm:block">of {totalPages}</span>
                    </div>
                  </span>
                  <a
                    className="py-2 pl-3 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer text-[cornflowerblue] dark:hover:bg-darkground"
                  >
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-right"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                  </a>
                  <a
                    className="py-2 pl-1 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer sm:pl-3 text-[cornflowerblue] dark:hover:bg-darkground"
                    onClick={handleNextPage} disabled={currentPage === totalPages}
                  >
                    <span className="text-xs font-medium">Next</span>
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-double-right"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                  </a>
                </div>
                <span className="mr-2 text-sm textColor2">
                  Total Transactions: {Totaltransaction}
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2" />
            <div className="overflow-auto customScrollBar">
              <table className="w-full appTable singleRowsTable">
                <thead>
                  <tr className="border-b borderColor">
                    {/* <th /> */}
                    <th>Trx Hash</th>
                    <th>Timestamp</th>
                    <th>Block</th>
                    <th>From</th>
                    <th>To</th>
                    {/* <th>
                      <span className="block text-right">Fees</span>
                    </th> */}
                    <th>
                      <span className="block text-right">Value</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {transaction?.length > 0 && transaction.map((val , ind) => (
                    <tr key={ind}>
                      <td>
                        <div className="flex flex-col space-y-2">
                          <a
                            onClick={() => navigate("/trxinfo", `${val.hash}`)}
                            className="font-mono link"
                            data-tooltip="1518d52d828691d10e900c8216dc7aa6eca29bc83d56dabba83f25213f5922bc"
                          >
                             {val.hash
                              ? val.hash.substring(0, 6) +
                              "..." +
                              val.hash.substring(36, 42)
                              : "Loading..."}
                        
                          </a>
                          {/* <span className="2LinerTimestamp text-xs textColor2">
                            1688392593000
                          </span> */}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col space-y-2">
                          <span className="2LinerTimestamp text-xs textColor2">
                          {new Date(val.timestamp * 1000).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <a  onClick={() => navigate("/blockinfo", `${val.blockNumber}`)} className="link font-mono" >
                        
                            {val.blockNumber}
                          </a>
                          {/* <div className="flex items-center">
                            <a className="font-mono text-xs link" href="/epoch/421">
                              421
                            </a>
                            <span className="text-xs textColor1 mx-1">/</span>
                            <span className="text-xs textColor1 font-mono">
                              317502
                            </span>
                          </div> */}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col space-y-1">
                          <a
                            className="font-mono link"
                            onClick={() => navigate("/addressinfo", `${val.from}`)}
                          >
                            <span >
                        
                              {val.from
                              ? val.from.substring(0, 6) +
                              "..." +
                              val.from.substring(36, 42)
                              : "Loading..."}
                            </span>
                          </a>
                          {/* <a
                            className="font-mono link"
                            
                          >
                            <span data-tooltip="addr1qy5hjykp9a7f5z2yfz3h25s6qqt6trh0z8lqa2x8nd65hupxv8yep9kxsgme37fpwzhnwztvkwy9fyd7g6me9akc8twql5nvtp">
                              addr1qy5hjykp....akc8twql5nvtp
                            </span>
                          </a> */}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col space-y-1">
                        {val.to
                              ? 
                              <a
                              className="font-mono link"
                              onClick={() => navigate("/addressinfo", `${val.to}`)}
                            >
                              <span data-tooltip="addr1w9jngh3s694xvcxs8y04zymymgy6n44nh2yk4gm4hrvm5sctn8x00">
                           
                                {val.to
                                ? val.to.substring(0, 6) +
                                "..." +
                                val.to.substring(36, 42)
                                : "Loading..."}
                              </span>
                            </a>
                              :
                              <a
                              className="font-mono link"
                            >
                              <span data-tooltip="addr1w9jngh3s694xvcxs8y04zymymgy6n44nh2yk4gm4hrvm5sctn8x00">
                           Contract
                              </span>
                            </a>
                              }
                        
                          {/* <a
                            className="font-mono link"
                          >
                            <span >
                              {val.to}
                            </span>
                          </a> */}
                        </div>
                      </td>
                      {/* <td>
                        <div className="flex items-center justify-end">
                          <div className="flex items-baseline font-mono">
                            <span className="text-base font-medium textColor1">
                              0.
                            </span>
                            <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                              553245
                            </span>
                            <div className="ml-2">
                             
                            </div>
                          </div>
                        </div>
                      </td> */}
                      <td>
                        <div className="flex items-center justify-end">
                          <div className="flex items-baseline font-mono">
                            <span className="text-base font-medium textColor1">
                              {Web3.utils.fromWei(val.value, "ether")} 
                              {/* MMIT */}
                            </span>
                            {/* <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                              89243
                            </span>
                            <div className="ml-2">
                         
                            </div> */}
                          </div>
                        </div>
                      </td>
                    </tr>
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
