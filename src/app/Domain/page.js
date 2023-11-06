"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

import { getDoamin } from '@/functions'

//components
import Modal from '../components/Loder/page'


export default function Page() {
  const router = useRouter();
  const navigate = (path, data) => {
    const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
    router.push(`${path}${queryString}`);
  };

  const [DomainData, setDomainData] = useState([]);
  const [TotalDomain, setTotalDomain] = useState(0);

  const totalPages = Math.ceil(TotalDomain / 20); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = DomainData.slice(startIndex, endIndex);

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
      const value = await getDoamin(currentPage, 20);
      // console.log(value)
      setTotalDomain(Number(value?.total));
      await setDomainData(value?.data);
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
  //   // console.log(DomainData);
  // }, [DomainData]);

  return (
    <>
      {/* <Subfilter /> */}
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="space-y-2">
          <div className="card">
            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="cardTitle">All Domains</span>
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
                  Total Domains: {TotalDomain}
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2" />
            <div className="overflow-auto customScrollBar">
              <table className="w-full appTable singleRowsTable">
                <thead>
                  <tr className="border-b borderColor">
                    <th>Domain Name</th>
                    <th>Timestamp</th>
                    <th>Trx</th>
                    <th>Account Address</th>
                  </tr>
                </thead>
                <tbody>
                {DomainData?.length > 0 && DomainData.map((val , ind) => (
                    <tr key={ind}>
                      <td>
                        <div className="flex flex-col space-y-2">
                          <a
                            onClick={() => navigate("/trxinfo", `${val.txhash}`)}
                            className="font-mono link"
                            data-tooltip="1518d52d828691d10e900c8216dc7aa6eca29bc83d56dabba83f25213f5922bc"
                          >
                             {val.username}
                          </a>
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
                        {val?.txhash ? 
                        <a  onClick={() => navigate("/trxinfo", `${val?.txhash}`)} className="link font-mono" >
                          {val?.txhash?.substring(0,9)+'...'+val?.txhash?.substring(56,66)}
                        </a>
                        : 
                        <a  className="link font-mono" >
                           - - - - - - - - - - - 
                        </a>
                        }
                          
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col space-y-1">
                          <a
                            className="font-mono link"
                            onClick={() => navigate("/addressinfo", `${val?.accountAddress}`)}
                          >
                            <span >
                              {val.accountAddress
                              ? val.accountAddress.substring(0, 6) +
                              "..." +
                              val.accountAddress.substring(30, 36)
                              : "Loading..."}
                            </span>
                          </a>
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
