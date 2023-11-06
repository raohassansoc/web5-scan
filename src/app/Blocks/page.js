"use client"
import { useState, useEffect } from 'react'
import Web3 from "web3";
import { useRouter } from 'next/navigation';

import { getBlockData } from '@/functions';

//components
import Modal from '../components/Loder/page'


export default function Page() {

  const router = useRouter();
    const navigate = (path, data) => {
        const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
        router.push(`${path}${queryString}`);
    };

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://134.209.154.96:8545")
  );

  const [allBlogs, setAllBlogs] = useState([]);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [totalBlocksInDb, setTotalBlocksInDb] = useState(0);

  const [loading, setLoading] = useState(false);
  const [ITEMS_PER_Page, setITEMS_PER_Page] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      loderStart();
      try {

        const value = await getBlockData(currentPage, 20);
        setAllBlogs(value?.data);
        setTotalBlocksInDb(Number(value?.total));
        loderEnd();
      } catch (error) {
        loderEnd();
      }
    };

    fetchData();
  }, [currentPage]);

  const fetchBlocks = async () => {
    if (!web3 || loading) return;

    try {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const fetchedBlocks = [];
      setTotalBlocks(Number(latestBlockNumber));
      for (
        let i = latestBlockNumber;
        i >= 0 && fetchedBlocks.length < 10;
        i--
      ) {
        try {
          const block = await web3.eth.getBlock(i, true);
          fetchedBlocks.push(block);
        } catch (error) {
          console.error(`Error fetching block ${i}: ${error.message}`);
        }
      }

      setBlocks((prevBlocks) => [...prevBlocks, ...fetchedBlocks]);
    } catch (error) {
      console.error(`Error fetching blocks: ${error.message}`);
    }


  };



  useEffect(() => {
    fetchBlocks();
  }, []);

  const totalPages = Math.ceil(totalBlocksInDb / ITEMS_PER_Page);

  // Get the current Page's items
  const indexOfLastItem = currentPage * ITEMS_PER_Page;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_Page;

  // Function to handle pagination
  const handlePageChange = (PageNumber) => {
    setCurrentPage(PageNumber);
  };
  // function getTimeDifferenceFromNow(epochTime) {
  //   const currentTime = new Date().getTime() / 1000;
  //   const timeDifference = currentTime - epochTime;
  //   const minutes = (timeDifference / 60).toFixed(2) + "min";
  //   return minutes;
  // }
  useEffect(() => { }, [ITEMS_PER_Page, totalBlocks]);

  return (
    <>
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="space-y-2">
          <div className="card overflow-auto">
            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="cardTitle">Blocks</span>
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex bg-lightground-2 px-1 py-1 rounded-lg items-center dark:bg-darkground-3">
                  <a
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="py-2 pr-1 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 "
                  >
                    <span className="text-xs font-medium">Previous</span>
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-double-right"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                  </a>

                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span>Page  {currentPage}</span>
                      <span className="hidden sm:block">of  {totalPages}</span>
                    </div>
                  </span>

                  <a
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="py-2 pl-1 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer sm:pl-3 text-[cornflowerblue] dark:hover:bg-darkground"
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
                  Total Blocks: {totalBlocks}
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2" />
            <div className="overflow-auto">
              <table className="w-full appTable singleRowsTable">
                <thead>
                  <tr className="border-b borderColor">
                    <th>Block</th>
                    <th>Size / Gas</th>
                    <th>Timestamp</th>
                    <th>Difficulty</th>
                    <th>Miner</th>
                    <th>
                      <span className="block text-right">Total Fees</span>
                    </th>
                    {/* <th>
                      <span className="block text-right">Total Output</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {allBlogs.length > 0 && allBlogs.map((item) => (
                    <tr>
                      <td>
                        <a onClick={() => navigate("/blockinfo", `${item.number}`)} className="link font-mono" >
                          {Number(item.number)}
                        </a>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <a className="font-mono text-sm link" >
                            {Number(item.size)}
                          </a>
                          <span className="text-xs textColor1 mx-1">/</span>
                          <span className="text-sm textColor1 font-mono">{Number(item.gasUsed)}</span>
                        </div>
                      </td>
                      <td>
                        <span className="2LinerTimestamp text-xs textColor2">
                          {/* {getTimeDifferenceFromNow(Number(item.timestamp))} */}
                          {new Date(item.timestamp * 1000).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <a
                          className="link font-mono"
                        >
                          <span>{Number(item.difficulty)}</span>
                        </a>
                      </td>
                      <td>
                        <a
                          onClick={() => navigate("/addressinfo" , `${item.miner.toLowerCase()}`)}
                          className="link"
                        >
                          <span className="text-sm">
                            {item.miner
                              ? item.miner.substring(0, 6) +
                              "..." +
                              item.miner.substring(36, 42)
                              : "Loading..."}
                          </span>
                        </a>
                      </td>
                      <td>
                        <div className="flex items-center justify-end">
                          <div className="flex items-baseline font-mono">
                            <span className="text-sm textColor1 font-medium">
                              {Number(item.gasLimit)}
                            </span>
                            {/* <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                              121212
                            </span> */}
                            <div className="ml-2">
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <div className="flex items-center justify-end">
                          <div className="flex items-baseline font-mono">
                            <span className="text-sm textColor1 font-medium">
                              450,549.
                            </span>
                            <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                              681357
                            </span>
                            <div className="ml-2">
                            </div>
                          </div>
                        </div>
                      </td> */}
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
